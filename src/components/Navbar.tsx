import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { PRODUCTS } from "@/src/constants";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

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
          <Link to="/" className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80" onClick={() => setIsOpen(false)}>
            <img 
              src="/Logo.png" 
              alt="Parahita Logo" 
              className="h-10 md:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>

        {/* TENGAH: Navigasi Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-2">
          <Link
            to="/"
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-out",
              location.pathname === "/" 
                ? "text-red-600 bg-red-50/80" 
                : "text-gray-600 hover:bg-gray-100/60 hover:text-gray-900"
            )}
          >
            {t('nav.home')}
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-out outline-none group",
                location.pathname.includes('/product') 
                  ? "text-red-600 bg-red-50/80" 
                  : "text-gray-600 hover:bg-gray-100/60 hover:text-gray-900"
              )}
            >
              {t('nav.products')}
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="center" 
              className="w-52 p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-xl border-gray-100/60 animate-in fade-in-0 zoom-in-95 duration-200"
            >
              {PRODUCTS.map((product) => (
                <DropdownMenuItem 
                  key={product.id} 
                  className={cn(
                    "w-full px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ease-out outline-none",
                    location.pathname === `/product/${product.id}` 
                      ? "bg-red-50 text-red-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-0.5"
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
                "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-out",
                location.pathname === item.path 
                  ? "text-red-600 bg-red-50/80" 
                  : "text-gray-600 hover:bg-gray-100/60 hover:text-gray-900"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* KANAN: Tools & Mobile Toggle */}
        <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden sm:flex items-center gap-2 font-semibold h-10 px-3 cursor-pointer rounded-xl bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 ease-out group"
              )}
            >
              <Globe className="w-4 h-4 text-gray-500 transition-colors group-hover:text-gray-700" />
              <span>{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 opacity-50 ml-1 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-36 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-xl border-gray-100/60 p-2 animate-in fade-in-0 zoom-in-95 duration-200"
            >
              <DropdownMenuItem 
                onClick={() => changeLanguage('id')}
                className={cn("font-medium rounded-xl cursor-pointer py-2.5 transition-colors", i18n.language.startsWith('id') ? "text-red-600 bg-red-50" : "text-gray-600 hover:bg-gray-50")}
              >
                Bahasa Indonesia
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('en')}
                className={cn("font-medium rounded-xl cursor-pointer py-2.5 transition-colors", i18n.language.startsWith('en') ? "text-red-600 bg-red-50" : "text-gray-600 hover:bg-gray-50")}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:hidden">
            <button 
              className={cn(
                "p-2.5 rounded-xl border transition-all duration-300 ease-out active:scale-95",
                isOpen 
                  ? "bg-red-50 border-red-100 text-red-600" 
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Optional: Subtle backdrop overlay for mobile menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 top-[4.5rem] bg-gray-900/5 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              variants={mobileMenuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full right-0 w-full sm:w-[400px] sm:right-4 sm:mt-2 bg-white/95 backdrop-blur-2xl border border-gray-100/60 sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden z-50 lg:hidden flex flex-col max-h-[85vh] sm:max-h-[calc(100dvh-7rem)]"
            >
              <nav className="flex flex-col p-4 pb-8 space-y-1 overflow-y-auto scrollbar-hide text-left flex-1 relative z-10">
                <motion.div variants={mobileLinkVars}>
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-2xl text-[15px] font-semibold transition-all duration-200 active:scale-[0.98]",
                      location.pathname === "/" ? "bg-red-50/80 text-red-600" : "text-gray-600 hover:bg-gray-50/80"
                    )}
                  >
                    {t('nav.home')}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileLinkVars}>
                  <button 
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-[15px] font-semibold transition-all duration-200 flex items-center justify-between w-full active:scale-[0.98]",
                      isProductsOpen ? "bg-gray-50/80 text-gray-900" : "text-gray-600 hover:bg-gray-50/80"
                    )}
                  >
                    <span>{t('nav.products')}</span>
                    <ChevronRight className={cn("w-4.5 h-4.5 text-gray-400 transition-transform duration-400 ease-out", isProductsOpen ? "rotate-90" : "")} />
                  </button>
                  
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: smoothEase }}
                        className="mb-2 overflow-hidden"
                      >
                        <div className="flex flex-col space-y-0.5 w-full">
                          {PRODUCTS.map((product) => (
                            <div key={product.id} className="w-full">
                              <Link
                                to={`/product/${product.id}`}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                                  location.pathname === `/product/${product.id}`
                                    ? "bg-red-50/80 text-red-600" 
                                    : "text-gray-500 hover:text-gray-900"
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
                        "block px-4 py-3 rounded-2xl text-[15px] font-semibold transition-all duration-200 active:scale-[0.98]",
                        location.pathname === item.path 
                          ? "bg-red-50/80 text-red-600" 
                          : "text-gray-600 hover:bg-gray-50/80"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={mobileLinkVars} className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent my-3 mx-4 sm:hidden" />

                <motion.div variants={mobileLinkVars} className="flex items-center justify-between px-4 py-3 sm:hidden">
                  <span className="text-[15px] font-semibold text-gray-500">{t('nav.language') || 'Language'}</span>
                  <div className="flex gap-2 p-1 bg-gray-50/80 rounded-xl border border-gray-100">
                    <button
                      onClick={() => { changeLanguage('id'); setIsOpen(false); }}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300",
                        i18n.language.startsWith('id') ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      ID
                    </button>
                    <button
                      onClick={() => { changeLanguage('en'); setIsOpen(false); }}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300",
                        i18n.language.startsWith('en') ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      EN
                    </button>
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
