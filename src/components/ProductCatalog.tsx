import { useState, useRef, useMemo, Suspense } from "react";
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
import { useTranslation } from "react-i18next";
import { 
  Info, ExternalLink, CheckCircle2, Ruler, X, 
  MessageCircle, Send, User, Building, Package, MessageSquare,
  ChevronRight, ChevronLeft, ArrowRight, Loader2
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
  { name: "Sales 1", phone: "6282125478346" }
];

// Custom Loading Spinner Component
function CustomLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 w-full min-h-[400px]">
      <div className="relative w-16 h-16 mb-4">
         <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
         <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
         <Package className="absolute inset-0 m-auto w-6 h-6 text-red-600 animate-pulse" />
      </div>
      <p className="text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">Memuat Produk...</p>
    </div>
  );
}

// Simple resource to simulate fetching and trigger Suspense
let productsCache: Product[] | null = null;
let productsPromise: Promise<Product[]> | null = null;

function useProductsResource() {
  if (productsCache !== null) {
    return productsCache;
  }
  if (!productsPromise) {
    productsPromise = new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        productsCache = PRODUCTS;
        resolve(PRODUCTS);
      }, 1500); // 1.5 second simulated fetch delay
    });
  }
  throw productsPromise;
}

// Extracted Product Grid component to be wrapped in Suspense
function ProductGrid({ 
  searchQuery, 
  selectedCategory, 
  setSelectedProduct,
  setSearchQuery,
  setSelectedCategory,
  navigate
}: { 
  searchQuery: string; 
  selectedCategory: string; 
  setSelectedProduct: (p: Product) => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string) => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const { t } = useTranslation();
  const loadedProducts = useProductsResource();

  const filteredProducts = useMemo(() => {
    return loadedProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Semua" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, loadedProducts]);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 px-4 w-full">
        <div className="bg-white rounded-[2rem] p-8 max-w-md mx-auto shadow-sm border border-gray-100">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-bold mb-2">Produk tidak ditemukan</p>
          <p className="text-gray-400 text-sm">Coba cari dengan kata kunci lain atau pilih kategori berbeda.</p>
          <Button 
            variant="ghost" 
            className="mt-6 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
            onClick={() => { setSearchQuery(""); setSelectedCategory("Semua"); }}
          >
            Reset Filter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Carousel 
      opts={{ align: "start", loop: filteredProducts.length > 4 }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
          {filteredProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/4">
              <div className="h-full">
                <button 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full h-full text-left outline-none"
                >
                  <div className="flex flex-col items-center h-full p-2 md:p-3 rounded-[1.5rem] group border border-transparent hover:bg-red-50 transition-all duration-300 cursor-pointer">
                    <div className="w-full aspect-[4/3] md:aspect-[1/1] rounded-[1.25rem] overflow-hidden mb-4 md:mb-5 relative shadow-sm group-hover:shadow-[0_10px_40px_rgba(220,38,38,0.1)] transition-all duration-500 bg-white">
                       <img
                         src={product.image}
                         alt={product.name}
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         referrerPolicy="no-referrer"
                         loading="lazy"
                         decoding="async"
                       />
                       {/* Hover Overlay */}
                       <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-all duration-500 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 flex items-center gap-2">
                                Lihat Detail <ArrowRight className="w-3 h-3" />
                             </span>
                          </div>
                       </div>
                     </div>
                     <h3 className="text-red-900 text-sm md:text-[13px] font-black uppercase tracking-[0.1em] text-center w-full px-2">
                       {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                     </h3>
                     <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-900 transition-colors mt-3"></div>
                  </div>
                </button>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      {filteredProducts.length > 1 && (
        <>
          <CarouselPrevious className="hidden md:flex -left-12 border-none bg-transparent hover:bg-transparent shadow-none text-red-600 hover:text-red-800 h-12 w-12 [&>svg]:w-10 [&>svg]:h-10 transition-colors" />
          <CarouselNext className="hidden md:flex -right-12 border-none bg-transparent hover:bg-transparent shadow-none text-red-600 hover:text-red-800 h-12 w-12 [&>svg]:w-10 [&>svg]:h-10 transition-colors" />
        </>
      )}
    </Carousel>
  );
}

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Extract unique categories directly from PRODUCTS to allow professional filtering
  const categories = useMemo(() => ["Semua", ...new Set(PRODUCTS.map(p => p.category))], []);

  const selectedMaterial = selectedProduct?.materialId 
    ? MATERIALS.find(m => m.id === selectedProduct.materialId) 
    : null;

  return (
    <section id="products" className="py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            Premium Collections
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
            {t('products.title')}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Search & Filter Bar - Sticky at the top of the grid */}
        <div className="sticky top-20 z-30 mb-16 bg-white/70 backdrop-blur-2xl p-2 md:p-2.5 rounded-full border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-3xl mx-auto">
          <div className="flex flex-row gap-2 items-center">
            {/* Categories - Simplified to only "Semua" */}
            <div className="flex items-center gap-1.5 px-2">
              <button
                onClick={() => setSelectedCategory("Semua")}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap bg-red-600 text-white shadow-lg shadow-red-600/20"
                )}
              >
                Semua
              </button>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />

            {/* Search Input */}
            <div className="relative flex-1 px-1">
              <Input 
                placeholder={t('productsPage.searchPlaceholder') || "Cari produk..."} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 h-11 rounded-full bg-slate-50/50 border-transparent focus:bg-white focus:ring-4 focus:ring-red-600/5 focus:border-red-600/20 text-sm transition-all font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className={cn("w-3.5 h-3.5 text-red-500 animate-spin transition-opacity duration-300", searchQuery ? "opacity-100" : "opacity-0")} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative px-0 sm:px-12 min-h-[400px]">
          <Suspense fallback={<CustomLoadingSpinner />}>
            <ProductGrid 
              searchQuery={searchQuery} 
              selectedCategory={selectedCategory} 
              setSelectedProduct={setSelectedProduct} 
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
              navigate={navigate}
            />
          </Suspense>
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
                          loading="lazy"
                          decoding="async"
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

      {/* Quote Form Modal */}
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
