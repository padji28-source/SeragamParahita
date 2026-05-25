import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../constants";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Factory, ShieldCheck, ArrowRight, Layers, 
  MessageCircle, ChevronRight, ChevronLeft, Send, 
  User, Building, Package, MessageSquare, Sparkles, Shirt, FileText
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Dynamic corporate models & variations mappings reflecting actual client outputs from user's images
const PRODUCT_VARIATIONS: Record<string, {
  mainModel: string;
  englishTitle: string;
  descEn: string;
  leftCornerModel: { img: string; brand: string; color: string };
  variations: { img: string; name: string; brand: string; bgClass: string; textColor: string }[];
}> = {
  '1': {
    mainModel: '/alfa1.png',
    englishTitle: 'FRANCHISE UNIFORM',
    descEn: 'Our flagship uniform products, mostly shirts & polo shirts. For your franchise uniform needs.',
    leftCornerModel: {
      img: '/alfa2.png',
      brand: 'Alfamart',
      color: 'bg-red-800'
    },
    variations: [
      {
        img: '/alfa1.png',
        name: 'Alfamart Store Crew (Male)',
        brand: 'Alfamart',
        bgClass: 'bg-red-950',
        textColor: 'text-red-400'
      },
      {
        img: '/alfa2.png',
        name: 'Alfamart Field Polo Shift',
        brand: 'Alfamart',
        bgClass: 'bg-red-900',
        textColor: 'text-rose-400'
      },
      {
        img: '/alfa3.jpg',
        name: 'Alfamart Store Crew (Female)',
        brand: 'Alfamart Premium',
        bgClass: 'bg-rose-950',
        textColor: 'text-rose-450'
      }
    ]
  },
  '2': {
    mainModel: '/shell1.png',
    englishTitle: 'AUTOMOTIVE UNIFORM',
    descEn: 'We are ready to help you create Automotive uniforms demanding durability and comfort.',
    leftCornerModel: {
      img: '/shell2.jpg',
      brand: 'Shell',
      color: 'bg-amber-900'
    },
    variations: [
      {
        img: '/shell1.png',
        name: 'Shell Fuel Team Polo',
        brand: 'Shell',
        bgClass: 'bg-amber-950',
        textColor: 'text-yellow-400'
      },
      {
        img: '/shell2.jpg',
        name: 'Shell Service Red Uniform',
        brand: 'Shell Red',
        bgClass: 'bg-red-950',
        textColor: 'text-red-400'
      },
      {
        img: '/shell.jpg',
        name: 'Shell Premium Racing Sporty',
        brand: 'Shell Elite',
        bgClass: 'bg-yellow-900',
        textColor: 'text-amber-300'
      }
    ]
  },
  '3': {
    mainModel: '/pertamina1.jpg',
    englishTitle: 'MINING UNIFORM',
    descEn: 'Field uniforms for oil, construction, and public works companies developed to look attractive and functional.',
    leftCornerModel: {
      img: '/pertamina2.jpg',
      brand: 'Pertamina',
      color: 'bg-blue-900'
    },
    variations: [
      {
        img: '/pertamina2.jpg',
        name: 'Pertamina Field Crew Oil Eng',
        brand: 'Pertamina',
        bgClass: 'bg-sky-950',
        textColor: 'text-sky-450'
      },
      {
        img: '/pertamina1.jpg',
        name: 'Pertamina Operator Crew Shirt',
        brand: 'Pertamina Gas',
        bgClass: 'bg-blue-950',
        textColor: 'text-blue-400'
      },
      {
        img: '/pertamina3.png',
        name: 'Pertamina Custom Safety Jkt',
        brand: 'Pertamina Safety',
        bgClass: 'bg-red-950',
        textColor: 'text-red-400'
      }
    ]
  },
  '4': {
    mainModel: '/waskita0.png',
    englishTitle: 'CONSTRUCTION UNIFORM',
    descEn: 'We are experienced in creating uniforms for Construction & Project with guaranteed quality.',
    leftCornerModel: {
      img: '/waskita1.jpg',
      brand: 'Waskita',
      color: 'bg-amber-900'
    },
    variations: [
      {
        img: '/waskita0.png',
        name: 'Waskita Custom Safety',
        brand: 'Waskita Karya',
        bgClass: 'bg-yellow-950',
        textColor: 'text-yellow-500'
      },
      {
        img: '/waskita1.jpg',
        name: 'Waskita Project Crew Polo',
        brand: 'Waskita',
        bgClass: 'bg-amber-950',
        textColor: 'text-yellow-400'
      },
      {
        img: '/waskita2.jpg',
        name: 'Waskita Supervisor Shirt',
        brand: 'Waskita Corporate',
        bgClass: 'bg-slate-900',
        textColor: 'text-amber-500'
      }
    ]
  },
  '5': {
    mainModel: '/langham3.jpg',
    englishTitle: 'F&B UNIFORM',
    descEn: 'We are ready to help with F&B uniforms like Aprons, Chef Coats & Hats for your company.',
    leftCornerModel: {
      img: '/langham1.png',
      brand: 'The Langham',
      color: 'bg-stone-900'
    },
    variations: [
      {
        img: '/langham1.png',
        name: 'Langham Premium Chef Coat',
        brand: 'The Langham',
        bgClass: 'bg-stone-800',
        textColor: 'text-stone-300'
      },
      {
        img: '/langham2.png',
        name: 'Langham Premium Bistro Apron',
        brand: 'The Langham',
        bgClass: 'bg-stone-950',
        textColor: 'text-stone-200'
      },
      {
        img: '/langham3.jpg',
        name: 'Langham Waiter Service Suit',
        brand: 'The Langham Hotel',
        bgClass: 'bg-stone-900',
        textColor: 'text-stone-400'
      }
    ]
  },
  '6': {
    mainModel: '/dandan.jpg',
    englishTitle: 'EVENT UNIFORM',
    descEn: 'Need uniforms for Gathering & Promotion demanding fast & quality production? Parahita can help.',
    leftCornerModel: {
      img: '/dandan1.jpg',
      brand: 'Dan+Dan',
      color: 'bg-purple-900'
    },
    variations: [
      {
        img: '/dandan1.jpg',
        name: 'Dan+Dan Store Apron Spec',
        brand: 'Dan+Dan',
        bgClass: 'bg-purple-950',
        textColor: 'text-purple-400'
      },
      {
        img: '/dandan2.jpg',
        name: 'Dan+Dan Polo Team Edition',
        brand: 'Dan+Dan Service',
        bgClass: 'bg-fuchsia-950',
        textColor: 'text-pink-400'
      },
      {
        img: '/dandan.jpg',
        name: 'Dan+Dan Promotion Shirt',
        brand: 'Dan+Dan Event',
        bgClass: 'bg-purple-900',
        textColor: 'text-purple-300'
      }
    ]
  },
  '7': {
    mainModel: '/transmart.jpg',
    englishTitle: 'OFFICE UNIFORM',
    descEn: 'Formal, Exclusive, & Comfortable office uniforms. We are experienced in making them.',
    leftCornerModel: {
      img: '/transmart1.jpg',
      brand: 'Transmart',
      color: 'bg-rose-800'
    },
    variations: [
      {
        img: '/transmart1.jpg',
        name: 'Transmart Service Uniform',
        brand: 'Transmart',
        bgClass: 'bg-rose-950',
        textColor: 'text-rose-455'
      },
      {
        img: '/transmart2.jpg',
        name: 'Transmart Executive Staff Fit',
        brand: 'Transmart corporate',
        bgClass: 'bg-red-950',
        textColor: 'text-red-400'
      },
      {
        img: '/transmart.jpg',
        name: 'Transmart Area Manager Blazer',
        brand: 'Transmart HQ',
        bgClass: 'bg-rose-900',
        textColor: 'text-rose-350'
      }
    ]
  },
  '8': {
    mainModel: '/bd.png',
    englishTitle: 'MERCHANDISE & ACCESSORIES',
    descEn: 'Accessories like Hats and Goodie bags are among the many products we can produce.',
    leftCornerModel: {
      img: '/tb.jpg',
      brand: 'Active Promo',
      color: 'bg-neutral-900'
    },
    variations: [
      {
        img: '/bd.png',
        name: 'Bukit Darmo Cap Premium',
        brand: 'Bukit Darmo',
        bgClass: 'bg-emerald-950',
        textColor: 'text-emerald-400'
      },
      {
        img: '/tb.jpg',
        name: 'Premium Canvas Promo Tote',
        brand: 'Parahita Promo',
        bgClass: 'bg-zinc-900',
        textColor: 'text-zinc-400'
      },
      {
        img: '/bg2.png',
        name: 'Canvas Shopping Eco-Bag',
        brand: 'Parahita Eco',
        bgClass: 'bg-teal-950',
        textColor: 'text-teal-400'
      }
    ]
  }
};

const SALES_CONTACTS = [
  { name: "Sales 1", phone: "6282125478346" }
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isId = i18n.language?.startsWith('id');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const product = id ? PRODUCTS.find(p => p.id === id) : undefined;

  if (!product) return <NotFound t={t} />;
  
  const translatedName = t(`products.items.${product.id}.name`, { defaultValue: product.name });
  const translatedDesc = t(`products.items.${product.id}.desc`, { defaultValue: product.description });

  const designVars = PRODUCT_VARIATIONS[product.id] || PRODUCT_VARIATIONS['1'];
  const variations = designVars.variations || [];

  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    if (product && variations.length > 0) {
      const index = variations.findIndex(v => v.img.toLowerCase() === product.image.toLowerCase());
      if (index !== -1) {
        setCurrentSliderIndex(index);
      } else {
        const index2 = variations.findIndex(v => 
          v.name.toLowerCase().includes(product.name.toLowerCase()) ||
          product.name.toLowerCase().includes(v.name.toLowerCase())
        );
        if (index2 !== -1) {
          setCurrentSliderIndex(index2);
        } else {
          setCurrentSliderIndex(0);
        }
      }
    } else {
      setCurrentSliderIndex(0);
    }
    setDirection(0);
  }, [id, product, variations]);

  const activeIndex = Math.min(Math.max(0, currentSliderIndex), Math.max(0, variations.length - 1));

  const nextSlide = () => {
    if (variations.length === 0) return;
    setDirection(1);
    setCurrentSliderIndex((prev) => (prev + 1) % variations.length);
  };

  const prevSlide = () => {
    if (variations.length === 0) return;
    setDirection(-1);
    setCurrentSliderIndex((prev) => (prev - 1 + variations.length) % variations.length);
  };

  return (
    <div className="pt-24 pb-16 bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-red-500 selection:text-white font-sans relative overflow-hidden">
      
      {/* Dynamic Background Gradients and Dots mapping design concepts */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-400/5 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- EXTRA BREADCRUMBS ROW --- */}
      <nav className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10 py-4 flex flex-wrap items-center justify-between gap-4 mb-4 lg:mb-8">
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-xs font-black text-slate-400 tracking-widest uppercase">
          <Link to="/" className="hover:text-red-600 transition-colors">{t('nav.home', { defaultValue: 'Beranda' })}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/products" className="hover:text-red-600 transition-colors">{t('nav.products', { defaultValue: 'Produk' })}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 font-bold">{translatedName}</span>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/products" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-red-600 transition-colors group bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200/60 hover:border-red-200">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('productDetail.backToProducts', { defaultValue: isId ? 'Kembali ke Produk' : 'Back to Products' })}
          </Link>
        </motion.div>
      </nav>

      {/* --- MASTER CATALOG EDITORIAL WRAPPER --- */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl relative z-10">
        
        {/* PHYSICAL CATALOG COLLAPSIBLE BINDER CONTAINER */}
        <div className="bg-white border border-slate-200/80 shadow-2xl rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative">
          
          {/* Middle Spine Divider Line on Desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-1/2 w-[1px] bg-slate-200 z-30 pointer-events-none transform -translate-x-1/2 shadow-inner" />
          
          {/* ================= PAGE 1: LEFT HAND COMPONENT (CLIENT VARIATIONS) ================= */}
          <div className="lg:col-span-6 p-8 md:p-10 lg:p-12 pb-6 flex flex-col justify-between relative bg-gradient-to-br from-slate-50 via-white to-slate-50/20 overflow-hidden">
            
            {/* Top Layout Corner Ribbon Accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-red-600/5 rotate-45 transform -translate-x-12 -translate-y-12 select-none pointer-events-none" />
            
            <div>
              {/* Column Title */}
              <div className="mb-6 text-left">
                <h4 className="text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-1">
                  CLIENT VARIATIONS
                </h4>
                <div className="w-20 h-[3px] bg-red-600 rounded-full" />
              </div>

              {/* 1 Large Transparent Cutout & Elegant Manual Slider Controls */}
              {variations.length > 0 && (
                <div className="relative flex flex-col items-center justify-center py-2">
                  
                  {/* Slider box boundaries */}
                  <div className="w-full max-w-xl mx-auto flex items-center justify-between gap-4 relative">
                    
                    {/* Previous Button */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="absolute left-[-15px] md:left-[-35px] z-30 w-12 h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200/60 shadow-xl flex items-center justify-center text-slate-700 hover:text-red-600 transition-all duration-300 hover:scale-115 active:scale-95 shrink-0"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Image Slide Area - ENLARGED */}
                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[580px] md:min-h-[640px] lg:min-h-[700px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.96 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 300, damping: 26 }}
                          className="flex flex-col items-center w-full"
                        >
                          {/* Inner Model cut-out placement - ENLARGED */}
                          <div className="h-[500px] md:h-[560px] lg:h-[620px] w-full flex items-center justify-center relative">
                            {/* Soft glowing ambient spotlight aura */}
                            <div className="absolute inset-0 bg-radial-gradient from-red-500/5 to-transparent blur-3xl rounded-full scale-125 pointer-events-none" />
                            
                            <img
                              src={variations[activeIndex].img}
                              alt={variations[activeIndex].name}
                              className="max-h-full max-w-full object-contain object-bottom filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] select-none transition-all duration-500 hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          {/* Label information */}
                          <div className="mt-4 flex flex-col items-center text-center space-y-1.5">
                             {/* Glowing Badge label */}
                             <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center gap-2">
                               <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", variations[activeIndex].bgClass || "bg-slate-900")} />
                               <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{variations[activeIndex].brand}</span>
                             </div>
                             
                             {/* Specific variation specifications */}
                             <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase pt-1">
                               {variations[activeIndex].name}
                             </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="absolute right-[-15px] md:right-[-35px] z-30 w-12 h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200/60 shadow-xl flex items-center justify-center text-slate-700 hover:text-red-600 transition-all duration-300 hover:scale-115 active:scale-95 shrink-0"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                  </div>

                  {/* Manual Pagination dots */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {variations.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          setCurrentSliderIndex(idx);
                        }}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all duration-300",
                          idx === activeIndex
                            ? "bg-red-600 w-8 shadow-sm shadow-red-500/30"
                            : "bg-slate-200 hover:bg-slate-300"
                        )}
                      />
                    ))}
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* ================= PAGE 2: RIGHT HAND COMPONENT (PRODUCT DETAIL INFO) ================= */}
          <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative bg-gradient-to-br from-white via-slate-50/50 to-white overflow-hidden">
            
            {/* Top ribbon layout decoration line */}
            <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-red-600 to-transparent" />
            
            {/* Content Segment */}
            <div className="space-y-8 relative z-20">
              
              {/* STYLISH CATALOG HEADER FLAG */}
              <div className="flex flex-col items-start gap-1">
                <div className="relative inline-flex items-stretch">
                  {/* Angled background banner match */}
                  <div className="min-h-14 py-3 font-sans font-black text-2xl md:text-3xl lg:text-4xl text-white bg-slate-900 px-6 flex items-center shadow-lg relative rounded-l-lg z-10 leading-tight">
                    {translatedName.toUpperCase()}
                  </div>
                  {/* Angled red slice badge */}
                  <div 
                    className="w-8 bg-red-600 -ml-2 select-none z-10"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%, 0% 100%)' }}
                  />
                  {/* Subtle grey angled extension */}
                  <div 
                    className="w-12 bg-slate-800/10 -ml-6 select-none"
                    style={{ clipPath: 'polygon(100% 0%, 80% 100%, 0% 100%, 0% 0%)' }}
                  />
                </div>
                {/* Secondary Category Code Indicator */}
                <span className="text-[11px] font-black text-red-500 uppercase tracking-[0.3em] pl-1.5 mt-2 flex items-center gap-1.5">
                  <span className="w-4 h-[2px] bg-red-500" />
                  {isId ? designVars.englishTitle : product.name.toUpperCase()}
                </span>
              </div>

              {/* PRODUCT LITERATURE */}
              <div className="space-y-4 max-w-xl">
                {/* Main Localized Text */}
                <p className="text-slate-800 text-sm md:text-base leading-relaxed font-semibold">
                  {translatedDesc}
                </p>
                {/* Italicized Alternate Translation Matching Brochure Mockup */}
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed italic font-medium pt-2 border-t border-slate-100">
                  {isId ? designVars.descEn : product.description}
                </p>
              </div>

              {/* MOVED TECHNICAL SPECS BAR */}
              <div className="border-t border-slate-200/80 pt-6 mt-6 grid grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-red-200 transition-all duration-300 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                    <Factory className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div className="space-y-0.5 truncate">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{t('productDetail.capacity', { defaultValue: 'Kapasitas Produksi' })}</p>
                    <p className="font-bold text-slate-900 text-xs truncate">
                      {t('productDetail.capacityValue', { defaultValue: isId ? 'Mencapai 20,000 Pcs/Bulan' : 'Up to 20,000 Pcs/Month' })}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 transition-all duration-300 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div className="space-y-0.5 truncate">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{t('productDetail.warranty', { defaultValue: 'Layanan Garansi' })}</p>
                    <p className="font-bold text-slate-900 text-xs truncate">
                      {t('productDetail.warrantyValue', { defaultValue: isId ? 'Garansi Kualitas Presisi' : 'Precision Quality Guarantee' })}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* LOWER CO-BRANDING & MAIN MODEL IMAGE - SLIGHTLY SMALLER */}
            <div className="relative mt-6 min-h-[260px] md:min-h-[320px] flex items-center justify-center z-10">
              
              {/* Slanted framing block */}
              <div className="absolute inset-x-0 bottom-4 top-12 bg-slate-900/5 rounded-[2.5rem] transform -skew-y-3 pointer-events-none" />
              
              {/* Overlapping Bottom-Left Model (Clean Transparent Cutout Style) */}
              <div className="absolute left-4 bottom-4 w-24 h-32 md:w-28 md:h-38 z-20 group cursor-pointer transition-transform hover:scale-105 select-none pointer-events-none">
                <img 
                  src={designVars.leftCornerModel.img} 
                  alt="Spec Model" 
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)] transition-transform duration-750 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Large Hero Main Model Image at Center */}
              <div className="w-36 h-48 md:w-44 md:h-60 lg:w-48 lg:h-64 relative z-10 select-none pointer-events-none transition-transform hover:scale-105 duration-700">
                <img 
                  src={product.image || designVars.mainModel} 
                  alt={product.name} 
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.15)] relative z-10" 
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

          </div>

        </div>

        {/* --- DYNAMIC ACTION CALLS BAR --- */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-200 shadow-xl rounded-[2rem] p-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-900/5 flex items-center justify-center text-slate-700">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-sm">
                {t('productDetail.consultationTitle', { defaultValue: isId ? 'Konsultasi Desain & Penawaran Kustom' : 'Design Consultation & Custom Quote' })}
              </h5>
              <p className="text-xs text-slate-500 font-medium">
                {t('productDetail.consultationDesc', { defaultValue: isId ? 'Kirimkan request ukuran, model, dan kustomisasi logo via WhatsApp atau form penawaran.' : 'Send size, model, and logo customization requests via WhatsApp or quote form.' })}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
            <Button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="flex-1 md:flex-none h-14 rounded-full bg-slate-900 hover:bg-red-600 text-white font-black text-xs tracking-widest uppercase shadow-lg transition-all duration-300"
            >
              {t('productDetail.requestQuote', { defaultValue: isId ? 'Minta Penawaran' : 'Request Quote' })}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

      </div>

      {/* --- FORM PENAWARAN MODAL --- */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden rounded-[3rem] border border-white shadow-2xl bg-white">
           <DialogHeader className="p-10 pb-6 bg-slate-50/50 border-b border-slate-100 relative">
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-12 h-12 bg-red-100 border border-red-200 rounded-2xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-red-600" />
                 </div>
                 <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
                   {t('orderFlow.inquiry.formTitle', { defaultValue: isId ? 'Form Penawaran' : 'Quote Request' })}
                 </DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 font-medium text-sm leading-relaxed pt-1">
                 {isId ? (
                   <>Isi detail kebutuhan Anda untuk mendapatkan estimasi produksi <span className="text-red-600 font-bold">{translatedName}</span>.</>
                 ) : (
                   <>Fill in your requirements to receive a production estimate for <span className="text-red-600 font-bold">{translatedName}</span>.</>
                 )}
              </DialogDescription>
           </DialogHeader>

           <form 
              className="p-10 space-y-6" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const company = formData.get('company');
                const quantity = formData.get('quantity');
                const message = formData.get('message');
                
                // Daftar email tujuan
                const emailTo = "seragamparahita01@gmail.com,cs@seragamparahita.com,seragamparahita02@gmail.com";
                const emailSubject = isId ? `Request Penawaran Produk: ${translatedName}` : `Product Quote Request: ${translatedName}`;
                
                // Menyusun isi form agar tercopy rapi ke body email menggunakan \r\n (Enter)
                const emailBody = isId ? (
                  `Halo Tim Sales,\r\n\r\n` +
                  `Saya ingin meminta penawaran untuk produk berikut:\r\n` +
                  `Nama Produk: ${translatedName}\r\n\r\n` +
                  `Berikut adalah detail pesanan saya:\r\n` +
                  `----------------------------------------\r\n` +
                  `Nama Lengkap        : ${name}\r\n` +
                  `Perusahaan/Instansi : ${company || '-'}\r\n` +
                  `Kuantitas           : ${quantity} Pcs\r\n` +
                  `Catatan Tambahan    : ${message || '-'}\r\n` +
                  `----------------------------------------\r\n\r\n` +
                  `Mohon informasi lebih lanjut mengenai harga dan estimasi produksi.\r\n\r\n` +
                  `Terima kasih.`
                ) : (
                  `Hello Sales Team,\r\n\r\n` +
                  `I would like to request a quote for the following product:\r\n` +
                  `Product Name: ${translatedName}\r\n\r\n` +
                  `Here are my order details:\r\n` +
                  `----------------------------------------\r\n` +
                  `Full Name           : ${name}\r\n` +
                  `Company/Institution : ${company || '-'}\r\n` +
                  `Quantity            : ${quantity} Pcs\r\n` +
                  `Additional Notes    : ${message || '-'}\r\n` +
                  `----------------------------------------\r\n\r\n` +
                  `Please provide further information regarding the price and production estimate.\r\n\r\n` +
                  `Thank you.`
                );
                
                // Mengarahkan user ke email bawaan dengan data yang sudah tercopy
                window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                
                setIsQuoteModalOpen(false); 
              }}
           >
              <div className="space-y-5">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                       <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                         {t('orderFlow.inquiry.form.name', { defaultValue: 'Nama Lengkap' })}
                       </Label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input id="name" name="name" placeholder="John Doe" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm" required />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                         {t('orderFlow.inquiry.form.company', { defaultValue: 'Perusahaan/Instansi' })}
                       </Label>
                       <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input id="company" name="company" placeholder="PT / Instansi" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      {isId ? 'Kuantitas (Pcs)' : 'Quantity (Pcs)'}
                    </Label>
                    <div className="relative">
                       <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input id="quantity" name="quantity" type="number" placeholder={isId ? "Contoh: 100" : "Example: 100"} className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm" required />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      {t('orderFlow.inquiry.form.additionalNotes', { defaultValue: 'Catatan Tambahan' })}
                    </Label>
                    <div className="relative">
                       <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                       <textarea 
                        id="message" 
                        name="message"
                        placeholder={isId ? "Detail kustomisasi..." : "Customization details..."} 
                        rows={3}
                        className="w-full pl-11 pr-4 pt-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-medium outline-none transition-all resize-none min-h-[100px]"
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                 <Button type="button" variant="ghost" onClick={() => setIsQuoteModalOpen(false)} className="sm:flex-1 h-14 rounded-full font-bold text-slate-500 hover:bg-slate-100 order-2 sm:order-1">
                   {isId ? 'Batal' : 'Cancel'}
                 </Button>
                 <Button type="submit" className="sm:flex-[2] h-14 rounded-full bg-slate-900 hover:bg-red-600 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl hover:shadow-red-500/30 order-1 sm:order-2">
                    {isId ? 'Kirim via Email' : 'Send via Email'}
                    <Send className="w-4 h-4 ml-3" />
                 </Button>
              </div>
           </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NotFound({ t }: { t: any }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-24 h-24 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl">
        <Layers className="w-10 h-10 text-slate-300" />
      </div>
      <h1 className="text-3xl font-black mb-3 text-slate-900 tracking-tight">{t('productDetail.notFound', { defaultValue: 'Produk Tidak Ditemukan' })}</h1>
      <p className="text-base text-slate-500 mb-8 max-w-sm text-center font-medium">Data produk yang Anda cari tidak tersedia dalam direktori saat ini.</p>
      <Link to="/products" className={cn(buttonVariants({ variant: "default" }), "h-14 rounded-full font-bold px-8 bg-slate-900 hover:bg-red-600 shadow-xl")}>
        {t('productDetail.backToHome', { defaultValue: 'Kembali ke Produk' })}
      </Link>
    </div>
  );
}
