import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niels & Bess — Wedding",
  description: "Join us to celebrate the wedding of Niels and Bess.",
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
        {/* Cormorant Garamond (serif) + Lato (sans) loaded at runtime */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
