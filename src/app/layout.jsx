import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const FunnelSans = localFont({
  src: [
    {
      path: "../../public/fonts/Funnel_Sans/static/FunnelSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Funnel_Sans/static/FunnelSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Funnel_Sans/static/FunnelSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Funnel_Sans/static/FunnelSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Funnel_Sans/static/FunnelSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-funnelsans",
});
export const metadata = {
  title: "Harsh Patel | Portfolio",
  description:
    "Harsh Patel's personal portfolio website built with Next.js, showcasing projects and skills.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${FunnelSans.variable} w-screen h-screen antialiased select-none flex justify-center cursor-default`}
      >
        {children}
      </body>
    </html>
  );
}
