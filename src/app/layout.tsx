import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-miri-serif", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Ratsonbase Construction Limited | Building with Purpose", template: "%s | Ratsonbase Construction Limited" },
  description: "Ratsonbase Construction Limited delivers considered construction, engineering and property development solutions with quality at every stage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${bricolage.variable} ${lora.variable} antialiased`}>{children}</body></html>;
}
