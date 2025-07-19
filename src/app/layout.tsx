import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google";
import "./globals.css";
import MyDock from "@/components/layout/MyDock";
import MyNavbar from "@/components/layout/MyNavbar";

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
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MyNavbar />
          <div className="mt-20 md:pt-10">
            {children}
          <MyDock />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
