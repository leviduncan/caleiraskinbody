import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { site } from "@/content/site";
import { CalProvider } from "@/components/booking/CalProvider";
import "./globals.css";

// The optical-size axis is loaded so globals.css can pin Bodoni to its small-size cut.
const displayFace = Bodoni_Moda({
  variable: "--font-display-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const sansFace = Jost({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // PhotoBackdrop's inline script adds data-photo-pick here before React hydrates.
    <html
      lang="en"
      className={`${displayFace.variable} ${sansFace.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Without JavaScript nothing can trigger the scroll reveals, so show everything. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <CalProvider />
        {children}
      </body>
    </html>
  );
}
