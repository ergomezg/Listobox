import { Plus_Jakarta_Sans } from "next/font/google";

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const plusJakartaAccent = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});
