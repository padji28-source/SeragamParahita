import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown, Package, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/src/constants";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

// Variabel Animasi untuk Menu Mobile (Staggered Effect)
const mobileMenuVars = {
  initial: { opacity: 0, y: -10, scaleY: 0.95, transformOrigin: "top" },
  animate: { 
    opacity: 1, 
    y: 0, 
    scaleY: 1, 
    transition: { 
      duration: 0.3, 
      ease: [0.12, 0, 0.39, 0], // Custom cubic-bezier for smooth open
      staggerChildren: 0.05,
      delayChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scaleY: 0.95, 
    transition: { duration: 0.2, ease: "easeInOut" } 
  }
};

const mobileLinkVars = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
    
    // Hide navbar when scrolling down, show when scrolling up
    if (latest > lastYPos && latest > 100 && !isOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastYPos(latest);
  });

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.partner'), path: "/partner" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.contact'), path: "/contact" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language.startsWith('id') ? 'ID' : 'EN';

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: isHidden ? "-100%" : 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        isScrolled 
          ? "border-b border-gray-100/50 bg-white/80 backdrop-blur-xl shadow-sm h-16 md:h-20" 
          : "bg-white border-b border-transparent h-20 md:h-24"
      )}
    >
      <div className="container mx-auto flex h-full items-center px-4 lg:px-8">
        
        {/* KIRI: Logo (Menggunakan flex-1 agar porsi seimbang) */}
        <div className="flex flex-1 justify-start">
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105" onClick={() => setIsOpen(false)}>
            <img 
              src="/Logo.png" 
              alt="Parahita Logo" 
              className="h-10 md:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>

        {/* TENGAH: Navigasi Desktop (Benar-benar di tengah) */}
        <div className="hidden lg:flex items-center justify-center gap-2">
          <Link
            to="/"
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-[2px]",
              location.pathname === "/" 
                ? "text-red-600 bg-red-50/80 shadow-sm" 
                : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-900"
            )}
          >
            {t('nav.home')}
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-[2px] flex items-center gap-2 outline-none",
                location.pathname.includes('/product') 
                  ? "text-red-600 bg-red-50/80 shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-900"
              )}
            >
              {t('nav.products')}
              <ChevronDown className="w-3 h-3 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48 p-2 rounded-xl shadow-xl bg-white/95 backdrop-blur-lg border-gray-100">
              {PRODUCTS.map((product) => (
                <DropdownMenuItem 
                  key={product.id} 
                  asChild
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200",
                    location.pathname === `/product/${product.id}` 
                      ? "bg-red-50 text-red-600 focus:bg-red-50 focus:text-red-600" 
                      : "hover:bg-gray-50 hover:pl-4 text-gray-700" // Efek geser kanan saat hover
                  )}
                >
                  <Link to={`/product/${product.id}`}>
                    {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-[2px]",
                location.pathname === item.path 
                  ? "text-red-600 bg-red-50/80 shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-900"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* KANAN: Tools & Mobile Toggle (Menggunakan flex-1 justify-end) */}
        <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
          
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 font-bold h-10 px-3 cursor-pointer rounded-xl bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:-translate-y-[2px]">
                <Globe className="w-4 h-4 text-gray-500" />
                <span>{currentLanguage}</span>
                <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 rounded-xl shadow-xl">
              <DropdownMenuItem 
                onClick={() => changeLanguage('id')}
                className={cn("font-bold cursor-pointer transition-colors", i18n.language.startsWith('id') && "text-red-600 bg-red-50")}
              >
                Bahasa Indonesia
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('en')}
                className={cn("font-bold cursor-pointer transition-colors", i18n.language.startsWith('en') && "text-red-600 bg-red-50")}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:hidden">
            <button 
              className={cn(
                "p-2.5 rounded-xl border transition-all duration-300 active:scale-95",
                isOpen 
                  ? "bg-red-50 border-red-200 text-red-600 shadow-inner" 
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Dropdown (Kekinian dengan Staggered Animation) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={mobileMenuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-full right-0 w-full sm:w-[400px] sm:right-4 sm:mt-2 bg-white/95 backdrop-blur-xl border border-gray-100/50 sm:rounded-3xl shadow-2xl overflow-hidden z-50 lg:hidden flex flex-col max-h-[85vh] sm:max-h-[calc(100dvh-7rem)]"
          >
            <nav className="flex flex-col p-4 pb-8 space-y-1 overflow-y-auto scrollbar-hide text-left flex-1">
              <motion.div variants={mobileLinkVars}>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]",
                    location.pathname === "/" ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {t('nav.home')}
                </Link>
              </motion.div>
              
              <motion.div variants={mobileLinkVars}>
                <button 
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between w-full active:scale-[0.98]",
                    isProductsOpen ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Package className={cn("w-4 h-4 transition-colors", isProductsOpen ? "text-red-500" : "text-gray-400")} />
                    <span>{t('nav.products')}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 text-gray-400 transition-transform duration-300", isProductsOpen ? "rotate-90" : "")} />
                </button>
                
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-l-2 border-red-200 ml-8 pl-4 mb-1 overflow-hidden"
                    >
                      <div className="flex flex-col py-1 space-y-1 w-full pt-2">
                        {PRODUCTS.map((product) => (
                          <div key={product.id} className="w-full flex shrink-0">
                            <Link
                              to={`/product/${product.id}`}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "w-full px-3 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]",
                                location.pathname === `/product/${product.id}`
                                  ? "bg-red-50 text-red-600" 
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
                              )}
                            >
                              {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={mobileLinkVars} className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent my-2 mx-4" />

              {navItems.slice(1).map((item) => (
                <motion.div key={item.name} variants={mobileLinkVars}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]",
                      location.pathname === item.path 
                        ? "bg-red-50 text-red-600" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={mobileLinkVars} className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent my-3 mx-4 sm:hidden" />

              <motion.div variants={mobileLinkVars} className="flex items-center justify-between px-4 py-3 sm:hidden">
                <span className="text-sm font-bold text-gray-500">{t('nav.language') || 'Language'}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { changeLanguage('id'); setIsOpen(false); }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95",
                      i18n.language.startsWith('id') ? "bg-red-50 text-red-600 border border-red-100 shadow-sm" : "bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100"
                    )}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => { changeLanguage('en'); setIsOpen(false); }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95",
                      i18n.language.startsWith('en') ? "bg-red-50 text-red-600 border border-red-100 shadow-sm" : "bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100"
                    )}
                  >
                    EN
                  </button>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
