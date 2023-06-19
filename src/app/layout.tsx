import "./globals.css";
import { Anek_Gujarati as CustomFont } from "next/font/google";

const custom = CustomFont({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Anime Tracker",
  description: "Custom made page to keep track of animes watched",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${custom.className} bg-bg`}>{children}</body>
    </html>
  );
}
