import { useState, useRef } from "react";
import { PRODUCTS } from "@/src/constants";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";

export default function ProductCatalog() {
  const autoPlayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const { t } = useTranslation();

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
                      <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 bg-white group h-full flex flex-col rounded-3xl">
                        <CardContent className="p-0 relative aspect-[4/5] shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          {product.badge && (
                            <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-xs px-3 py-1 shadow-md shadow-red-500/20 border-none rounded-full">
                              {product.badge}
                            </Badge>
                          )}
                          {product.price && (
                            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-red-600 shadow-xl border border-white/20">
                              {product.price}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="p-6 flex flex-col items-start gap-2 grow bg-gradient-to-b from-white to-gray-50/50">
                          <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-1 rounded-md">
                            {product.category}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">{t(`products.items.${product.id}.name`, { defaultValue: product.name })}</h3>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-none bg-white shadow-md hover:bg-gray-50" />
            <CarouselNext className="hidden md:flex -right-12 border-none bg-white shadow-md hover:bg-gray-50" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
