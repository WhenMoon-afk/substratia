"use client";

import { useEffect } from "react";
import ShareButton from "@/components/ShareButton";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsSection from "@/components/docs/DocsSection";
import RelatedResources from "@/components/docs/RelatedResources";
import CtaSection from "@/components/home/CtaSection";
import { sections } from "@/data/docsData";

function SectionDivider({ variant = "cyan" }: { variant?: "cyan" | "purple" }) {
  const gradient =
    variant === "cyan"
      ? "from-transparent via-forge-cyan/20 to-transparent"
      : "from-transparent via-forge-purple/20 to-transparent";

  return (
    <div className="relative z-10 py-1" aria-hidden="true">
      <div className={`h-px bg-gradient-to-r ${gradient} max-w-4xl mx-auto`} />
    </div>
  );
}

export default function DocsPage() {
  // Handle URL hash navigation on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element)
          element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Header */}
      <section className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4 max-w-6xl mx-auto">
            <ShareButton title="Documentation - Substratia" />
          </div>
          <div className="max-w-6xl mx-auto animate-fade-up">
            <div className="inline-block px-4 py-1 bg-forge-purple/20 border border-forge-purple/50 rounded-full text-sm text-forge-purple mb-4">
              Reference
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="hero-gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Everything you need to know about Substratia&apos;s memory tools
              and developer utilities.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      {/* Content */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-12 max-w-6xl mx-auto">
            <DocsSidebar sections={sections} />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {sections.map((section) => (
                <DocsSection key={section.id} section={section} />
              ))}

              <SectionDivider variant="cyan" />

              <RelatedResources />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      <CtaSection />
    </main>
  );
}
