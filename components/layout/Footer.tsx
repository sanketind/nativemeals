import Link from "next/link";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { copyrightYear } from "@/lib/clock";
import { displayPhone, phoneHref } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Wordmark";

const legalHrefs = new Set(["/privacy", "/terms"]);

export async function Footer() {
  const year = await copyrightYear();
  const phone = siteConfig.contact.phone;
  const phoneLink = phone ? phoneHref(phone) : null;
  const explore = siteConfig.footerNav.filter((item) => !legalHrefs.has(item.href));
  const legal = siteConfig.footerNav.filter((item) => legalHrefs.has(item.href));

  return (
    <footer className="bg-olive text-cream">
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Wordmark tone="cream" />
          <p className="mt-4 max-w-sm text-[0.94rem] leading-[1.65] text-cream/80">
            Cooked the same morning and handed over at your office gate or your door.
            Serving {siteConfig.launchArea}.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-full bg-cream/10 px-3 py-1.5 text-sm font-semibold text-cream"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
        <nav className="md:col-span-3" aria-label="Footer">
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm font-medium text-cream/85 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {phone && phoneLink ? (
              <li className="flex items-start gap-2.5 font-medium">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta" />
                <a className="text-cream hover:text-terracotta" href={phoneLink}>
                  {displayPhone(phone)}
                </a>
              </li>
            ) : (
              <li className="leading-relaxed text-cream/80">
                <Link href="/contact" className="font-medium text-cream hover:text-terracotta">
                  Write to us
                </Link>{" "}
                and we will reply on your phone.
              </li>
            )}
            <li className="flex items-start gap-2.5 leading-relaxed text-cream/75">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta" />
              <span>{siteConfig.address}</span>
            </li>
            {siteConfig.fssai ? (
              <li className="flex items-start gap-2.5 text-cream/75">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-terracotta"
                />
                <span>FSSAI {siteConfig.fssai}</span>
              </li>
            ) : null}
          </ul>
          {siteConfig.socials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {siteConfig.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    className="text-cream hover:text-terracotta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
      <div className="border-t border-cream/15 bg-olive-deep">
        <Container className="flex flex-col gap-3 py-5 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Native Meals. {siteConfig.city}.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
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
