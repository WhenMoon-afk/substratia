import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * Hash an API key using SHA-256 (same as in apiKeys.ts)
 */
async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validate API key from Authorization header
 * Returns userId and keyId if valid, null otherwise
 */
async function validateApiKey(
  ctx: any,
  request: Request
): Promise<{ userId: any; keyId: any } | null> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const rawKey = authHeader.slice(7);
  if (!rawKey.startsWith("sk_")) {
    return null;
  }

  const hashedKey = await hashApiKey(rawKey);

  const apiKey = await ctx.runQuery(internal.apiKeysInternal.getByHash, {
    hashedKey,
  });

  if (!apiKey || apiKey.revokedAt) {
    return null;
  }

  // Update last used timestamp asynchronously
  ctx.runMutation(internal.apiKeys.updateLastUsed, { keyId: apiKey._id });

  return {
    userId: apiKey.userId,
    keyId: apiKey._id,
  };
}

/**
 * Map numeric importance (0-10) to string literal
 * Used for memory-mcp which uses numeric importance scores
 */
function mapImportance(importance: unknown): "critical" | "high" | "normal" | "low" {
  // If already a valid string, return it
  const validStrings = ["critical", "high", "normal", "low"];
  if (typeof importance === "string" && validStrings.includes(importance)) {
    return importance as "critical" | "high" | "normal" | "low";
  }

  // Map numeric values (0-10 scale)
  if (typeof importance === "number") {
    if (importance >= 8) return "critical";
    if (importance >= 5) return "high";
    if (importance >= 3) return "normal";
    return "low";
  }

  return "normal";
}

const http = httpRouter();

// Health check endpoint
http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(JSON.stringify({ status: "ok", timestamp: Date.now() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Sync a single snapshot from momentum
http.route({
  path: "/api/snapshots/sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Validate API key
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    const { projectPath, summary, context, decisions, nextSteps, filesTouched, importance, createdAt } = body;

    if (!projectPath || !summary || !context) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: projectPath, summary, context" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate importance value
    const validImportance = ["critical", "important", "normal", "reference"];
    const safeImportance = validImportance.includes(importance) ? importance : "normal";

    // Insert snapshot
    try {
      const snapshotId = await ctx.runMutation(internal.snapshotsInternal.insertFromApi, {
        userId: auth.userId,
        projectPath,
        summary,
        context,
        decisions: decisions || undefined,
        nextSteps: nextSteps || undefined,
        filesTouched: filesTouched || undefined,
        importance: safeImportance,
        createdAt: createdAt || Date.now(),
      });

      return new Response(
        JSON.stringify({ success: true, snapshotId }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Failed to insert snapshot:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save snapshot" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

// Bulk sync snapshots from momentum
http.route({
  path: "/api/snapshots/bulk-sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { snapshots } = body;
    if (!Array.isArray(snapshots)) {
      return new Response(
        JSON.stringify({ error: "snapshots must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Limit batch size
    if (snapshots.length > 100) {
      return new Response(
        JSON.stringify({ error: "Maximum 100 snapshots per request" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const validImportance = ["critical", "important", "normal", "reference"];
    let synced = 0;

    for (const snap of snapshots) {
      if (!snap.projectPath || !snap.summary || !snap.context) {
        continue; // Skip invalid snapshots
      }

      try {
        await ctx.runMutation(internal.snapshotsInternal.insertFromApi, {
          userId: auth.userId,
          projectPath: snap.projectPath,
          summary: snap.summary,
          context: snap.context,
          decisions: snap.decisions || undefined,
          nextSteps: snap.nextSteps || undefined,
          filesTouched: snap.filesTouched || undefined,
          importance: validImportance.includes(snap.importance) ? snap.importance : "normal",
          createdAt: snap.createdAt || Date.now(),
        });
        synced++;
      } catch (error) {
        console.error("Failed to sync snapshot:", error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, synced, total: snapshots.length }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
});

// Sync a memory from memory-mcp
http.route({
  path: "/api/memories/sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { content, summary, type, context, importance, tags, metadata, createdAt, lastAccessed, accessCount } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Missing required field: content" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Map importance (supports both numeric 0-10 and string literals)
    const safeImportance = mapImportance(importance);

    // Build context from summary and type if not provided
    const finalContext = context || (summary ? `[${type || 'memory'}] ${summary}` : undefined);

    // Extract tags from metadata if not provided directly
    const finalTags = tags || (metadata?.tags as string[] | undefined);

    try {
      const memoryId = await ctx.runMutation(internal.memoriesInternal.insertFromApi, {
        userId: auth.userId,
        content,
        context: finalContext,
        importance: safeImportance,
        tags: finalTags,
        createdAt: createdAt || Date.now(),
      });

      return new Response(
        JSON.stringify({ success: true, memoryId }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Failed to insert memory:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save memory" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

// Bulk sync memories from memory-mcp
http.route({
  path: "/api/memories/bulk-sync",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { memories } = body;
    if (!Array.isArray(memories)) {
      return new Response(
        JSON.stringify({ error: "memories must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Limit batch size
    if (memories.length > 100) {
      return new Response(
        JSON.stringify({ error: "Maximum 100 memories per request" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let synced = 0;

    for (const mem of memories) {
      if (!mem.content) {
        continue; // Skip invalid memories
      }

      // Build context from summary and type if not provided
      const finalContext = mem.context || (mem.summary ? `[${mem.type || 'memory'}] ${mem.summary}` : undefined);

      // Extract tags from metadata if not provided directly
      const finalTags = mem.tags || (mem.metadata?.tags as string[] | undefined);

      try {
        await ctx.runMutation(internal.memoriesInternal.insertFromApi, {
          userId: auth.userId,
          content: mem.content,
          context: finalContext,
          importance: mapImportance(mem.importance),
          tags: finalTags,
          createdAt: mem.createdAt || Date.now(),
        });
        synced++;
      } catch (error) {
        console.error("Failed to sync memory:", error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, synced, total: memories.length }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
});

// List memories for SDK
http.route({
  path: "/api/memories",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const importance = url.searchParams.get("importance") as any;

    try {
      const memories = await ctx.runQuery(internal.memoriesInternal.listByUser, {
        userId: auth.userId,
        limit: Math.min(limit, 100),
        importance: importance || undefined,
      });

      return new Response(
        JSON.stringify({ memories }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Failed to list memories:", error);
      return new Response(
        JSON.stringify({ error: "Failed to list memories" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

// Search memories for SDK
http.route({
  path: "/api/memories/search",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: q" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const memories = await ctx.runQuery(internal.memoriesInternal.searchByContent, {
        userId: auth.userId,
        query,
        limit: Math.min(limit, 50),
      });

      return new Response(
        JSON.stringify({ memories }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Failed to search memories:", error);
      return new Response(
        JSON.stringify({ error: "Failed to search memories" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

// Delete a memory for SDK
http.route({
  path: "/api/memories/delete",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const auth = await validateApiKey(ctx, request);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = body;
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing required field: id" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const result = await ctx.runMutation(internal.memoriesInternal.deleteById, {
        memoryId: id,
        userId: auth.userId,
      });

      if (!result.success) {
        return new Response(
          JSON.stringify({ error: result.error }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Failed to delete memory:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete memory" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

export default http;
