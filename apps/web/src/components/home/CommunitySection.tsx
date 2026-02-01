"use client";

const directories = [
  { name: "PulseMCP", url: "https://pulsemcp.com/servers/whenmoon-memory" },
  {
    name: "Glama.ai",
    url: "https://glama.ai/mcp/servers/@WhenMoon-afk/claude-memory-mcp",
  },
  {
    name: "LobeHub",
    url: "https://lobehub.com/mcp/whenmoon-afk-claude-memory-mcp",
  },
  {
    name: "mcp.so",
    url: "https://mcp.so/server/claude-memory-mcp/WhenMoon-afk",
  },
  { name: "playbooks.com", url: "https://playbooks.com/mcp/whenmoon-memory" },
  {
    name: "awesome-mcp-servers",
    url: "https://github.com/TensorBlock/awesome-mcp-servers",
  },
];

interface CommunitySectionProps {
  githubStars: number | null;
  npmDownloads: number | null;
  statsLoading: boolean;
}

function StatSkeleton() {
  return (
    <span className="inline-block w-12 h-4 bg-gray-700 rounded animate-pulse" />
  );
}

export default function CommunitySection({
  githubStars,
  npmDownloads,
  statsLoading,
}: CommunitySectionProps) {
  return (
    <section
      aria-label="Directory listings"
      className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/30 to-transparent"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
          Listed on <span className="text-forge-cyan">9+ Directories</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          memory-mcp has been indexed by the MCP community with zero marketing
          spend.
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {directories.map((dir) => (
            <a
              key={dir.name}
              href={dir.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 glass hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
            >
              {dir.name}
            </a>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          {statsLoading ? (
            <StatSkeleton />
          ) : (
            <>
              {githubStars && (
                <>
                  <span className="text-forge-purple">{githubStars}</span>{" "}
                  GitHub stars
                </>
              )}
              {githubStars && npmDownloads && " · "}
              {npmDownloads && (
                <>
                  <span className="text-forge-cyan">
                    {npmDownloads.toLocaleString()}+
                  </span>{" "}
                  npm downloads/month
                </>
              )}
            </>
          )}
        </p>
      </div>
    </section>
  );
}
