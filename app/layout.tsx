import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { PwaRegister } from "@/components/PwaRegister";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Juegos de Leo",
  description: "Juegos didácticos para niños pequeños",
  applicationName: "Juegos de Leo",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Juegos de Leo",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffe5ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={nunito.variable}>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
