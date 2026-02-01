"use client";

import Link from "next/link";
import { type Section } from "@/data/docsData";

interface DocsSidebarProps {
  sections: Section[];
}

export default function DocsSidebar({ sections }: DocsSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24 glass rounded-xl p-5">
        <h3 className="text-sm font-semibold text-forge-cyan mb-4 tracking-wider">
          ON THIS PAGE
        </h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm"
            >
              {section.title}
            </a>
          ))}
        </nav>
        <div className="mt-6 pt-6 border-t border-white/10">
          <Link
            href="/tools"
            className="block px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg text-center font-medium transition-all text-sm"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </aside>
  );
}
