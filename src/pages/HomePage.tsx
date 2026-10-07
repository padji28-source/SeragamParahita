import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Partners from "../components/Partners";
import ProductCatalog from "../components/ProductCatalog";
import WhyChooseUs from "../components/WhyChooseUs";
import SimpleProcess from "../components/SimpleProcess";
import PartnerCTA from "../components/PartnerCTA";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      
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
