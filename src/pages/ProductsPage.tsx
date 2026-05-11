import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS, MATERIALS } from "../constants";
import { Product } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Ruler, Info, Box, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProductsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const selectedMaterial = selectedProduct?.materialId 
    ? MATERIALS.find(m => m.id === selectedProduct.materialId)
    : null;

  const currentShowcaseMaterial = MATERIALS[activeMaterialIndex];

  const nextMaterial = () => {
    setActiveMaterialIndex((prev) => (prev + 1) % MATERIALS.length);
  };

  const prevMaterial = () => {
    setActiveMaterialIndex((prev) => (prev - 1 + MATERIALS.length) % MATERIALS.length);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/background.png" 
            alt="Products Background" 
            className="w-full h-full object-cover blur-sm scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-xl"
          >
            {t('productsPage.heroTitle1')}<span className="text-red-600">{t('productsPage.heroTitle2')}</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-medium">
            {t('productsPage.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 max-w-xl mx-auto">
            <div className="relative w-full flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder={t('productsPage.searchPlaceholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl bg-white border-gray-200 focus:ring-red-500/20 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white group h-full flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      {product.badge && (
                        <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 shadow-lg">
                          {product.badge}
                        </Badge>
                      )}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-red-600 shadow-md">
                        {product.price}
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow space-y-2">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                        {t(`products.categories.${product.category.toLowerCase().replace(" & ", "").replace(" ", "")}`, { defaultValue: product.category })}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {t(`products.items.${product.id}.desc`, { defaultValue: product.description })}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-gray-900 hover:bg-red-600 text-white font-bold transition-all"
                      >
                        {t('products.viewDetails')}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Material Showcase */}
      <section className="py-24 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {t('productsPage.materialCatalog.title')}
            </motion.h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('productsPage.materialCatalog.subtitle')}
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl">
              {/* Image Side */}
              <div className="relative group">
                <motion.div
                  key={currentShowcaseMaterial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white"
                >
                  <img 
                    src={currentShowcaseMaterial.image} 
                    alt={currentShowcaseMaterial.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevMaterial}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-900 hover:bg-red-600 hover:text-white transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextMaterial}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-900 hover:bg-red-600 hover:text-white transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Details Side */}
              <div className="space-y-8">
                <motion.div
                  key={`details-${currentShowcaseMaterial.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                    {currentShowcaseMaterial.name}
                  </h3>
                  <div className="h-1.5 w-16 bg-red-600 rounded-full mb-8" />

                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{t('productDetail.grammage')}</p>
                      <p className="text-xl font-bold text-gray-900">{currentShowcaseMaterial.specifications.grammage}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{t('productsPage.materialCatalog.composition')}</p>
                      <p className="text-xl font-bold text-gray-900">{currentShowcaseMaterial.specifications.composition}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{t('productsPage.materialCatalog.recommendedUse')}</p>
                      <p className="text-xl font-bold text-gray-900">{currentShowcaseMaterial.specifications.recommendedUse}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{t('productsPage.materialCatalog.technical')}</p>
                      <div className="flex flex-wrap gap-2">
                        {(currentShowcaseMaterial.specifications?.technicals || []).map((tech, i) => (
                          <span key={i} className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden rounded-3xl border-none bg-white">
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[90vh]">
              <div className="relative h-[300px] md:h-full bg-gray-100">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col h-full overflow-hidden">
                <div className="p-6 md:p-10 space-y-8 overflow-y-auto flex-grow">
                  <DialogHeader className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 px-3 py-1">
                          {selectedProduct.category}
                        </Badge>
                        {selectedProduct.badge && (
                          <Badge className="bg-gray-900 px-3 py-1">{selectedProduct.badge}</Badge>
                        )}
                      </div>
                    <div>
                      <DialogTitle className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        {t(`products.items.${selectedProduct.id}.name`, { defaultValue: selectedProduct.name })}
                      </DialogTitle>
                      <div className="text-2xl font-bold text-red-600 mt-2">
                        {selectedProduct.price}
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 uppercase tracking-wider text-sm">
                      <Info className="w-4 h-4 text-red-600" />
                      {t('productsPage.productModal.description')}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {t(`products.items.${selectedProduct.id}.desc`, { defaultValue: selectedProduct.description })}
                    </p>
                  </div>

                  {selectedProduct.features && (
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-gray-900 uppercase tracking-wider text-sm">
                        <CheckCircle2 className="w-4 h-4 text-red-600" />
                        {t('productsPage.productModal.mainFeatures')}
                      </h4>
                      <ul className="grid grid-cols-1 gap-3">
                        {(Array.isArray(t(`products.items.${selectedProduct.id}.features`, { returnObjects: true })) 
                          ? (t(`products.items.${selectedProduct.id}.features`, { returnObjects: true }) as string[]) 
                          : (selectedProduct.features || [])
                        ).map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                      {selectedProduct.sizes && (
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 font-bold text-gray-900 uppercase tracking-wider text-sm">
                            <Ruler className="w-4 h-4 text-red-600" />
                            {t('productsPage.productModal.availableSizes')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(selectedProduct.sizes || []).map((size) => (
                              <div key={size} className="px-4 py-2 rounded-lg border-2 border-gray-100 font-bold text-gray-700 hover:border-red-200 hover:bg-red-50 transition-colors cursor-default">
                            {size}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMaterial && (
                    <div className="space-y-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <h4 className="flex items-center gap-2 font-bold text-gray-900 uppercase tracking-wider text-sm">
                        <Box className="w-4 h-4 text-red-600" />
                        {t('productsPage.productModal.usedMaterial')}
                      </h4>
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md shrink-0">
                          <img src={selectedMaterial.image} alt={selectedMaterial.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-gray-900 text-lg">{selectedMaterial.name}</p>
                          <p className="text-sm text-gray-500">{selectedMaterial.specifications.composition}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 pt-2 border-t border-gray-200">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">{t('productDetail.grammage')}</span>
                          <span className="text-gray-800 font-bold">{selectedMaterial.specifications.grammage}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">{t('productsPage.productModal.suitableFor')}</span>
                          <span className="text-gray-800 font-bold">{selectedMaterial.specifications.recommendedUse}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 bg-white border-t">
                  <Button 
                    onClick={() => {
                      setSelectedProduct(null);
                      navigate("/#quote");
                    }}
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t('productsPage.productModal.orderThisProduct')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
