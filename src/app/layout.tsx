import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { AnalyticsConsentBanner } from "@/components/analytics-consent-banner";
import { PerformanceMonitor } from "@/components/performance-monitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryan - Digital Designer & Creative Developer",
  description: "Ryan is a digital designer passionate about crafting visual experiences that blend creativity, strategy, and technology. Specializing in brand identity, motion graphics, and UI/UX design.",
  keywords: ["Ryan", "digital designer", "creative developer", "brand identity", "motion graphics", "UI/UX design", "web design", "portfolio", "visual design"],
  authors: [{ name: "Ryan" }],
  creator: "Ryan",
  publisher: "Ryan Design Studio",
  metadataBase: new URL("https://ryan-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ryan - Digital Designer & Creative Developer",
    description: "Passionate digital designer crafting visual experiences that blend creativity, strategy, and technology.",
    url: "https://ryan-portfolio.vercel.app",
    siteName: "Ryan Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ryan - Digital Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan - Digital Designer & Creative Developer",
    description: "Passionate digital designer crafting visual experiences that blend creativity, strategy, and technology.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ryan",
    "jobTitle": "Digital Designer & Creative Developer",
    "description": "Passionate digital designer crafting visual experiences that blend creativity, strategy, and technology.",
    "url": "https://ryan-portfolio.vercel.app",
    "sameAs": [
      "https://twitter.com/ryan",
      "https://instagram.com/ryan",
      "https://dribbble.com/ryan",
      "https://behance.net/ryan"
    ],
    "knowsAbout": [
      "Digital Design",
      "Brand Identity",
      "Motion Graphics",
      "UI/UX Design",
      "Web Development",
      "Creative Strategy"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Ryan Design Studio"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
        <AnalyticsConsentBanner />
        <PerformanceMonitor />
        <Toaster />
      </body>
    </html>
  );
}
