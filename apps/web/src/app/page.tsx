"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import ToolsShowcase from "@/components/home/ToolsShowcase";
import Testimonials from "@/components/home/Testimonials";
import CommunitySection from "@/components/home/CommunitySection";

export default function Home() {
  const [npmDownloads, setNpmDownloads] = useState<number | null>(null);
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.npmjs.org/downloads/point/last-month/claude-memory-mcp",
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.downloads) setNpmDownloads(data.downloads);
        })
        .catch(() => {}),
      fetch("https://api.github.com/repos/WhenMoon-afk/claude-memory-mcp")
        .then((res) => res.json())
        .then((data) => {
          if (data.stargazers_count) setGithubStars(data.stargazers_count);
        })
        .catch(() => {}),
    ]).finally(() => setStatsLoading(false));
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      <HeroSection
        githubStars={githubStars}
        npmDownloads={npmDownloads}
        statsLoading={statsLoading}
      />
      <ToolsShowcase />
      <Testimonials />
      <CommunitySection
        githubStars={githubStars}
        npmDownloads={npmDownloads}
        statsLoading={statsLoading}
      />
    </main>
  );
}
