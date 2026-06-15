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
                "flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest h-10 px-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all focus:ring-0 outline-none lg:px-4 px-2"
              )}
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-700 hidden sm:inline">{currentLanguage}</span>
              <span className="text-gray-700 sm:hidden">{currentLanguage}</span>
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
        </div>
      </div>
    </motion.header>
  );
}
