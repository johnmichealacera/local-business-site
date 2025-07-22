import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getSiteInfo } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo();
  const siteName = siteInfo?.name;
  
  return {
    title: `${siteName} - ${siteInfo?.description}`,
    description: siteInfo?.description,
    icons: {
      icon: siteInfo?.logoUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteInfo = await getSiteInfo();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics googleAnalyticsTag={siteInfo?.googleAnalyticsTag} />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
