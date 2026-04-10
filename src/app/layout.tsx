import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "@/components/Providers";
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
          {/* Cal.com embed — self-contained bootstrap + init */}
          <Script id="cal-embed" strategy="afterInteractive">{`
(function(C,A,L){var p=function(a,ar){a.q.push(ar)};var d=C.document;C.Cal=C.Cal||function(){var cal=C.Cal;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];var s=d.createElement("script");s.src=A;d.head.appendChild(s);cal.loaded=true}if(arguments[0]===L){p(cal,arguments);return}var api=function(){p(api,arguments)};var ns=arguments[0];api.q=api.q||[];if(typeof ns==="string"){cal.ns[ns]=cal.ns[ns]||api;p(cal.ns[ns],arguments);p(cal,["initNamespace",ns])}else{p(cal,arguments)}return typeof ns==="string"?cal.ns[ns]:void 0};
})(window,"https://app.cal.com/embed/embed.js","init");
Cal("init",{origin:"https://cal.com"});
Cal("ui",{theme:"dark",styles:{branding:{brandColor:"#6366f1"}}});
          `}</Script>
        </body>
    </html>
  );
}
