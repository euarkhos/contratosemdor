import type { Metadata } from "next";
import { DM_Sans, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["200", "300", "400", "500", "600"],
});

/** Hero H1 — alinhado à referência marketing (serif display) */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-hero-serif",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Contrato sem Dor",
  description:
    "Pré-análise de contratos por IA e análise humana por estudantes de direito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${dmSans.variable} ${outfit.variable} ${playfair.variable}`}
    >
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
