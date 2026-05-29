import { Suspense, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSocials from "./components/FloatingSocials";

// Static imports for instant, lag-free routing transitions
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PartnerPage from "./pages/PartnerPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Loading Fallback (Used as a general safety net)
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-red-100 border-t-red-600 rounded-full animate-spin" />
  </div>
);

function ScrollToTop() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        // Delay sedikit agar animasi halaman selesai dulu baru scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { 
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, y: -12, filter: "blur(6px)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } 
  }
};

function AnimatedRoutes() {
  const location = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);
  
  return (
    // Tambahkan mode="wait" agar halaman lama hilang dulu baru halaman baru muncul
    // Hubungkan onExitComplete agar scroll disapu keatas setelah halaman keluar sempurna,
    // di saat layar kosong (atau transisi), menghindari scroll jump yang merusak keindahan visual.
    <AnimatePresence 
      mode="wait"
      initial={false}
      onExitComplete={() => {
        window.scrollTo(0, 0);
      }}
    >
      <motion.div 
        key={location.pathname}
        variants={pageVariants}
        initial={isInitialMount.current ? false : "initial"}
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
            <Route path="/about" element={<Navigate to="/tentang-kami" replace />} />
            <Route path="/tentang-kami" element={<AboutPage />} />
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
