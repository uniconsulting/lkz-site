import localFont from "next/font/local";

export const drukWide = localFont({
  src: "../fonts/druk-wide/druktextwidecyr-bold.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const garet = localFont({
  src: [
    {
      path: "../fonts/garet/Garet-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/garet/Garet-Heavy.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});