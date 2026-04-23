import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boxit — The receipts. All of them. Sorted.",
  description:
    "Email them, photograph them, forward them. Boxit files each one under the right category — ready for taxes.",
  openGraph: {
    title: "Boxit — The receipts. All of them. Sorted.",
    description:
      "Email them, photograph them, forward them. Boxit files each one under the right category — ready for taxes.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Boxit&accent=amber&category=Personal%20finance",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Boxit&accent=amber&category=Personal%20finance",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
