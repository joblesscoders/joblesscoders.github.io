import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MyDock from "@/components/layout/MyDock";
import MyNavbar from "@/components/layout/MyNavbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Footer from "@/components/layout/Footer";
import Script from 'next/script';
import Analytics from "@/components/Analytics";
import { WebVitals } from "@/components/WebVitals";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";
import ScrollTriggerProvider from "@/components/layout/ScrollTriggerProvider";
import { DevOpacityDiagnostic } from "@/components/DevOpacityDiagnostic";
import CursorCompanion from "@/components/layout/CursorCompanion";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Web, Mobile, AI & Cloud Engineering`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/Jobless_coders_colored.png",
  },
  openGraph: {
    title: `${siteConfig.name} | Web, Mobile, AI & Cloud Engineering`,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Web, Mobile, AI & Cloud Engineering`,
    description: siteConfig.shortDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-L2GV24L652"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L2GV24L652', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline focus:outline-2 focus:outline-ring font-medium text-sm transition-transform"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <ScrollTriggerProvider />
          <DevOpacityDiagnostic />
          <CursorCompanion />
          <Analytics />
          <WebVitals />
          <MyNavbar />
          <main id="main-content" className="mt-20 md:pt-10 pb-24 sm:pb-28">
            {children}
            <MyDock />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

