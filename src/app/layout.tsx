import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "How to",
  description: "forum to let people teach each other",
  metadataBase: new URL("https://how-to.com"),
  themeColor: "#000000",
  manifest: "/manifest.json",
  // NEW:
  other: {
    lang: "en", // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        <main className="pt-16 bg-gradient-to-br from-gray-900 to-gray-800">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
