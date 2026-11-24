"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { StartCTA } from "@/components/ui/StartCTA";
import { MobileNav } from "@/components/layout/MobileNav";
import { Wordmark } from "@/components/layout/Wordmark";
import { type as typeStyles } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 rounded-control px-3 transition-colors md:h-16 md:px-4",
          scrolled
            ? "border border-ink/10 bg-stone/80 shadow-raise backdrop-blur-md"
            : "border border-white/20 bg-white/10 backdrop-blur-md",
        )}
      >
        <Link href="/" aria-label="Native Meals, home" className="shrink-0 pl-1">
          <Wordmark tone={scrolled ? "ink" : "stone"} />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                typeStyles.nav,
                scrolled ? "text-ink hover:text-muted" : "text-stone/90 hover:text-stone",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <div className="hidden md:block">
            <StartCTA className="px-5 py-2" />
          </div>
          <MobileNav tone={scrolled ? "ink" : "stone"} />
        </div>
      </div>
    </header>
  );
}
