import { Navbar } from "@components/layouts/Navbar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Sidebar from "./components/layouts/Sidebar";
import "./globals.css";
import Wrapper from "./wrapper";
import LoginPopup from "./components/elements/Popup/Login";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Beddit",
  description: "My Reddit clone",
};

export const fetchCache = "force-cache"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <body>
          <Navbar />
          <LoginPopup />
          <main className="flex gap-4 px-4 py-4">
            {children}
            <Sidebar />
          </main>
        </body>
      </html>
    </Wrapper>
  );
}
