import type { Metadata } from "next";
import {
  Hanken_Grotesk,
  Noto_Serif_JP,
  Sorts_Mill_Goudy,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sortsMillGoudy = Sorts_Mill_Goudy({
  variable: "--font-sorts-mill-goudy",
  subsets: ["latin"],
  weight: "400",
});

const zenKakuGothic = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "KOTOO | Socks in Nara",
  description: "奈良から届ける、ふっくらとした時間。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${hankenGrotesk.variable} ${notoSerifJp.variable} ${sortsMillGoudy.variable} ${zenKakuGothic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
