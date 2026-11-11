import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { TitleSync } from "@/components/TitleSync";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Vireon Protocol",
    template: "%s · Vireon Protocol",
  },
  description:
    "Educational wellness protocol for men. Test your dose, follow the protocol and track your habits.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <TitleSync />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
