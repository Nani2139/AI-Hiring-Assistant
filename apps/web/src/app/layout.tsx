import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Shell } from "@/components/organisms/Shell";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif" });
const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "guk.ai Hire",
  description: "Source, screen, and review candidates in one hiring portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
