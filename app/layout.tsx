import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundFx from "@/components/BackgroundFx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/lib/ContentContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ANAS — SolidWorks Mechanical Designer | Sheet Metal & 3D CAD Modeling",
  description:
    "ANAS is a SolidWorks mechanical designer specializing in sheet metal design, 3D CAD modeling, mechanical assemblies and manufacturing-ready engineering drawings.",
  keywords: [
    "SolidWorks",
    "Mechanical Designer",
    "Sheet Metal Design",
    "3D CAD Modeling",
    "AutoCAD",
    "Engineering Drawings",
    "Mechanical Assemblies",
  ],
  authors: [{ name: "ANAS" }],
  openGraph: {
    title: "ANAS — SolidWorks Mechanical Designer",
    description:
      "Turning engineering ideas into accurate, manufacturable designs. 3D CAD Modeling, Sheet Metal, Assemblies, and Drawings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ContentProvider>
          <BackgroundFx />
          <Navbar />
          {children}
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
