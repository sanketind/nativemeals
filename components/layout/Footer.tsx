import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { copyrightYear } from "@/lib/clock";
import { displayPhone, phoneHref, whatsappHref } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Wordmark";

export async function Footer() {
  const year = await copyrightYear();
  const phone = siteConfig.contact.phone;
  const email = siteConfig.contact.email;
  const whatsapp = whatsappHref();
  const hasContact = Boolean(phone || email || whatsapp);

  return (
    <footer className="border-t border-charcoal/10 bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-4 max-w-sm text-[0.94rem] leading-[1.65] text-muted">
            Cooked the same morning and handed over at your office gate or your door.
            Serving {siteConfig.serviceAreaShort}.
          </p>
        </div>
        <nav className="md:col-span-3" aria-label="Footer">
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted hover:text-olive"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
            Contact
          </p>
          <p className="mt-4 text-sm text-muted">
            Serving {siteConfig.serviceAreaShort}, {siteConfig.city}
          </p>
          {siteConfig.fssai ? (
            <p className="mt-2 text-sm text-muted">FSSAI {siteConfig.fssai}</p>
          ) : null}
          {hasContact ? (
            <ul className="mt-3 space-y-2 text-sm">
              {phone && phoneHref(phone) ? (
                <li>
                  <a className="hover:text-olive" href={phoneHref(phone) ?? undefined}>
                    {displayPhone(phone)}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a className="hover:text-olive" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              ) : null}
              {whatsapp ? (
                <li>
                  <a
                    className="hover:text-olive"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <Link href="/contact" className="hover:text-olive">
                Write to us
              </Link>{" "}
              and we will reply on your phone.
            </p>
          )}
          {siteConfig.socials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {siteConfig.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    className="hover:text-olive"
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
      <div className="border-t border-charcoal/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} Native Meals. {siteConfig.city}.
          </p>
          <p>{siteConfig.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
