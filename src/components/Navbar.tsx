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
  initial: { opacity: 0, y: -8 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: snapEase } 
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    transition: { duration: 0.2, ease: "easeInOut" } 
  }
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
  const navLinkClass = (path: string) => cn(
    "text-[14px] font-semibold tracking-wide px-1 py-2 transition-colors relative duration-200",
    location.pathname === path ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
  );

  return (
    <motion.header 
      initial={{ y: "-100%" }}
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: snapEase }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "border-b border-gray-200/70 bg-white/90 backdrop-blur-md h-16 shadow-[0_2px_20px_rgba(0,0,0,0.01)]" 
          : "bg-white h-20 md:h-24"
      )}
    >
      <div className="container mx-auto max-w-7xl h-full flex items-center justify-between px-6 lg:px-8">
        
        {/* LOGO AREA */}
        <div className="flex items-center">
          <Link to="/" className="transition-opacity hover:opacity-90">
            <img 
              src="/Logo.png" 
              alt="Logo" 
              className={cn(
                "w-auto object-contain transition-all duration-300",
                isScrolled ? "h-9" : "h-12"
              )}
            />
          </Link>
        </div>

        {/* DESKTOP MINIMALIST NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home */}
          <Link to="/" className={navLinkClass("/")}>
            {t('nav.home')}
            {location.pathname === "/" && (
              <motion.div layoutId="activeLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
            )}
          </Link>
          
          {/* Products Dropdown */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsDesktopProductsOpen(true)}
            onMouseLeave={() => setIsDesktopProductsOpen(false)}
          >
            <Link 
              to="/product" 
              className={cn(
                "text-[14px] font-semibold tracking-wide px-1 transition-colors duration-200 flex items-center gap-1 outline-none",
                location.pathname.startsWith("/product") ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              )}
              onClick={(e) => { if (window.innerWidth >= 1024) e.preventDefault(); }}
            >
              <span>{t('nav.products')}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 opacity-70 transition-transform duration-200", isDesktopProductsOpen ? "rotate-180" : "")} />
            </Link>
            {location.pathname.startsWith("/product") && (
              <motion.div layoutId="activeLine" className="absolute bottom-0 left-1 right-1 h-[2px] bg-red-600 rounded-full" />
            )}
            
            <AnimatePresence>
              {isDesktopProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white border border-gray-200/80 rounded-xl shadow-xl p-1.5 z-50"
                >
                  {PRODUCTS.map((product) => (
                    <Link 
                      key={product.id}
                      to={`/product/${product.id}`}
                      className={cn(
                        "w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors block",
                        location.pathname === `/product/${product.id}` 
                          ? "bg-gray-50 text-red-600 font-semibold" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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

          {/* Partner */}
          <Link to="/partner" className={navLinkClass("/partner")}>
            {t('nav.partner')}
            {location.pathname === "/partner" && (
              <motion.div layoutId="activeLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
            )}
          </Link>

          {/* Contact */}
          <Link to="/contact" className={navLinkClass("/contact")}>
            {t('nav.contact')}
            {location.pathname === "/contact" && (
              <motion.div layoutId="activeLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
            )}
          </Link>
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden sm:flex items-center gap-1.5 font-semibold text-xs tracking-wide h-9 px-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:ring-0"
              )}
            >
              <Globe className="w-3.5 h-3.5 opacity-70" />
              <span>{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 rounded-xl p-1 bg-white shadow-lg border-gray-200/80 mt-1">
              <DropdownMenuItem onClick={() => changeLanguage('id')} className={cn("rounded-lg cursor-pointer py-2 text-xs font-medium", i18n.language.startsWith('id') ? "text-red-600 bg-red-50/50 font-semibold" : "text-gray-600")}>
                Bahasa Indonesia
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("rounded-lg cursor-pointer py-2 text-xs font-medium", i18n.language.startsWith('en') ? "text-red-600 bg-red-50/50 font-semibold" : "text-gray-600")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hamburg Button Menu */}
          <button 
            className="p-2 text-gray-600 hover:text-gray-900 lg:hidden transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col p-4 space-y-1">
                <Link to="/" className={cn("block px-4 py-2.5 rounded-lg text-sm font-semibold", location.pathname === "/" ? "bg-gray-50 text-red-600" : "text-gray-600")}>
                  {t('nav.home')}
                </Link>
                
                <div className="space-y-0.5">
                  <button 
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={cn("px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between w-full text-gray-600 hover:bg-gray-50")}
                  >
                    <span>{t('nav.products')}</span>
                    <ChevronRight className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", isProductsOpen ? "rotate-90 text-gray-900" : "")} />
                  </button>
                  
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50/50 rounded-lg pl-4"
                      >
                        <div className="py-1 space-y-0.5">
                          {PRODUCTS.map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              className={cn("block px-4 py-2 text-xs font-medium", location.pathname === `/product/${product.id}` ? "text-red-600 font-semibold" : "text-gray-500")}
                            >
                              {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {['partner', 'contact'].map((item) => (
                  <Link 
                    key={item}
                    to={`/${item}`} 
                    className={cn("block px-4 py-2.5 rounded-lg text-sm font-semibold", location.pathname === `/${item}` ? "bg-gray-50 text-red-600" : "text-gray-600")}
                  >
                    {t(`nav.${item}`)}
                  </Link>
                ))}

                {/* Mobile Lang Selector */}
                <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between px-4">
                   <span className="text-xs font-semibold text-gray-400">Language</span>
                   <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200/50">
                      {['id', 'en'].map((lng) => (
                        <button
                          key={lng}
                          onClick={() => changeLanguage(lng)}
                          className={cn("px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all", i18n.language.startsWith(lng) ? "bg-white text-gray-900 shadow-sm" : "text-gray-400")}
                        >
                          {lng}
                        </button>
                      ))}
                   </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
