import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { CalEmbed } from "@/components/CalEmbed";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildXWorks — Build Faster. Launch Smarter.",
  description:
    "AI-powered design & development studio for startups. We build premium websites, apps, and SaaS products with startup speed and world-class execution.",
  openGraph: {
    title: "BuildXWorks — Build Faster. Launch Smarter.",
    description:
      "AI-powered design & development studio for startups. Premium websites, apps, and SaaS products delivered in weeks.",
    type: "website",
    locale: "en_US",
    siteName: "BuildXWorks",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildXWorks — Build Faster. Launch Smarter.",
    description:
      "AI-powered design & development studio for startups. Premium websites, apps, and SaaS products delivered in weeks.",
  },
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
