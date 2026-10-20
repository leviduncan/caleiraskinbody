import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { site } from "@/content/site";
import { IS_STAGING, SITE_URL } from "@/config/site-env";
import { CalProvider } from "@/components/booking/CalProvider";
import "./globals.css";

// No optical-size axis: without it Google serves Bodoni's default opsz 11 cut, the
// small-size cut globals.css wants, in much smaller files.
const displayFace = Bodoni_Moda({
  variable: "--font-display-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sansFace = Jost({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Staging only: the env flag comes from the deploy workflow and is removed at launch.
  ...(IS_STAGING && { robots: { index: false, follow: false } }),
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
