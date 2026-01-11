# Ready-to-Post Community Content

Copy-paste these for Reddit, Twitter/X, Discord, and other platforms.

---

## Reddit Posts

### r/ClaudeAI - Helpful Post (Not Promotional)

**Title:** How I handle context loss in Claude Code

**Body:**
```
After months of daily Claude Code use, here's what I've learned about managing context:

**The Problem**
- Context fills up mid-session
- Auto-compaction loses important details
- New sessions = re-explaining everything

**What Works for Me**

1. **CLAUDE.md is your anchor**
Keep it under 3000 tokens. Include: project overview, key directories, coding standards, and a "Do NOT" section. This survives compaction.

2. **Periodic checkpoints**
Before context gets full, ask Claude to summarize:
- Files modified
- Decisions made
- What's pending
Save to CLAUDE.md under ## Session Notes

3. **Strategic /clear**
Sometimes a fresh start beats fighting context drift. But save state first.

4. **Be explicit in prompts**
"Fix the null pointer in handleSubmit at line 42" > "Fix that bug we talked about"

I wrote a longer guide on this: https://substratia.io/blog/context-management-guide

What techniques work for you?
```

---

### r/ClaudeAI - Tool Announcement

**Title:** Made a free Claude Code cheat sheet - commands, shortcuts, CLAUDE.md patterns

**Body:**
```
I kept forgetting slash commands and keyboard shortcuts, so I made a reference sheet:

https://substratia.io/tools/cheat-sheet

Covers:
- All slash commands (/clear, /compact, /cost, etc.)
- Keyboard shortcuts (Ctrl+C to interrupt, etc.)
- CLAUDE.md template patterns
- MCP configuration examples
- Pro tips for power users

It's free, has a print/save-as-PDF button, and has copy buttons for each section.

I use it basically every day now. Figured others might find it useful.
```

---

### r/ClaudeAI - Discussion Starter

**Title:** What's your CLAUDE.md setup look like?

**Body:**
```
Curious how others structure their CLAUDE.md files.

Mine has:
- Project overview (2-3 sentences)
- Key directories
- Coding standards
- A "Do NOT" section (surprisingly important)
- Recent session notes

The "Do NOT" section was a game-changer for me. Things like:
- Do not add comments to unchanged code
- Do not refactor code not related to the task
- Do not commit without running tests

What sections do you include? Any patterns that work well?
```

---

## Twitter/X Posts

### Thread: Context Management Tips

```
🧵 Claude Code context management tips (thread)

I've been using Claude Code daily for months. Here's what actually works for managing context:

1/7
```

```
1. CLAUDE.md is your anchor

Keep it under 3000 tokens. Include:
- Project overview
- Key directories
- Coding standards
- A "Do NOT" section

This survives compaction and starts every session right.

2/7
```

```
2. Checkpoint before context fills

When you see context getting full, ask Claude to summarize:
- Files modified
- Decisions made
- What's pending

Save to CLAUDE.md. Future you will thank you.

3/7
```

```
3. The "Do NOT" section is underrated

Things I include:
- Don't add comments to unchanged code
- Don't refactor unrelated code
- Don't commit without tests

Prevents so many headaches.

4/7
```

```
4. Be explicit, not implicit

Bad: "Fix that bug we discussed"
Good: "Fix the null pointer in handleSubmit at line 42 of UserForm.tsx"

Don't assume Claude remembers. Include context.

5/7
```

```
5. Strategic /clear

Sometimes a fresh start beats fighting context drift.

But: Save your session state first. Ask Claude to write a handoff doc before clearing.

6/7
```

```
6. Free resources

I made a cheat sheet with all the commands, shortcuts, and patterns:
substratia.io/tools/cheat-sheet

And a full guide:
substratia.io/blog/context-management-guide

7/7
```

---

### Single Tweet: Cheat Sheet

```
Made a free Claude Code cheat sheet:
- Slash commands
- Keyboard shortcuts
- CLAUDE.md patterns
- MCP config examples

Print it, bookmark it, whatever works.

substratia.io/tools/cheat-sheet
```

---

### Single Tweet: Context Guide

```
The #1 Claude Code frustration is context loss.

I wrote a deep dive on managing it:
- How context windows work
- Why compaction loses details
- Preservation techniques
- CLAUDE.md patterns

12-min read: substratia.io/blog/context-management-guide
```

---

## Discord (Claude Code Server)

### Introduction Post

```
Hey everyone! Been using Claude Code daily for months and built some free tools:

**Cheat Sheet** - Quick reference for commands, shortcuts, CLAUDE.md patterns
https://substratia.io/tools/cheat-sheet

**Context Guide** - Deep dive on managing context/avoiding compaction issues
https://substratia.io/blog/context-management-guide

Also happy to answer questions about context management - it's something I've spent way too much time figuring out 😅
```

---

### Helpful Response Template (for context loss questions)

```
Context loss is the #1 frustration I see. Here's what helped me:

1. **CLAUDE.md as anchor** - Keep critical info there, it survives compaction
2. **Periodic checkpoints** - Before context fills, save session state
3. **Explicit prompts** - Include file paths and line numbers, don't assume memory
4. **Strategic /clear** - Sometimes fresh start beats drift

I wrote a full guide if you want the details: https://substratia.io/blog/context-management-guide
```

---

## Hacker News

### Show HN Post

**Title:** Show HN: Free Claude Code cheat sheet and context management guide

**Body:**
```
I've been using Claude Code (Anthropic's CLI coding assistant) daily for months. The biggest pain point is context management - sessions fill up, compaction loses details, new sessions mean re-explaining everything.

So I built two free resources:

1. Cheat Sheet (https://substratia.io/tools/cheat-sheet)
Quick reference for slash commands, keyboard shortcuts, CLAUDE.md patterns, and MCP configuration.

2. Context Management Guide (https://substratia.io/blog/context-management-guide)
Deep dive on how context windows work, why compaction loses information, and techniques that actually help.

Both are free, no signup required. The cheat sheet has a print/PDF button.

Happy to answer questions about Claude Code workflows.
```

---

## LinkedIn Post

```
After months of daily Claude Code use, I've learned that context management is the hidden skill that separates productive sessions from frustrating ones.

The tools are free. The real skill is knowing how to use them effectively.

I put together two free resources:

📋 Cheat Sheet - Quick reference for commands, shortcuts, and patterns
https://substratia.io/tools/cheat-sheet

📖 Context Guide - Deep dive on managing context and avoiding compaction issues
https://substratia.io/blog/context-management-guide

What Claude Code workflows have you developed?

#ClaudeCode #AIAssistant #DeveloperTools #Productivity
```

---

## Dev.to Article Outline

**Title:** The Complete Guide to Claude Code Context Management

**Outline:**
1. The context problem (why it matters)
2. How context windows work (the basics)
3. Understanding compaction (what gets lost)
4. CLAUDE.md best practices (with examples)
5. Preservation techniques (actionable tips)
6. Tools that help (momentum, memory-mcp, /cost)
7. Workflow patterns (session handoff, task isolation)
8. Free resources (cheat sheet, full guide)

**CTA:** Link to cheat sheet and full guide

---

## Key Rules for Community Posts

1. **Be helpful first** - Don't lead with promotion
2. **Provide real value** - Tips, techniques, examples
3. **Link naturally** - "I wrote more about this here" not "CHECK OUT MY SITE"
4. **Engage in comments** - Answer questions, be a community member
5. **One promotional post per 10 helpful ones** - Build trust first
6. **Never spam** - One post per subreddit per week max

---

## Posting Schedule (Week 1)

| Day | Platform | Type | Content |
|-----|----------|------|---------|
| Mon | r/ClaudeAI | Helpful | "How I handle context loss" |
| Tue | Twitter/X | Thread | Context management tips |
| Wed | Discord | Intro | Introduction post |
| Thu | LinkedIn | Post | Context management value post |
| Fri | r/ClaudeAI | Discussion | "What's your CLAUDE.md setup?" |
| Sat | Twitter/X | Single | Cheat sheet announcement |
| Sun | - | Rest | Engage with comments |

---

*Last Updated: January 2026*
