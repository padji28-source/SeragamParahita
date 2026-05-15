import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSocials from "./components/FloatingSocials";

// 1. Lazy Loading untuk performa maksimal
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PartnerPage = lazy(() => import("./pages/PartnerPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Loading Fallback (Sederhana tapi penting)
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-red-100 border-t-red-600 rounded-full animate-spin" />
  </div>
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        // Delay sedikit agar animasi halaman selesai dulu baru scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(10px)", scale: 0.99 },
  animate: { 
    opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, y: -10, filter: "blur(5px)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
  }
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    // Tambahkan mode="wait" agar halaman lama hilang dulu baru halaman baru muncul
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="will-change-[opacity,transform]" // Optimasi GPU
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* 2. Catch-all Route 404 */}
            <Route path="*" element={
              <div className="h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-9xl font-black text-gray-100">404</h1>
                <p className="text-gray-500 -mt-8 mb-8 font-medium">Page not found</p>
                <a href="/" className="px-6 py-3 bg-red-600 text-white rounded-full font-bold shadow-lg shadow-red-600/20">Back Home</a>
              </div>
            } />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* selection:bg-red-100 adalah detail kecil yang sangat "lux" */}
      <div className="min-h-screen bg-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <FloatingSocials />
        <Footer />
      </div>
    </Router>
  );
}
