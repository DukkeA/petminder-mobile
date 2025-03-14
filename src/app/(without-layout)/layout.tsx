import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetMinder",
  description: "PetMinder",
  manifest: "/manifest.json",
  icons: {
    apple: "/petminder-512x512.png",
  },
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
        <img
          src="/login-background.webp"
          alt="Background"
          className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
        />
        {children}
      </body>
    </html>
  );
}
