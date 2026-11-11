import type { Metadata } from "next";
import { Italiana, Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      className={`${ubuntu.variable} ${italiana.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
