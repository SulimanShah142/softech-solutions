import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalGlowCursor from "@/components/GlobalGlowCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SofTech Solutions | Technology for What's Next",
    template: "%s | SofTech Solutions",
  },
  description:
    "SofTech Solutions builds applied AI, custom software, digital products, and automation that move businesses forward.",
  applicationName: "SofTech Solutions",
  themeColor: "#030a18",
  icons: {
    icon: "/softech-solutions-image.png",
    shortcut: "/favicon.ico",
    apple: "/softech-solutions-image.png",
  },
  openGraph: {
    title: "SofTech Solutions | Technology for What's Next",
    description:
      "SofTech Solutions builds applied AI, custom software, digital products, and automation that move businesses forward.",
    siteName: "SofTech Solutions",
    type: "website",
    images: ["/softech-solutions-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SofTech Solutions | Technology for What's Next",
    description:
      "SofTech Solutions builds applied AI, custom software, digital products, and automation that move businesses forward.",
    images: ["/softech-solutions-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {children}
        <GlobalGlowCursor />
      </body>
    </html>
  );
}