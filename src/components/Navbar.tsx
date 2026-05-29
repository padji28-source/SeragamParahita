import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

const snapEase = [0.25, 1, 0.5, 1];

const mobileMenuVars = {
  initial: { opacity: 0, y: -10 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: snapEase,
      staggerChildren: 0.05,
      delayChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.3, ease: "easeInOut" } 
  }
};

const mobileItemVars = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 }
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

  // Smart Hide/Show on Scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
    const scrollDelta = latest - lastYPos;
    
    if (latest > 100 && scrollDelta > 15 && !isOpen) {
      setIsHidden(true);
    } else if (scrollDelta < -15) {
      setIsHidden(false);
    }
    setLastYPos(latest);
  });

  useEffect(() => {
    setIsOpen(false);
    setIsProductsOpen(false);
  }, [location.pathname]);

  const currentLanguage = i18n.language.startsWith('id') ? 'ID' : 'EN';
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  // Helper style menu desktop
  const navLinkClass = (path: string) => {
    const isActive = path === "/" 
      ? location.pathname === "/" 
      : location.pathname.startsWith(path);
      
    return cn(
      "text-[13px] font-bold tracking-wider uppercase px-4 py-2 transition-all relative duration-300 rounded-xl",
      isActive ? "text-red-600 bg-red-50/50" : "text-gray-500 hover:text-gray-950 hover:bg-gray-50/80"
    );
  };

  return (
    <motion.header 
      initial={false}
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: snapEase }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "border-b border-gray-200/80 bg-white h-16 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" 
          : "bg-white/50 backdrop-blur-sm h-20 md:h-24"
      )}
    >
      <div className="container mx-auto max-w-7xl h-full flex items-center justify-between px-6 lg:px-10">
        
        {/* LOGO AREA */}
        <div className="flex items-center">
          <Link to="/" aria-label="Parahita Prima Sentosa Home" className="transition-transform hover:scale-105 active:scale-95 duration-300">
            <img 
              src="/Logo.png" 
              alt="Parahita Logo" 
              className={cn(
                "w-auto object-contain transition-all duration-500",
                isScrolled ? "h-9" : "h-12"
              )}
            />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <Link to="/" className={navLinkClass("/")}>
            <span className="relative z-10">{t('nav.home')}</span>
          </Link>
          
          {/* Products Link */}
          <Link 
            to="/products" 
            className={navLinkClass("/product")}
          >
            <span className="relative z-10">{t('nav.products')}</span>
          </Link>

          {/* Partner */}
          <Link to="/partner" className={navLinkClass("/partner")}>
            <span className="relative z-10">{t('nav.partner')}</span>
          </Link>

          {/* About */}
          <Link to="/tentang-kami" className={navLinkClass("/tentang-kami")}>
            <span className="relative z-10">{t('nav.about')}</span>
          </Link>

          {/* Contact */}
          <Link to="/contact" className={navLinkClass("/contact")}>
            <span className="relative z-10">{t('nav.contact')}</span>
          </Link>
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden sm:flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest h-10 px-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all focus:ring-0 outline-none"
              )}
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-700">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-gray-300 group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-2xl p-1.5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-gray-100 mt-2">
              <DropdownMenuItem onClick={() => changeLanguage('id')} className={cn("rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold", i18n.language.startsWith('id') ? "text-red-600 bg-red-50/50" : "text-gray-600 hover:bg-gray-50")}>
                BAHASA INDONESIA
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("rounded-xl cursor-pointer py-2.5 px-3 text-xs font-bold", i18n.language.startsWith('en') ? "text-red-600 bg-red-50/50" : "text-gray-600 hover:bg-gray-50")}>
                ENGLISH
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hamburg Button Menu */}
          <button 
            className="p-2.5 text-gray-600 hover:text-gray-950 lg:hidden transition-all rounded-xl hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/5 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              variants={mobileMenuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col p-6 space-y-1">
                <motion.div variants={mobileItemVars}>
                  <Link to="/" className={cn("block px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-wider", location.pathname === "/" ? "bg-gray-50 text-red-600" : "text-gray-600")}>
                    {t('nav.home')}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileItemVars}>
                  <Link to="/products" className={cn("block px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-wider", location.pathname.startsWith("/product") ? "bg-gray-50 text-red-600" : "text-gray-600")}>
                    {t('nav.products')}
                  </Link>
                </motion.div>

                {[
                  { key: 'about', label: t('nav.about'), path: '/tentang-kami' },
                  { key: 'partner', label: t('nav.partner'), path: '/partner' },
                  { key: 'contact', label: t('nav.contact'), path: '/contact' }
                ].map((item) => (
                  <motion.div key={item.key} variants={mobileItemVars}>
                    <Link 
                      to={item.path} 
                      className={cn("block px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-wider", location.pathname === item.path ? "bg-gray-50 text-red-600" : "text-gray-600")}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Lang Selector */}
                <motion.div variants={mobileItemVars} className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between px-4">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Language</span>
                   <div className="flex gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200/50">
                      {['id', 'en'].map((lng) => (
                        <button
                          key={lng}
                          onClick={() => changeLanguage(lng)}
                          className={cn("px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all shadow-sm", i18n.language.startsWith(lng) ? "bg-white text-gray-950" : "text-gray-400 bg-transparent")}
                        >
                          {lng}
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
