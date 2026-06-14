import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lost Light — 失われた光を取り戻せ",
  description:
    "世界から光が消えた。5つの問いで、記憶の底に沈んだ“光”の正体を探す静かな物語ゲーム。",
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
