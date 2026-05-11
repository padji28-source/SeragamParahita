import { useState, useRef } from "react";
import { PRODUCTS, MATERIALS } from "@/src/constants";
import { Product } from "@/src/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import { 
  Info, ExternalLink, CheckCircle2, Ruler, X, 
  MessageCircle, Send, User, Building, Package, MessageSquare,
  ChevronRight, ChevronLeft, ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SALES_CONTACTS = [
  { name: "Sales 1", phone: "6285211511211" },
  { name: "Sales 2", phone: "6285211511212" }
];

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
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
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white flex flex-col md:flex-row justify-between items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-0.5">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight">
                    {t(`products.items.${selectedProduct.id}.name`, { defaultValue: selectedProduct.name })}
                  </h3>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                   <Button 
                     onClick={() => setIsQuoteModalOpen(true)}
                     size="sm"
                     className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white border-none rounded-xl font-bold"
                   >
                     Minta Penawaran
                   </Button>
                   
                   <DropdownMenu>
                      <DropdownMenuTrigger 
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl font-bold h-9 w-9 p-0 flex items-center justify-center"
                        )}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl border-gray-100 shadow-2xl">
                        {SALES_CONTACTS.map((sales, idx) => (
                          <DropdownMenuItem 
                            key={idx}
                            className="rounded-lg py-2.5 px-3 cursor-pointer focus:bg-green-50 focus:text-green-700 font-bold text-xs"
                            onClick={() => window.open(`https://wa.me/${sales.phone}?text=Halo ${sales.name}, saya tertarik dengan produk ${selectedProduct.name}`, "_blank")}
                          >
                            <MessageCircle className="w-3.5 h-3.5 mr-2 text-green-500" />
                            {sales.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                   </DropdownMenu>

                   <Button 
                     onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${selectedProduct.id}`);
                        setSelectedProduct(null);
                     }}
                     size="sm"
                     variant="outline"
                     className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl font-bold h-9 w-9 p-0"
                   >
                     <ExternalLink className="w-4 h-4" />
                   </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quote Form Modal (Duplicate of Detail Page for consistency) */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
           {selectedProduct && (
             <>
               <DialogHeader className="p-8 pb-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-red-100 rounded-xl">
                        <Package className="w-5 h-5 text-red-600" />
                     </div>
                     <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Form Penawaran</DialogTitle>
                  </div>
                  <DialogDescription className="text-gray-500 font-medium leading-relaxed">
                     Lengkapi data untuk mendapatkan penawaran <span className="text-red-600 font-bold">{selectedProduct.name}</span>.
                  </DialogDescription>
               </DialogHeader>

               <form 
                  className="p-8 space-y-6" 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('q-name');
                    const company = formData.get('q-company');
                    const quantity = formData.get('q-quantity');
                    const message = formData.get('q-message');
                    
                    const waMessage = `Halo Sales 1, saya ingin meminta penawaran untuk produk *${selectedProduct.name}*.\n\n*Deskripsi Produk:*\n${selectedProduct.description}\n\n*Detail Data:*\n- Nama: ${name}\n- Perusahaan: ${company || '-'}\n- Jumlah: ${quantity} Pcs\n- Pesan: ${message || '-'}`;
                    
                    window.open(`https://wa.me/6285211511211?text=${encodeURIComponent(waMessage)}`, "_blank");
                    setIsQuoteModalOpen(false); 
                  }}
               >
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="q-name" className="text-xs font-black uppercase tracking-widest text-gray-400">Nama Lengkap</Label>
                           <Input id="q-name" name="q-name" placeholder="John Doe" className="h-12 rounded-xl bg-gray-50 border-none px-4" required />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="q-company" className="text-xs font-black uppercase tracking-widest text-gray-400">Perusahaan</Label>
                           <Input id="q-company" name="q-company" placeholder="Nama PT/CV" className="h-12 rounded-xl bg-gray-50 border-none px-4" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="q-quantity" className="text-xs font-black uppercase tracking-widest text-gray-400">Jumlah Pesanan</Label>
                        <Input id="q-quantity" name="q-quantity" type="number" placeholder="Pcs" className="h-12 rounded-xl bg-gray-50 border-none px-4" required />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="q-message" className="text-xs font-black uppercase tracking-widest text-gray-400">Pesan</Label>
                        <textarea id="q-message" name="q-message" rows={3} className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none resize-none text-sm font-medium" placeholder="Detail pesanan..." />
                     </div>
                  </div>
                  <div className="pt-4 flex gap-3">
                     <Button type="submit" className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest shadow-xl shadow-red-600/20">
                        Kirim Sekarang
                        <Send className="w-4 h-4 ml-2" />
                     </Button>
                  </div>
               </form>
             </>
           )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
