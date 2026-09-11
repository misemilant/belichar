import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BELICHAR — Jual Char Point Blank & Top Up PB Cash",
  description: "Marketplace Character Point Blank dan Top Up PB Cash dengan pembayaran DANA dan QRIS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}