import type { Metadata } from "next";
import { Space_Grotesk, Be_Vietnam_Pro } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "IOD - Pumptrack Edition",
  description: "Protective gear for the 5-10 crew. 100% Fabric. Zero Plastic.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { VisualEditing } from "next-sanity/visual-editing";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${beVietnamPro.variable} h-full antialiased dark`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <Header />
          <CartDrawer />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <VisualEditing />
        </CartProvider>
        </AuthProvider>
        {/* Replace GTM-XXXXXXX with your actual Google Tag Manager ID or Google Ads AW-ID */}
        <GoogleTagManager gtmId="GTM-XXXXXXX" />
      </body>
    </html>
  );
}
