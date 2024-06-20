import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ReactQuery from "@/components/ReactQuery";
import toast, { Toaster } from "react-hot-toast";

const fontSand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sand",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Reboot 20 - the most powerfull progress tracking app",
  description:
    "Reboot 20 is created for tracking daily, weekly, monthly and yearly progress to achieve goal and success in life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "m-auto max-w-xl bg-main font-sand text-stone-100 antialiased",
          fontSand.variable,
        )}
      >
        <ReactQuery>{children}</ReactQuery>
        <Toaster />
      </body>
    </html>
  );
}
