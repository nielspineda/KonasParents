import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bess & Niels — Wedding",
  description: "Join us to celebrate the wedding of Bess and Niels.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Cormorant Garamond (serif) + Lato (sans) + La Belle Aurore (script) + Caveat (handwriting) + Nothing You Could Do loaded at runtime */}
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=La+Belle+Aurore&family=Lato:wght@300;400;700&family=Nothing+You+Could+Do&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
