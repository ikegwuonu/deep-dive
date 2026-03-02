import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepDive",
  description: "visualize the complete structure of any GitHub repository",
  authors: [{ name: "Juliet Ikegwuonu" }],
  keywords: [
    "github repository visualization",
    "directory structure visualization",
    "codebase visualization",
    "project structure visualization",
    "repository mapping",
    "codebase mapping",
    "project structure mapping",
    "github repo visualization",
    "directory tree visualization",
    "codebase tree visualization",
    "project structure tree visualization",
    "repository structure visualization",
    "repository visualization",
  ],
  creator: "Juliet Ikegwuonu",
  metadataBase: new URL("https://deep-dive-chi.vercel.app/"),
  openGraph: {
    title: "DeepDive",
    description: "visualize the complete structure of any GitHub repository",
    url: "https://deep-dive-chi.vercel.app/",
    siteName: "DeepDive",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
