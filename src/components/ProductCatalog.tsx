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
import { Info, ExternalLink, CheckCircle2, Ruler } from "lucide-react";
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

      {/* Quick View Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-3xl shadow-2xl">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              <div className="w-full md:w-2/5 relative h-64 md:h-auto">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                <Badge className="absolute top-6 left-6 bg-red-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 shadow-lg">
                  {selectedProduct.badge || "Premium"}
                </Badge>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-10 bg-white overflow-y-auto">
                <DialogHeader className="p-0 text-left mb-8">
                   <div className="flex flex-col gap-2 mb-4">
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                        {selectedProduct.category}
                      </span>
                      <DialogTitle className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                        {t(`products.items.${selectedProduct.id}.name`, { defaultValue: selectedProduct.name })}
                      </DialogTitle>
                   </div>
                   <DialogDescription className="text-gray-500 leading-relaxed text-base font-medium">
                      {t(`products.items.${selectedProduct.id}.description`, { defaultValue: selectedProduct.description })}
                   </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                   <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Key Features</h4>
                      <ul className="space-y-3">
                        {(Array.isArray(t(`products.items.${selectedProduct.id}.features`, { returnObjects: true })) 
                          ? (t(`products.items.${selectedProduct.id}.features`, { returnObjects: true }) as string[]) 
                          : (selectedProduct.features || [])
                        ).slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                             <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                             {feature}
                          </li>
                        ))}
                      </ul>
                   </div>

                   {selectedMaterial && (
                     <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Material Info</h4>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                           <p className="text-xs font-black text-gray-900 mb-1">{selectedMaterial.name}</p>
                           <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-gray-200">
                                {selectedMaterial.specifications.grammage}
                              </span>
                              <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-gray-200">
                                {selectedMaterial.specifications.composition}
                              </span>
                           </div>
                        </div>
                     </div>
                   )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                   <Button 
                     onClick={() => {
                        navigate(`/product/${selectedProduct.id}`);
                        setSelectedProduct(null);
                     }}
                     className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest h-14 rounded-2xl shadow-xl shadow-red-600/20 group"
                   >
                     Lihat Detail Selengkapnya
                     <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                   </Button>
                   <Button 
                     variant="outline"
                     onClick={() => setSelectedProduct(null)}
                     className="h-14 px-8 rounded-2xl border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                   >
                     Tutup
                   </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
