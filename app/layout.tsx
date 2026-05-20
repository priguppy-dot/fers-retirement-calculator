import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FERS Retirement Calculator",
  description:
    "Estimate monthly retirement income from FERS pension and TSP withdrawals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
