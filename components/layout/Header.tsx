import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { StartCTA } from "@/components/ui/StartCTA";
import { MobileNav } from "@/components/layout/MobileNav";
import { Wordmark } from "@/components/layout/Wordmark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 pointer-events-none md:px-5 md:pt-4">
      <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[100rem] items-center justify-between gap-3 rounded-full border border-charcoal/10 bg-white/85 px-3 shadow-[0_12px_40px_-16px_rgba(41,42,38,0.35)] backdrop-blur-md md:h-16 md:px-4">
        <Link href="/" aria-label="Native Meals, home" className="shrink-0 pl-1">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-semibold text-olive hover:text-olive-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <div className="hidden md:block">
            <StartCTA
              className="px-5 py-2"
              whatsappLabel="Start on WhatsApp"
              fallbackLabel="Start Monday"
            />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
