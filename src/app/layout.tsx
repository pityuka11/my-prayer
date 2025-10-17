import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "my prayer",
  description: "Prayer community website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3327510980686562"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="adsense-auto-ads"
          strategy="afterInteractive"
        >
          {`
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-1234567890123456",
              enable_page_level_ads: true
            });
          `}
        </Script>
      </head>
      <GoogleAnalytics gaId="G-2W5D1FJ4QV" />
      <body>{children}</body>
    </html>
  );
}
