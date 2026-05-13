import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

// UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/src/constants";

// Easing profesional (Cepat di awal, sangat halus di akhir)
const smoothEase = [0.16, 1, 0.3, 1];

const mobileMenuVars = {
  initial: { opacity: 0, y: -15, scale: 0.98, transformOrigin: "top" },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.5, 
      ease: smoothEase,
      staggerChildren: 0.05,
      delayChildren: 0.05
    } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.98, 
    transition: { duration: 0.3, ease: smoothEase } 
  }
};

const mobileLinkVars = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: smoothEase } },
};

export default function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);

  const { scrollY } = useScroll();

  // Scroll Logic dengan Threshold agar tidak flicker
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
    
    const scrollDelta = latest - lastYPos;
    
    if (latest > 100 && scrollDelta > 10 && !isOpen) {
      setIsHidden(true); // Scroll ke bawah: Sembunyikan
    } else if (scrollDelta < -10) {
      setIsHidden(false); // Scroll ke atas: Tampilkan
    }
    setLastYPos(latest);
  });

  // Reset menu saat ganti halaman
  useEffect(() => {
    setIsOpen(false);
    setIsProductsOpen(false);
  }, [location.pathname]);

  const currentLanguage = i18n.language.startsWith('id') ? 'ID' : 'EN';

  // Helper untuk class link aktif
  const getLinkStyle = (path: string) => cn(
    "px-4 py-2.5 text-[15px] font-bold transition-all duration-300 ease-out relative",
    location.pathname === path 
      ? "text-red-600 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[3px] after:bg-red-600 after:rounded-full" 
      : "text-gray-700 hover:text-red-600"
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <motion.header 
      initial={{ y: "-100%" }}
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: smoothEase }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "border-b border-gray-100/50 bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] h-16 md:h-20" 
          : "bg-white border-b border-transparent h-20 md:h-24"
      )}
    >
      <div className="container mx-auto flex h-full items-center px-4 lg:px-8">
        
        {/* KIRI: Logo */}
        <div className="flex flex-1 justify-start">
          <Link to="/" className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80">
            <img 
              src="/Logo.png" 
              alt="Logo" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* TENGAH: Navigasi Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-2">
          <Link to="/" className={getLinkStyle("/")}>
            {t('nav.home')}
          </Link>
          
          <div 
            className="relative flex items-center h-full"
            onMouseEnter={() => setIsDesktopProductsOpen(true)}
            onMouseLeave={() => setIsDesktopProductsOpen(false)}
          >
            <Link to="/product" className={cn(getLinkStyle("/product"), "outline-none")} onClick={(e) => {
              if (window.innerWidth >= 1024) e.preventDefault();
            }}>
              {t('nav.products')}
            </Link>
            
            <AnimatePresence>
              {isDesktopProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+4px)] w-52 p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-xl border border-gray-100/60 z-50 overflow-hidden"
                >
                  <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                  {PRODUCTS.map((product) => (
                    <Link 
                      key={product.id}
                      to={`/product/${product.id}`}
                      className={cn(
                        "w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 block",
                        location.pathname === `/product/${product.id}` 
                          ? "bg-red-50 text-red-600" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-0.5"
                      )}
                      onClick={() => setIsDesktopProductsOpen(false)}
                    >
                      {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/partner" className={getLinkStyle("/partner")}>{t('nav.partner')}</Link>
          <Link to="/contact" className={getLinkStyle("/contact")}>{t('nav.contact')}</Link>
        </div>

        {/* KANAN: Language & Mobile Toggle */}
        <div className="flex flex-1 justify-end items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden sm:flex items-center gap-2 font-semibold h-10 px-3 rounded-xl bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-300 group"
              )}
            >
              <Globe className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              <span>{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 opacity-50 ml-1 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-2xl p-2 bg-white/95 backdrop-blur-xl shadow-xl border-gray-100">
              <DropdownMenuItem onClick={() => changeLanguage('id')} className={cn("rounded-xl cursor-pointer py-2.5", i18n.language.startsWith('id') ? "text-red-600 bg-red-50" : "text-gray-600")}>
                Bahasa Indonesia
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("rounded-xl cursor-pointer py-2.5", i18n.language.startsWith('en') ? "text-red-600 bg-red-50" : "text-gray-600")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button 
            className={cn(
              "p-2.5 rounded-xl border lg:hidden transition-all duration-300 active:scale-95",
              isOpen ? "bg-red-50 border-red-100 text-red-600" : "bg-white border-gray-200 text-gray-700"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[4.5rem] bg-gray-900/10 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              variants={mobileMenuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full right-0 w-full sm:w-[400px] sm:right-4 sm:mt-2 bg-white/95 backdrop-blur-2xl border border-gray-100 sm:rounded-3xl shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col p-4 space-y-1">
                <motion.div variants={mobileLinkVars}>
                  <Link to="/" className={cn("block px-4 py-3 rounded-2xl text-[15px] font-semibold", location.pathname === "/" ? "bg-red-50 text-red-600" : "text-gray-600")}>
                    {t('nav.home')}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileLinkVars}>
                  <button 
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={cn("px-4 py-3 rounded-2xl text-[15px] font-semibold flex items-center justify-between w-full", isProductsOpen ? "bg-gray-50 text-gray-900" : "text-gray-600")}
                  >
                    <span>{t('nav.products')}</span>
                    <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", isProductsOpen ? "rotate-90" : "")} />
                  </button>
                  
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50/50 rounded-2xl mt-1"
                      >
                        {PRODUCTS.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className={cn("block px-8 py-2.5 text-sm font-medium", location.pathname === `/product/${product.id}` ? "text-red-600" : "text-gray-500")}
                          >
                            {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {['partner', 'contact'].map((item) => (
                  <motion.div key={item} variants={mobileLinkVars}>
                    <Link 
                      to={`/${item}`} 
                      className={cn("block px-4 py-3 rounded-2xl text-[15px] font-semibold", location.pathname === `/${item}` ? "bg-red-50 text-red-600" : "text-gray-600")}
                    >
                      {t(`nav.${item}`)}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={mobileLinkVars} className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between px-4">
                   <span className="text-sm font-bold text-gray-400">LANGUAGE</span>
                   <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                      {['id', 'en'].map((lng) => (
                        <button
                          key={lng}
                          onClick={() => changeLanguage(lng)}
                          className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", i18n.language.startsWith(lng) ? "bg-white text-red-600 shadow-sm" : "text-gray-500")}
                        >
                          {lng.toUpperCase()}
                        </button>
                      ))}
                   </div>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
