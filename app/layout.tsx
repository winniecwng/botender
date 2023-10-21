import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Botender",
  description:
    "Botender is your AI personal bartender that leverages API technology to serve up a vast menu of delicious coctail recipes and dink concotions right at your fingertips. With Botender, you can easily access a wide array of drink recipes, ingredient lists, and even real-time suggestions for the perfect cocktail based on what's in your bar. Whether you're a seasoned mixologist or a novice looking to impress your guests, Botender ensures you'll never be short of inspiration for your next drink. Cheers to the future of mixology!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
