import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bess & Niels — Wedding",
  description: "Join us to celebrate the wedding of Bess and Niels.",
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
        {/* Cormorant Garamond (serif) + Lato (sans) + Nothing You Could Do (script) loaded at runtime */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&family=Nothing+You+Could+Do&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
