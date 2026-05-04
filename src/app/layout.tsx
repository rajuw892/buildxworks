import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import { CalEmbed } from "@/components/CalEmbed";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildxworks.com";
const title = "BuildXWorks — Idea to live product. In weeks.";
const description =
  "End-to-end product builds for founders — websites, apps, and SaaS. Three production products live, 3,000+ users served. Solo founder, AI-accelerated.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — BuildXWorks",
  },
  description,
  applicationName: "BuildXWorks",
  authors: [{ name: "Raju Raman" }],
  keywords: [
    "product studio",
    "AI development",
    "SaaS development",
    "MVP development",
    "Next.js studio",
    "founder studio",
    "B2B SaaS",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "BuildXWorks",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@buildxworks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-surface text-white">
          <Providers>{children}</Providers>
          <CalEmbed />
        </body>
    </html>
  );
}
