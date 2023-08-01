import { Lexend } from "next/font/google";
import localFont from "next/font/local";

export const greycliffCfBold = localFont({
    display: "swap",
    src: "./GreycliffCF-Bold.woff2",
    variable: "--fonts-greycliff-cf-bold",
});
export const greycliffCfHeavy = localFont({
    display: "swap",
    src: "./GreycliffCF-Heavy.woff2",
    variable: "--fonts-greycliff-cf-heavy",
});
export const lexend = Lexend({
    display: "swap",
    subsets: ["latin"],
    variable: "--fonts-lexend",
});
