import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { YandexMetrika } from "@/components/YandexMetrika";
import { GlobalSpotlight } from "./GlobalSpotlight";
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
  title: "VectorUpX — AI-SDR для B2B-продаж",
  description:
    "AI-агент Лида находит ЛПР в B2B IT/SaaS, ведёт переписку и сама ставит встречу в ваш календарь. 15 встреч в месяц — гарантия в договоре.",
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
      <body className="bg-stone-950 antialiased">
        {children}
        <GlobalSpotlight />
        <YandexMetrika />
      </body>
    </html>
  );
}
