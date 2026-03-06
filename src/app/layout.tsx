import type { Metadata } from "next";
import "./globals.css";
import { drukWide, garet } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "LKZ Site",
  description: "B2B-каталог лакокрасочной продукции",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${drukWide.variable} ${garet.variable}`}>
        {children}
      </body>
    </html>
  );
}