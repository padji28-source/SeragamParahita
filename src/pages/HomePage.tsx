import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Partners from "../components/Partners";
import ProductCatalog from "../components/ProductCatalog";
import LiveProjects from "../components/LiveProjects";
import OrderFlow from "../components/OrderFlow";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/bg3.png')" }}
    >
      {/* Overlay agar background tidak terlalu dominan dan teks tetap terbaca */}
      <div className="absolute inset-0 z-0 bg-white/50" />
      
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <ProductCatalog />
        <Partners />
        <LiveProjects />
        <OrderFlow />
      </div>
    </div>
  );
}
