import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { StartCTA } from "@/components/ui/StartCTA";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { Wordmark } from "@/components/layout/Wordmark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/5 bg-cream/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="Native Meals, home" className="shrink-0">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-charcoal/80 hover:text-olive"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <StartCTA
            className="px-3.5 py-2 sm:px-5"
            whatsappLabel="Start on WhatsApp"
            fallbackLabel="Start Monday"
          />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
