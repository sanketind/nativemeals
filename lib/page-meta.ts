import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteConfig.metaTitle,
} as const;

/** Document title uses the layout template. Social titles include the brand explicitly. */
export function pageMeta(title: string, description: string): Metadata {
  const socialTitle = `${title} · ${siteConfig.name}`;
  return {
    title,
    description,
    openGraph: {
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: shareImage,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: shareImage,
    },
  };
}
