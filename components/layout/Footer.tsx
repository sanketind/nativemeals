import Link from "next/link";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { copyrightYear } from "@/lib/clock";
import { displayPhone, phoneHref } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Wordmark";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow, Text } from "@/components/ui/Type";

const legalHrefs = new Set(["/privacy", "/terms"]);

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
};

export async function Footer() {
  const year = await copyrightYear();
  const phone = siteConfig.contact.phone;
  const phoneLink = phone ? phoneHref(phone) : null;
  const explore = siteConfig.footerNav.filter((item) => !legalHrefs.has(item.href));
  const legal = siteConfig.footerNav.filter((item) => legalHrefs.has(item.href));

  return (
    <footer className="bg-ink text-stone">
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Wordmark tone="stone" />
          <Text size="body" tone="inverse" className="mt-4 max-w-sm">
            Cooked fresh and handed over at your office gate or your door.
            Serving {siteConfig.launchArea}.
          </Text>
          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area}>
                <Chip tone="inverse">{area}</Chip>
              </li>
            ))}
          </ul>
        </div>
        <nav className="md:col-span-3" aria-label="Footer">
          <Eyebrow tone="accent">Explore</Eyebrow>
          <ul className="mt-4 space-y-2.5">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm font-medium text-stone/85 hover:text-stone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <Eyebrow tone="accent">Contact</Eyebrow>
          <ul className="mt-4 space-y-3 text-sm">
            {phone && phoneLink ? (
              <li className="flex items-start gap-2.5 font-medium">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-stone/60" />
                <a className="text-stone underline-offset-4 hover:underline" href={phoneLink}>
                  {displayPhone(phone)}
                </a>
              </li>
            ) : (
              <li className="leading-relaxed text-stone/80">
                <Link href="/contact" className="font-medium text-stone underline-offset-4 hover:underline">
                  Write to us
                </Link>{" "}
                and we will reply on your phone.
              </li>
            )}
            <li className="flex items-start gap-2.5 leading-relaxed text-stone/75">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-stone/60" />
              <span>{siteConfig.address}</span>
            </li>
            {siteConfig.fssai ? (
              <li className="flex items-start gap-2.5 text-stone/75">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-stone/60"
                />
                <span>FSSAI {siteConfig.fssai}</span>
              </li>
            ) : null}
            {siteConfig.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <li key={social.href} className="flex items-start gap-2.5 font-medium">
                  {Icon ? (
                    <Icon className="mt-0.5 size-4 shrink-0 text-stone/60" />
                  ) : null}
                  <a
                    href={social.href}
                    className="text-stone underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
      <div className="border-t border-stone/10 bg-black/20">
        <Container className="flex flex-col gap-3 py-5 text-xs text-stone/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Native Meals. {siteConfig.city}.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-stone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
