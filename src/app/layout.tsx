import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@volvo-cars/css/font-face.css";
import "@volvo-cars/css/tokens.css";
import "@volvo-cars/css/styles_all-media.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Volvo Car",
  description: "NextJs & TypeScript Project using volvo-cars/css",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
