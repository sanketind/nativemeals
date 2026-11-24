import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { foodEstablishment } from "@/lib/structured-data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.metaTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaTitle,
    description: siteConfig.description,
  },
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-stone font-sans font-normal text-muted">
        <a
          href="#main"
          className="absolute left-4 top-4 z-50 -translate-y-24 rounded-control bg-ink px-4 py-2 text-sm font-semibold text-stone focus:translate-y-0"
        >
          Skip to content
        </a>
        <JsonLd data={foodEstablishment()} />
        <Header />
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
