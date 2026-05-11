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
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-none rounded-3xl shadow-2xl bg-transparent">
          {selectedProduct && (
            <div className="relative group">
              <Carousel className="w-full">
                <CarouselContent>
                  {(selectedProduct.images && selectedProduct.images.length > 0 
                    ? selectedProduct.images 
                    : [selectedProduct.image]
                  ).map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="flex items-center justify-center bg-gray-900/10 backdrop-blur-sm rounded-3xl overflow-hidden aspect-[4/5]">
                        <img 
                          src={img} 
                          alt={`${selectedProduct.name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {(selectedProduct.images && selectedProduct.images.length > 1) && (
                  <>
                    <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40 h-10 w-10" />
                    <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40 h-10 w-10" />
                  </>
                )}
              </Carousel>
              
              {/* Close Button Hint */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Product Info Overlay (Thin) */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 text-white flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-0.5">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight">
                    {t(`products.items.${selectedProduct.id}.name`, { defaultValue: selectedProduct.name })}
                  </h3>
                </div>
                <Button 
                   onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${selectedProduct.id}`);
                      setSelectedProduct(null);
                   }}
                   size="sm"
                   className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Info
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
