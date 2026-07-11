import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Great_Vibes } from "next/font/google";
import "./alema.css";

// Elegant, romantic typefaces scoped to the /alema experience only.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vibes",
  display: "swap",
});

// A private surprise: keep it out of search engines.
export const metadata: Metadata = {
  title: "For Alema",
  robots: { index: false, follow: false },
};

export default function AlemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} alema-root`}
    >
      {children}
    </div>
  );
}
