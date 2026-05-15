import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown, ChevronRight, Sparkles, LayoutGrid } from "lucide-react";
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

// Easing premium (Fast deceleration)
const smoothEase = [0.16, 1, 0.3, 1];

const mobileMenuVars = {
  initial: { opacity: 0, y: -10, scale: 0.99, transformOrigin: "top" },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      ease: smoothEase,
      staggerChildren: 0.04,
      delayChildren: 0.02
    } 
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    scale: 0.99, 
    transition: { duration: 0.25, ease: "easeInOut" } 
  }
};

const mobileLinkVars = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: smoothEase } },
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

  // Smart Header Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
    
    const scrollDelta = latest - lastYPos;
    
    if (latest > 120 && scrollDelta > 12 && !isOpen) {
      setIsHidden(true); // Scroll down: Hide safely
    } else if (scrollDelta < -12) {
      setIsHidden(false); // Scroll up: Reveal elegantly
    }
    setLastYPos(latest);
  });

  // Auto close on route alterations
  useEffect(() => {
    setIsOpen(false);
    setIsProductsOpen(false);
  }, [location.pathname]);

  const currentLanguage = i18n.language.startsWith('id') ? 'ID' : 'EN';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <motion.header 
      initial={{ y: "-100%" }}
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: smoothEase }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 will-change-transform",
        isScrolled 
          ? "border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] h-16 md:h-20" 
          : "bg-white border-b border-transparent h-20 md:h-24"
      )}
    >
      <div className="container mx-auto max-w-7xl h-full flex items-center justify-between px-6 lg:px-8">
        
        {/* LOGO AREA */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 transition-transform duration-300 active:scale-98">
            <img 
              src="/Logo.png" 
              alt="Logo" 
              className={cn(
                "w-auto object-contain transition-all duration-500",
                isScrolled ? "h-10 md:h-12" : "h-12 md:h-15"
              )}
            />
          </Link>
        </div>

        {/* DESKTOP CENTRAL NAVIGATION */}
        <nav className="hidden lg:flex items-center bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/40 relative">
          
          {/* Menu: Home */}
          <Link to="/" className={cn(
            "px-5 py-2 text-sm font-bold tracking-tight rounded-xl transition-all relative z-10",
            location.pathname === "/" ? "text-red-600" : "text-slate-600 hover:text-slate-900"
          )}>
            {location.pathname === "/" && (
              <motion.span layoutId="activeNavBackground" className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-xl z-[-1]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            {t('nav.home')}
          </Link>
          
          {/* Menu: Products Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDesktopProductsOpen(true)}
            onMouseLeave={() => setIsDesktopProductsOpen(false)}
          >
            <Link 
              to="/product" 
              className={cn(
                "px-5 py-2 text-sm font-bold tracking-tight rounded-xl transition-all flex items-center gap-1 relative z-10 outline-none",
                location.pathname.startsWith("/product") ? "text-red-600" : "text-slate-600 hover:text-slate-900"
              )} 
              onClick={(e) => { if (window.innerWidth >= 1024) e.preventDefault(); }}
            >
              {location.pathname.startsWith("/product") && (
                <motion.span layoutId="activeNavBackground" className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-xl z-[-1]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span>{t('nav.products')}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 opacity-60 transition-transform duration-300", isDesktopProductsOpen ? "rotate-180" : "")} />
            </Link>
            
            <AnimatePresence>
              {isDesktopProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] w-64 p-2 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] bg-white border border-slate-200/80 z-50 overflow-hidden"
                >
                  <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                  <div className="px-3 py-1.5 mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-50">
                    <LayoutGrid className="w-3 h-3 text-red-500" />
                    Portfolio Produk
                  </div>
                  {PRODUCTS.map((product) => (
                    <Link 
                      key={product.id}
                      to={`/product/${product.id}`}
                      className={cn(
                        "w-full px-3 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all flex items-center justify-between group/item",
                        location.pathname === `/product/${product.id}` 
                          ? "bg-red-50 text-red-600" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                      onClick={() => setIsDesktopProductsOpen(false)}
                    >
                      <span className="truncate">{t(`products.items.${product.id}.name`, { defaultValue: product.name })}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0 text-red-500" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu: Partner */}
          <Link to="/partner" className={cn(
            "px-5 py-2 text-sm font-bold tracking-tight rounded-xl transition-all relative z-10",
            location.pathname === "/partner" ? "text-red-600" : "text-slate-600 hover:text-slate-900"
          )}>
            {location.pathname === "/partner" && (
              <motion.span layoutId="activeNavBackground" className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-xl z-[-1]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            {t('nav.partner')}
          </Link>

          {/* Menu: Contact */}
          <Link to="/contact" className={cn(
            "px-5 py-2 text-sm font-bold tracking-tight rounded-xl transition-all relative z-10",
            location.pathname === "/contact" ? "text-red-600" : "text-slate-600 hover:text-slate-900"
          )}>
            {location.pathname === "/contact" && (
              <motion.span layoutId="activeNavBackground" className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-xl z-[-1]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            {t('nav.contact')}
          </Link>
        </nav>

        {/* RIGHT METRICS: Language Selector & Mobile Action */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden sm:flex items-center gap-2 font-bold text-xs tracking-wider h-10 px-4 rounded-xl bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-all group shadow-sm focus:ring-0"
              )}
            >
              <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <span>{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 opacity-40 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-2xl p-1.5 bg-white shadow-xl border-slate-200/80 mt-1 relative z-[110]">
              <DropdownMenuItem onClick={() => changeLanguage('id')} className={cn("rounded-xl cursor-pointer py-2.5 font-semibold text-xs transition-colors", i18n.language.startsWith('id') ? "text-red-600 bg-red-50 font-bold" : "text-slate-600 focus:bg-slate-50")}>
                Bahasa Indonesia
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("rounded-xl cursor-pointer py-2.5 font-semibold text-xs transition-colors", i18n.language.startsWith('en') ? "text-red-600 bg-red-50 font-bold" : "text-slate-600 focus:bg-slate-50")}>
                English (US)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Hamburg Trigger button */}
          <button 
            className={cn(
              "p-2.5 rounded-xl border lg:hidden transition-all duration-300 active:scale-95 shadow-sm",
              isOpen ? "bg-red-50 border-red-100 text-red-600" : "bg-white border-slate-200 text-slate-700"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-5 flex items-center justify-center"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* MOBILE FLOATING DRAWER CONTAINER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Mesh */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[4rem] md:top-[5rem] bg-slate-900/10 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Control Panel Card */}
            <motion.div 
              variants={mobileMenuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full right-0 w-full sm:w-[380px] sm:right-6 sm:mt-3 bg-white border-t sm:border border-slate-200 sm:rounded-[2rem] shadow-[0_25px_60px_rgba(15,23,42,0.12)] z-50 lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col p-5 space-y-1">
                
                <motion.div variants={mobileLinkVars}>
                  <Link to="/" className={cn("block px-4 py-3 rounded-xl text-sm font-bold tracking-tight transition-colors", location.pathname === "/" ? "bg-red-50 text-red-600" : "text-slate-600 hover:bg-slate-50")}>
                    {t('nav.home')}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileLinkVars} className="space-y-1">
                  <button 
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={cn("px-4 py-3 rounded-xl text-sm font-bold tracking-tight flex items-center justify-between w-full transition-colors", isProductsOpen ? "bg-slate-50 text-slate-900" : "text-slate-600 hover:bg-slate-50")}
                  >
                    <span>{t('nav.products')}</span>
                    <ChevronRight className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", isProductsOpen ? "rotate-90 text-slate-900" : "")} />
                  </button>
                  
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden bg-slate-50/70 rounded-xl mx-2"
                      >
                        <div className="py-1.5 space-y-0.5">
                          {PRODUCTS.map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              className={cn("block px-6 py-2.5 text-xs font-semibold tracking-tight transition-colors", location.pathname === `/product/${product.id}` ? "text-red-600 font-bold" : "text-slate-500 hover:text-slate-800")}
                            >
                              {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {['partner', 'contact'].map((item) => (
                  <motion.div key={item} variants={mobileLinkVars}>
                    <Link 
                      to={`/${item}`} 
                      className={cn("block px-4 py-3 rounded-xl text-sm font-bold tracking-tight transition-colors", location.pathname === `/${item}` ? "bg-red-50 text-red-600" : "text-slate-600 hover:bg-slate-50")}
                    >
                      {t(`nav.${item}`)}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Language Switcher Section */}
                <motion.div variants={mobileLinkVars} className="pt-5 mt-3 border-t border-slate-100 flex items-center justify-between px-4">
                   <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1">
                     <Sparkles className="w-3 h-3 text-red-500" />
                     Localization
                   </span>
                   <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/40">
                      {['id', 'en'].map((lng) => (
                        <button
                          key={lng}
                          onClick={() => changeLanguage(lng)}
                          className={cn("px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider", i18n.language.startsWith(lng) ? "bg-white text-red-600 shadow-sm" : "text-slate-500")}
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
