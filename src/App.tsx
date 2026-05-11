/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PartnerPage from "./pages/PartnerPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(10px)",
    scale: 0.99
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Custom professional easing
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(5px)",
    scale: 0.99,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <HomePage />
            </motion.div>
          } 
        />
        <Route 
          path="/products" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <ProductsPage />
            </motion.div>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <ProductDetailPage />
            </motion.div>
          } 
        />
        <Route 
          path="/partner" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <PartnerPage />
            </motion.div>
          } 
        />
        <Route 
          path="/about" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <AboutPage />
            </motion.div>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <ContactPage />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden">
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
