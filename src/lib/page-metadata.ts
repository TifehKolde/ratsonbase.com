import type { Metadata } from "next";

const SITE_NAME = "Ratsonbase Construction Limited";
const DEFAULT_IMAGE = "/opengraph-image";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = `${title} | Ratsonbase Construction Limited`,
}: PageMetadataInput): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
