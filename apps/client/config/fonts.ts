import {
  Boogaloo,
  Fira_Sans,
  Permanent_Marker,
  Poppins,
} from "next/font/google";

export const poppins = Poppins({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const marker = Permanent_Marker({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-marker",
});

export const boogaloo = Boogaloo({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-boogaloo",
});
