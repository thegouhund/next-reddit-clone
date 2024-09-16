import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import { SidebarProvider } from "./context/useSidebar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="flex gap-4 px-8 py-4 {}">
          <SidebarProvider>
            {children}
            <Sidebar />
          </SidebarProvider>
        </main>
      </body>
    </html>
  );
}
