"use client";

import { Badge } from "@/components/ui/badge"; // shadcn/ui
import Link from "next/link";
import { ExternalLink, Lightbulb, AppWindow } from "lucide-react";
import { motion } from "framer-motion";

type Source = { label: string; url: string };

function domainFrom(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function Logo({ url, alt }: { url: string; alt: string }) {
  const host = domainFrom(url);
  // Clearbit logo fallback; swap for your own logo proxy if preferred
  const logo = `https://logo.clearbit.com/${host}`;
  return (
    <img
      src={logo}
      alt={alt}
      className="size-4 rounded-sm object-contain"
      onError={(e) => ((e.currentTarget.style.display = "none"))}
    />
  );
}

export default function SourcesBar({
  sources,
  className = "",
}: {
  sources: Source[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* "Sources" label with icons */}
      <div className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-300">
        <AppWindow className="size-4 text-emerald-400" aria-hidden />
        <Lightbulb className="size-4 text-amber-300" aria-hidden />
        <span>Sources</span>
      </div>

      {/* Link chips */}
      <ul className="flex flex-wrap items-center gap-2">
        {sources.map((s) => {
          const host = domainFrom(s.url);
          return (
            <li key={s.url}>
              <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Badge asChild variant="outline" className="px-2.5 py-1">
                  <Link
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5"
                    aria-label={`Open source: ${host}`}
                  >
                    <Logo url={s.url} alt={`${host} logo`} />
                    <span className="truncate max-w-[12ch]">{host}</span>
                    <ExternalLink className="size-3.5 opacity-70" aria-hidden />
                  </Link>
                </Badge>
              </motion.span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}