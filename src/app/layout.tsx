import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://outsourcedbookkeepingservices.co.uk"),
  title: {
    default: "Outsourced Bookkeeping Services UK | Fixed Fee, No Contract",
    template: "%s | Outsourced Bookkeeping Services UK",
  },
  description:
    "Professional outsourced bookkeeping services for UK businesses. Fixed monthly fees, MTD-compliant, no long-term contract. Get your free assessment today.",
  keywords: [
    "outsourced bookkeeping services",
    "outsourced bookkeeping services UK",
    "remote bookkeeping UK",
    "bookkeeping services for small businesses",
    "fixed fee bookkeeping UK",
    "MTD bookkeeping",
    "cloud bookkeeping UK",
    "VAT return service UK",
    "payroll bookkeeping UK",
    "Xero bookkeeping UK",
    "QuickBooks bookkeeping UK",
    "Making Tax Digital compliance",
    "bookkeeping for sole traders",
    "bookkeeping for limited companies",
  ],
  authors: [{ name: "Outsourced Bookkeeping Services" }],
  creator: "Outsourced Bookkeeping Services",
  publisher: "Outsourced Bookkeeping Services",
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
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://outsourcedbookkeepingservices.co.uk",
    title: "Outsourced Bookkeeping Services UK | Fixed Fee, No Contract",
    description:
      "Professional outsourced bookkeeping services for UK businesses. Fixed monthly fees, MTD-compliant, no long-term contract.",
    siteName: "Outsourced Bookkeeping Services",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Outsourced Bookkeeping Services UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outsourced Bookkeeping Services UK | Fixed Fee, No Contract",
    description:
      "Professional outsourced bookkeeping services for UK businesses. Fixed monthly fees, MTD-compliant.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://outsourcedbookkeepingservices.co.uk",
  },
  category: "Business Services",
  verification: {
    google: "54fGUBgVu5JtTNuEiQ0xO6tA8MzlhKbZx3PFBXR9G_o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vymvftm6hw");
          `}
        </Script>
      </body>
    </html>
  );
}
