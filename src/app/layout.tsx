import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat } from "next/font/google";
import localFont from "next/font/local";
import { ElectricGrid } from "@/components/electric-grid";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Field Notes — Usman",
    template: "%s — Field Notes",
  },
  description:
    "A front-row seat to the AI era — from someone actually building in it. Notes on agentic AI, autonomous workflows, and what's coming next.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fieldnotes.blog",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Field Notes",
    title: "Field Notes — Usman",
    description:
      "Notes on agentic AI, autonomous workflows, and what's coming next.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@usman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-body">
        <ElectricGrid />
        <div className="relative z-[1] flex flex-col min-h-full">
          <Topbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
