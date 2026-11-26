import type { Metadata } from "next";
import { Inter, Italiana } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Trú Aesthetics | Cosmetic Surgery & Hair Transplant, Mangaluru",
  description:
    "Cosmetic surgery and hair transplant clinic in Bendoor, Mangaluru, in association with Dr Mohan Thomas Aesthetics, Mumbai.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Extensions (e.g. QuillBot) add attributes to <html> before React loads; this only
    // silences attribute mismatches on this one element, not on its children.
    <html
      lang="en"
      className={`${inter.variable} ${italiana.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
