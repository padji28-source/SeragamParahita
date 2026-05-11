import { useState, useRef } from "react";
import { PRODUCTS, MATERIALS } from "@/src/constants";
import { Product } from "@/src/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import { Info, ExternalLink, CheckCircle2, Ruler, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const autoPlayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const { t } = useTranslation();
  const navigate = useNavigate();

  const selectedMaterial = selectedProduct?.materialId 
    ? MATERIALS.find(m => m.id === selectedProduct.materialId) 
    : null;

  return (
    <section id="products" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t('products.title')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-8">{t('products.subtitle')}</p>
        </div>

        <div className="relative px-0 sm:px-12">
          <Carousel 
            plugins={[autoPlayPlugin.current]}
            opts={{ align: "start", loop: true }}
            className="w-full"
            onMouseEnter={() => autoPlayPlugin.current.stop()}
            onMouseLeave={() => autoPlayPlugin.current.play()}
          >
            <CarouselContent className="-ml-4">
              <AnimatePresence mode="popLayout">
                {PRODUCTS.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/4">
                    <motion.div
                      layout
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="h-full"
                    >
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-full h-full text-left outline-none group"
                      >
                        <Card className="overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-500 bg-white h-full flex flex-col rounded-3xl cursor-pointer">
                          <CardContent className="p-0 relative aspect-[4/5] shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            {product.badge && (
                              <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-md shadow-red-500/20 border-none rounded-full">
                                {product.badge}
                              </Badge>
                            )}
                            <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                               <div className="bg-white/95 backdrop-blur-md p-2 rounded-full text-red-600 shadow-xl border border-white/20">
                                  <Info className="w-5 h-5" />
                               </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-6 flex flex-col items-start gap-1 grow bg-gradient-to-b from-white to-gray-50/50">
                            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-md">
                              {product.category}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                              {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                            </h3>
                          </CardFooter>
                        </Card>
                      </button>
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-none bg-white shadow-md hover:bg-gray-50 h-12 w-12" />
            <CarouselNext className="hidden md:flex -right-12 border-none bg-white shadow-md hover:bg-gray-50 h-12 w-12" />
          </Carousel>
        </div>
      </div>

      {/* Quick View Modal - Photo Only */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] bg-transparent sm:bg-white/5 sm:backdrop-blur-3xl transition-all duration-500">
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-full"
            >
              <Carousel className="w-full">
                <CarouselContent>
                  {(selectedProduct.images && selectedProduct.images.length > 0 
                    ? selectedProduct.images 
                    : [selectedProduct.image]
                  ).map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="flex items-center justify-center bg-gray-950/20 backdrop-blur-2xl rounded-3xl overflow-hidden aspect-[4/5] md:aspect-video select-none">
                        <img 
                          src={img} 
                          alt={`${selectedProduct.name} - ${index + 1}`}
                          className="w-full h-full object-contain md:object-cover transition-all duration-700 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {(selectedProduct.images && selectedProduct.images.length > 1) && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <CarouselPrevious className="relative left-0 pointer-events-auto h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90" />
                    <CarouselNext className="relative right-0 pointer-events-auto h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90" />
                  </div>
                )}
              </Carousel>
              
              {/* Top Bar with Badge & Close */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-50 pointer-events-none">
                <Badge className="bg-red-600/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-4 py-2 shadow-2xl shadow-red-600/20 rounded-xl border border-red-500/30">
                  {selectedProduct.badge || "Premium Collection"}
                </Badge>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="pointer-events-auto p-3 bg-white/10 hover:bg-red-600/20 backdrop-blur-xl rounded-2xl text-white border border-white/20 transition-all duration-300 hover:scale-110 active:scale-90 shadow-2xl hover:border-red-500/30 group/close"
                >
                  <X className="w-5 h-5 transition-transform group-hover/close:rotate-90" />
                </button>
              </div>
              
              {/* Bottom Info Bar - Glassmorphism */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-gray-950/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 text-white flex flex-col md:flex-row gap-4 justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-1">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight leading-none">
                    {t(`products.items.${selectedProduct.id}.name`, { defaultValue: selectedProduct.name })}
                  </h3>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                   <Button 
                     onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${selectedProduct.id}`);
                        setSelectedProduct(null);
                     }}
                     className="flex-1 md:flex-none h-12 px-8 bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-red-600/20 group/btn transition-all duration-300 active:scale-95"
                   >
                     Detail Lengkap
                     <ExternalLink className="w-3.5 h-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                   </Button>
                </div>
              </div>

              {/* Mobile Swipe Indicator (Visible only on mobile if multiple images) */}
              {(selectedProduct.images && selectedProduct.images.length > 1) && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
                  {selectedProduct.images.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
