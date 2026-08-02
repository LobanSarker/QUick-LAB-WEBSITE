import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPeople, getPublishedBlogs, getPublications, getResearchAreas } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "QuICK Research Group",
    template: "%s · QuICK Research Group",
  },
  description:
    "Quantum mechanics guided Intelligent Computation for Knowledge-based systems. We are QuICK to unlock knowledge at quantum speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = {
    blogs: getPublishedBlogs(),
    publications: getPublications(),
    people: getPeople(),
    areas: getResearchAreas(),
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background min-h-full flex flex-col text-foreground">
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Navbar searchIndex={searchIndex} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
