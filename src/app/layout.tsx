import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { RouteScrollManager } from "@/components/route-scroll-manager";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });

const siteUrl = "https://www.ratsonbase.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ratsonbase Construction Limited",
    template: "%s | Ratsonbase Construction Limited",
  },
  description:
    "Ratsonbase Construction Limited is a Nigerian construction and civil engineering company delivering residential, commercial and industrial building solutions.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Ratsonbase Construction Limited",
    title: "Ratsonbase Construction Limited",
    description:
      "Construction, civil engineering, renovation and property solutions across Nigeria.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ratsonbase Construction Limited",
    description:
      "Construction, civil engineering, renovation and property solutions across Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ratsonbase Construction Limited",
  url: siteUrl,
  email: "hello@ratsonbase.com",
  description:
    "A Nigerian construction and civil engineering company delivering residential, commercial and industrial building solutions.",
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <body className={`${inter.variable} ${bricolage.variable} antialiased`}>
        <RouteScrollManager />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
