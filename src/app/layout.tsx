import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { RouteScrollManager } from "@/components/route-scroll-manager";
import { ScrollProgressIndicator } from "@/components/article-reading-progress";
import { GoogleAnalyticsPageView } from "@/components/google-analytics-page-view";

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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ratsonbase Construction Limited — Building with purpose" }],
    description:
      "Construction, civil engineering, renovation and property solutions across Nigeria.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ratsonbase Construction Limited",
    description:
      "Construction, civil engineering, renovation and property solutions across Nigeria.",
    images: ["/opengraph-image"],
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
        <Script id="google-analytics" strategy="afterInteractive">
          {`\n            window.dataLayer = window.dataLayer || [];\n            window.gtag = function(){ window.dataLayer.push(arguments); };\n            window.gtag("js", new Date());\n            window.gtag("config", "G-GWNTCT34LH", { send_page_view: false });\n            var analyticsScript = document.createElement("script");\n            analyticsScript.async = true;\n            analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-GWNTCT34LH";\n            document.head.appendChild(analyticsScript);\n          `}
        </Script>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <RouteScrollManager />
        <ScrollProgressIndicator />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
