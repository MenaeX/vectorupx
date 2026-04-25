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
  metadataBase: new URL("https://menaex.github.io/vectorupx/"),
  title: "VectorUpX — 15 B2B-встреч в месяц от AI-агента Лида",
  description:
    "AI-агент Лида находит ЛПР в B2B IT/SaaS, ведёт переписку и сама ставит встречу в ваш календарь. 15 встреч в месяц — гарантия в договоре. Запуск за 5 рабочих дней.",
  openGraph: {
    title: "VectorUpX — 15 B2B-встреч в месяц от AI-агента Лида",
    description:
      "AI-агент находит ЛПР, ведёт переписку и ставит встречи в ваш календарь. Гарантия в договоре. Запуск за 5 рабочих дней.",
    url: "https://menaex.github.io/vectorupx/",
    siteName: "VectorUpX",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/vectorupx/og.jpg",
        width: 1059,
        height: 556,
        alt: "VectorUpX — AI-SDR для B2B-продаж",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VectorUpX — 15 B2B-встреч в месяц",
    description:
      "AI-агент находит ЛПР, пишет, ставит встречи. Гарантия в договоре.",
    images: ["/vectorupx/og.jpg"],
  },
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
