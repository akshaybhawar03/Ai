import "./globals.css";
import Navbar from "../components/Header";
import type { Metadata, Viewport } from "next";
import ServiceWorkerProvider from "../components/ServiceWorkerProvider";

// ✅ Metadata (server-only)
export const metadata: Metadata = {
  title: {
    default: "AI Finance Tools",
    template: "%s | AI Finance Tools",
  },
  description: "AI powered finance tools for smarter decision making.",
  manifest: "/manifest.json",

  // ✅ SEO Rich Meta
  openGraph: {
    title: "AI Finance Tools",
    description: "Latest finance news, live stock market updates, and crypto insights.",
    url: "https://yourdomain.com",
    siteName: "AI Finance Tools",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "AI Finance Tools Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Tools",
    description: "Finance news, stocks & crypto in one place.",
    images: ["/preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
  keywords: ["Finance", "Stocks", "Crypto", "AI Tools", "News"],
  authors: [{ name: "AI Finance Tools Team" }],
};

// ✅ ThemeColor अब viewport में होगा
export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <ServiceWorkerProvider /> {/* 👈 SW यहाँ register होगा */}
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
