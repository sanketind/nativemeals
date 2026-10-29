import { siteConfig } from "@/data/site-config";
import { displayPhone, phoneHref, whatsappHref } from "@/lib/contact";

export function WriteToUs() {
  const phone = siteConfig.contact.phone;
  const email = siteConfig.contact.email;
  const call = phoneHref(phone);
  const whatsapp = whatsappHref();
  const shownPhone = displayPhone(phone);

  return (
    <p>
      {`Native Meals, ${siteConfig.address}. Serving ${siteConfig.serviceAreaShort}, ${siteConfig.city}.`}
      {call && shownPhone ? (
        <>
          {" "}
          <a href={call} className="text-olive hover:underline">
            {shownPhone}
          </a>
          {"."}
        </>
      ) : null}
      {email ? (
        <>
          {" "}
          <a href={`mailto:${email}`} className="text-olive hover:underline">
            {email}
          </a>
          {"."}
        </>
      ) : null}
      {whatsapp ? (
        <>
          {" "}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-olive hover:underline"
          >
            WhatsApp
          </a>
          {"."}
        </>
      ) : null}
    </p>
  );
}
