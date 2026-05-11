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

  const currentShowcaseMaterial = MATERIALS[activeMaterialIndex];

  const nextMaterial = () => setActiveMaterialIndex((prev) => (prev + 1) % MATERIALS.length);
  const prevMaterial = () => setActiveMaterialIndex((prev) => (prev - 1 + MATERIALS.length) % MATERIALS.length);

  return (
    <div className="pt-20 min-h-screen bg-[#FAFAFA]">
      {/* High-End Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: smoothEase }}
          className="absolute inset-0"
        >
          <img 
            src="/background.png" 
            alt="Hero" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#FAFAFA]" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            <Badge className="bg-red-600 text-white border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Full Collection
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
              {t('productsPage.heroTitle1')}<span className="text-red-500">{t('productsPage.heroTitle2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
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

          {/* Products Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: smoothEase }}
                >
                  <Card 
                    onClick={() => setSelectedProduct(product)}
                    className="group border-none shadow-none bg-transparent cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {product.badge && (
                        <Badge className="absolute top-5 left-5 bg-red-600 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                          {product.badge}
                        </Badge>
                      )}
                      
                      <div className="absolute bottom-5 left-5 right-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <Button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold hover:bg-white hover:text-black">
                            Quick View
                         </Button>
                      </div>
                    </div>
                    
                    <CardContent className="pt-6 px-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-red-500" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                      </h3>
                      <p className="text-gray-500 text-sm font-bold">{product.price}</p>
                    </CardContent>
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

      {/* Modern Material Showcase Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Text Side */}
            <div className="lg:w-1/2 space-y-8 order-2 lg:order-1">
              <div>
                <Badge variant="outline" className="border-red-200 text-red-600 mb-4 px-4 py-1">Material Library</Badge>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                  {t('productsPage.materialCatalog.title')}
                </h2>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentShowcaseMaterial.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: smoothEase }}
                  className="space-y-8"
                >
                  <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                    {t('productsPage.materialCatalog.subtitle')}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Grammage</p>
                      <p className="text-xl font-bold text-gray-900">{currentShowcaseMaterial.specifications.grammage}</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Composition</p>
                      <p className="text-xl font-bold text-gray-900">{currentShowcaseMaterial.specifications.composition}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={prevMaterial} className="p-4 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="text-sm font-bold text-gray-400">
                      {activeMaterialIndex + 1} / {MATERIALS.length}
                    </span>
                    <button onClick={nextMaterial} className="p-4 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-100/50 rounded-[3.5rem] rotate-3 -z-10" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentShowcaseMaterial.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.7, ease: smoothEase }}
                    className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white"
                  >
                    <img 
                      src={currentShowcaseMaterial.image} 
                      alt={currentShowcaseMaterial.name} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
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
                      {t(`products.items.${selectedProduct.id}.desc`, { defaultValue: product.description })}
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
