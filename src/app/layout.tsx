import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google";
import "./globals.css";
import MyDock from "@/components/layout/MyDock";
import MyNavbar from "@/components/layout/MyNavbar";
import Footer from "@/components/layout/Footer";
import Script from 'next/script';
import Analytics from "@/components/Analytics";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JoblessCodersBD | Web Development Services",
  description: "Professional web development services by JoblessCodersBD. Build modern, responsive, and scalable websites with us.",
  keywords: ["JoblessCodersBD", "web development", "next.js", "frontend", "freelance devs", "Bangladesh", "programming services"],
  authors: [{ name: "JoblessCodersBD Team" }],
  robots: "index, follow",
  openGraph: {
    title: "JoblessCodersBD | Web Development Services",
    description: "We craft modern websites and applications for businesses and startups.",
    url: "https://joblesscodersbd.com",
    siteName: "JoblessCodersBD",
    type: "website",
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
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Analytics />
          <MyNavbar />
          <div className="mt-20 md:pt-10">
            {children}
          <MyDock />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

