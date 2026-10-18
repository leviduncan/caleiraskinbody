import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Freebie } from "@/components/sections/Freebie";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Navigation } from "@/components/sections/Navigation";
import { Services } from "@/components/sections/Services";
import { SkinToneBand } from "@/components/sections/SkinToneBand";
import { Testimonial } from "@/components/sections/Testimonial";
import { Visit } from "@/components/sections/Visit";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function Home() {
  return (
    <>
      <PageBackdrop />
      <Navigation />
      <main>
        <Hero />
        <SkinToneBand tall />
        <Intro />
        <Services />
        <Experience />
        <About />
        <Testimonial />
        <Freebie />
        <Faq />
        <FinalCta />
        <Visit />
      </main>
      <SkinToneBand />
      <Footer />
      <FloatingActions />
      <RevealOnScroll />
    </>
  );
}
