import type { Metadata } from "next";
import { Poppins, Epilogue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = localFont({
  src: "../../public/fonts/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Optivus Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${epilogue.variable} ${caveat.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
