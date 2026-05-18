import * as React from "react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS, MATERIALS } from "../constants";
import { Product } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Ruler, Info, Box, ChevronLeft, ChevronRight, Search, ArrowRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const smoothEase = [0.16, 1, 0.3, 1];

export default function ProductsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);

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

  const currentShowcaseMaterial = MATERIALS[activeMaterialIndex] || MATERIALS[0];

  const nextMaterial = () => setActiveMaterialIndex((prev) => (prev + 1) % (MATERIALS.length || 1));
  const prevMaterial = () => setActiveMaterialIndex((prev) => (prev - 1 + (MATERIALS.length || 1)) % (MATERIALS.length || 1));

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-red-200 font-sans overflow-hidden">
      
      {/* --- GLOBAL BACKGROUND AMBIENT --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-slate-100 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* High-End Hero Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden z-10">
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Products Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md mb-2">
              <Box className="w-3.5 h-3.5" />
              {t('productsPage.badge', { defaultValue: 'Full Collection' })}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              {t('productsPage.heroTitle1')} <span className="text-red-500">{t('productsPage.heroTitle2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl font-medium leading-relaxed">
              {t('productsPage.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Toolbar Section */}
      <section className="relative -mt-12 z-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
              
              {/* Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                      selectedCategory === cat 
                        ? "bg-black text-white shadow-lg" 
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder={t('productsPage.searchPlaceholder')} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-500/20 text-base"
                />
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="mt-16 flex flex-col gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: smoothEase }}
                >
                  <Card 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className={cn(
                      "group border border-gray-100 shadow-sm bg-white overflow-hidden rounded-[2.5rem] cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col items-stretch",
                      idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                    )}
                  >
                    {/* Image Area */}
                    <div className="w-full md:w-1/2 relative bg-white overflow-hidden min-h-[300px] md:min-h-0 p-8 md:p-12 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 rounded-[2.5rem]" />
                      
                      {product.badge && (
                        <Badge className="absolute top-6 left-6 md:top-8 md:left-8 bg-red-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 shadow-lg">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Content Area */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white h-full relative overflow-hidden">
                      {/* Decorative Background Element */}
                      <div className={cn(
                        "absolute w-64 h-64 bg-red-50 rounded-full blur-[80px] -z-10 transition-transform duration-700 pointer-events-none group-hover:scale-150",
                        idx % 2 === 1 ? "-right-20 top-0" : "-left-20 top-0"
                      )} />
                      
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-[2px] bg-red-600" />
                        <span className="text-sm font-black text-red-600 uppercase tracking-widest">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                        {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                      </h3>
                      
                      <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 line-clamp-4">
                        {t(`products.items.${product.id}.desc`, { defaultValue: product.description })}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-6">
                         <div className="flex bg-gray-50 rounded-full p-2 border border-gray-100 items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                         </div>
                         <span className="font-bold text-gray-400 group-hover:text-gray-900 transition-colors uppercase tracking-widest text-xs">
                           Detail Produk
                         </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-medium">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Dialog - Refresh Version */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[95vw] md:max-w-4xl p-0 overflow-hidden rounded-[2.5rem] border-none bg-white">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              {/* Left: Image */}
              <div className="md:w-1/2 bg-gray-100 relative group">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 left-6 p-2 bg-white/90 backdrop-blur rounded-full md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Right: Info */}
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Badge className="bg-red-50 text-red-600 border-none">{selectedProduct.category}</Badge>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 leading-tight">
                      {t(`products.items.${selectedProduct.id}.name`, { defaultValue: selectedProduct.name })}
                    </h2>
                    <p className="text-2xl font-bold text-red-600">{selectedProduct.price}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Description</h4>
                    <p className="text-gray-500 leading-relaxed">
                      {t(`products.items.${selectedProduct.id}.desc`, { defaultValue: selectedProduct.description })}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <Box className="w-5 h-5 text-red-500 mb-2" />
                      <p className="text-[10px] font-black text-gray-400 uppercase">Min Order</p>
                      <p className="font-bold text-gray-900">50 Pcs</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <Ruler className="w-5 h-5 text-red-500 mb-2" />
                      <p className="text-[10px] font-black text-gray-400 uppercase">Size Options</p>
                      <p className="font-bold text-gray-900">S, M, L, XL</p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <Button 
                      onClick={() => {
                        navigate(`/product/${selectedProduct.id}`);
                        setSelectedProduct(null);
                      }}
                      className="w-full h-14 bg-black hover:bg-gray-800 text-white rounded-2xl font-bold text-base transition-all shadow-xl shadow-black/10"
                    >
                      View Full Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate("/#quote")}
                      className="w-full h-14 rounded-2xl border-gray-200 font-bold"
                    >
                      Inquiry via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
