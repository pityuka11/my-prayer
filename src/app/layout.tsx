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
  return children;
}
