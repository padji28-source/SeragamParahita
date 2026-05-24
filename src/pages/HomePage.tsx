import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Partners from "../components/Partners";
import ProductCatalog from "../components/ProductCatalog";
import WhyChooseUs from "../components/WhyChooseUs";
import SimpleProcess from "../components/SimpleProcess";
import PartnerCTA from "../components/PartnerCTA";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HomePage() {
  // 1. Ref & Parallax untuk Global Background (/background.png)
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div ref={ref} className="relative min-h-screen bg-white">
      
      <div className="relative z-10 w-full overflow-hidden">
        <Hero />
        <AboutSection />
        <Partners />
        <ProductCatalog />
        <WhyChooseUs />
        
        <SimpleProcess />

        <PartnerCTA />
      </div>
    </div>
  );
}
