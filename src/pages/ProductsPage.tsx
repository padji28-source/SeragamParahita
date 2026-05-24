import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS, MATERIALS } from "../constants";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
// Tambahkan Shield ke dalam import lucide-react
import { Search, ArrowUpRight, Sparkles, Fingerprint, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const smoothEase = [0.16, 1, 0.3, 1];

export default function ProductsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi Scroll untuk mengecilkan Floating Island
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Daftar Kategori Unik
  const categories = useMemo(() => ["Semua", ...new Set(PRODUCTS.map(p => p.category))], []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Semua" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-red-200 font-sans overflow-hidden">
      
      {/* --- GLOBAL BACKGROUND AMBIENT --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-slate-100 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[30%] -right-40 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -left-40 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- FLOATING DYNAMIC ISLAND (NAVBAR PENCARIAN DIKEMBALIKAN) --- */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div 
          layout
          className={cn(
            "pointer-events-auto bg-white/80 backdrop-blur-3xl border border-white shadow-2xl shadow-slate-200/50 rounded-full flex flex-col md:flex-row items-center p-2 gap-2 transition-all duration-700 ease-out",
            isScrolled ? "md:w-auto scale-95" : "w-full max-w-4xl"
          )}
        >
          <LayoutGroup>
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto px-2 no-scrollbar mask-fade-edges">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap outline-none group"
                >
                  {selectedCategory === cat && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-slate-900 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={cn(
                    "relative z-10 transition-colors duration-300",
                    selectedCategory === cat ? "text-white" : "text-slate-500 group-hover:text-slate-900"
                  )}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <div className="hidden md:block w-[1px] h-8 bg-slate-200 mx-2" />

          <div className="relative w-full md:w-64 group flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-red-500" />
            <input 
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 h-11 rounded-full bg-slate-50/50 hover:bg-slate-100 border border-transparent focus:border-slate-200 focus:bg-white text-sm font-medium transition-all outline-none placeholder:text-slate-400"
            />
          </div>
        </motion.div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[450px] flex items-center overflow-hidden z-10">
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Contact Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 pt-12">
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md"
            >
              <Shield className="w-3.5 h-3.5" />
              {t('products.title', { defaultValue: 'Produk Kami' })}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2"
            >
              Catalog <span className="text-red-500">Parahita</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-xl font-medium leading-relaxed"
            >
              {t('products.subtitle', { defaultValue: 'Solusi garmen berkualitas tinggi yang disesuaikan untuk kebutuhan industri Anda.' })}
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS EDITORIAL LIST --- */}
      <section className="relative z-20 pb-32 pt-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col gap-12 md:gap-24">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: smoothEase }}
                  className={cn(
                    "group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center",
                  )}
                >
                  {/* Image Container - Clean Transparent Style (No box background/borders) */}
                  <div className={cn(
                    "md:col-span-6 lg:col-span-7 relative h-[400px] md:h-[550px] flex items-center justify-center p-6 transition-all duration-700",
                    idx % 2 === 1 ? "md:order-last" : ""
                  )}>
                    <motion.img
                      layoutId={`product-image-${product.id}`}
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-1000 ease-out group-hover:scale-105 drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center px-4 md:px-12 py-8">
                    <div className="inline-flex items-center gap-2 mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Fingerprint className="w-5 h-5 text-red-600" />
                      <span className="text-xs font-black text-red-600 uppercase tracking-[0.2em]">
                        {product.category}
                      </span>
                    </div>
                    
                    <motion.h3 
                      layoutId={`product-title-${product.id}`}
                      className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tighter"
                    >
                      {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                    </motion.h3>
                    
                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                      {t(`products.items.${product.id}.desc`, { defaultValue: product.description })}
                    </p>
                    
                    <button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="mt-auto self-start group/btn flex items-center gap-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center transition-all duration-500 group-hover/btn:bg-red-600 group-hover/btn:scale-110 group-hover/btn:shadow-xl group-hover/btn:shadow-red-500/40">
                        <ArrowUpRight className="w-7 h-7 transition-transform duration-500 group-hover/btn:rotate-45" />
                      </div>
                      <span className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] relative overflow-hidden">
                        Lihat Spesifikasi
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-32 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tight">Tidak Ditemukan</h4>
              <p className="text-slate-500 font-medium text-lg max-w-md">Produk dengan kata kunci "{searchQuery}" tidak tersedia di koleksi saat ini.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
