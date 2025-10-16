import type { Metadata } from "next";
import "./globals.css";

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
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2W5D1FJ4QV"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2W5D1FJ4QV');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
