import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Partners from "../components/Partners";
import ProductCatalog from "../components/ProductCatalog";
import WhyChooseUs from "../components/WhyChooseUs";
import SimpleProcess from "../components/SimpleProcess";
import PartnerCTA from "../components/PartnerCTA";

export default function HomePage() {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Overlay agar background tidak terlalu dominan dan teks tetap terbaca */}
      <div className="absolute inset-0 z-0 bg-white/85" />
      
      <div className="relative z-10">
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
