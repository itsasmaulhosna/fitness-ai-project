import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitTrack — Transform Your Fitness Journey",
  description:
    "Discover expert-designed workout programs, track nutrition and goals, and achieve lasting results with FitTrack — your all-in-one fitness management platform.",
  openGraph: {
    title: "FitTrack — Transform Your Fitness Journey",
    description:
      "Discover expert-designed workout programs, track nutrition and goals, and achieve lasting results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
                <Toaster richColors position="top-right" />

      </body>
    </html>
  );
}
