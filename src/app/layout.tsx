import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { YandexMetrika } from "@/components/YandexMetrika";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Лида.ai — AI-SDR агентство для B2B",
  description:
    "15 встреч с вашей ЦА каждый месяц. Без звонков с вашей стороны. Или возврат.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
