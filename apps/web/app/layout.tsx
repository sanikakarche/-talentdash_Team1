import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: ["latin"],
  });

export const metadata: Metadata =
  {
    title: {
      default:
        "TalentDash — Explore. Compare. Grow.",

      template:
        "%s | TalentDash",
    },

    description:
      "Real salary data, honest reviews, interview prep and career intelligence from millions of professionals worldwide.",

    metadataBase:
      new URL(
        "https://talentdash.com",
      ),

    openGraph: {
      title: "TalentDash",

      description:
        "Explore salaries, workplace reviews, interviews and jobs globally.",

      url: "https://talentdash.com",

      siteName:
        "TalentDash",

      type: "website",

      images: [
        {
          url: "/og/default.png",

          width: 1200,

          height: 630,

          alt: "TalentDash",
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title: "TalentDash",

      description:
        "Explore. Compare. Grow.",

      images: [
        "/og/default.png",
      ],
    },

    robots: {
      index: true,

      follow: true,
    },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 font-sans text-gray-900 antialiased`}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}