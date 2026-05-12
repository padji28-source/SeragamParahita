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
    <>
      <Hero />
      <AboutSection />
      <ProductCatalog />
      <Partners />
      <LiveProjects />
      <OrderFlow />
    </>
  );
}
