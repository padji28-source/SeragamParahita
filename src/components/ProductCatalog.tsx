import { useState, useRef, useMemo, Suspense } from "react";
import { PRODUCTS, MATERIALS } from "@/src/constants";
import { Product } from "@/src/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";

import { 
  Package, X, Send, Loader2, ArrowLeft, ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
         {/* Lingkaran statis */}
         <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
         {/* Lingkaran animasi spin */}
         <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
         {/* Icon paket di tengah */}
         <Package className="absolute inset-0 m-auto w-6 h-6 text-red-600 animate-pulse" />
      </div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">
        Memuat Produk...
      </p>
    </div>
  );
}

// Load instantly without artificial fetch delay
function useProductsResource() {
  return PRODUCTS;
}

// Extracted Product Grid component to be wrapped in Suspense
function ProductGrid({ 
  setSelectedProduct
}: { 
  setSelectedProduct: (p: Product) => void;
}) {
  const loadedProducts = useProductsResource();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-8">
      {loadedProducts.slice(0, 3).map((product, idx) => (
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: idx * 0.05 }}
          whileHover={{ 
            scale: 1.04, 
            y: -10,
            transition: { type: "spring", stiffness: 450, damping: 20 }
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedProduct(product)}
          className="w-full aspect-[4/5] bg-white overflow-hidden cursor-pointer group rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500 relative select-none border border-slate-100"
        >
          <motion.img
            layoutId={`product-image-${product.id}`}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
          {/* Elegant overlay card with title inside */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
            <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.2em] mb-1">{product.category}</span>
            <h4 className="text-xl font-bold text-white tracking-tight">{product.name}</h4>
          </div>
          <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>
      ))}
    </div>
  );
}

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const selectedMaterial = selectedProduct?.materialId 
    ? MATERIALS.find(m => m.id === selectedProduct.materialId) 
    : null;

  return (
    <section id="products" className="py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-widest uppercase relative z-10 drop-shadow-md">
            {t('products.title')}
          </h2>
        </div>

        <div className="relative min-h-[400px]">
          <Suspense fallback={<CustomLoadingSpinner />}>
            <ProductGrid 
              setSelectedProduct={setSelectedProduct} 
            />
          </Suspense>
        </div>

        {/* --- VIEW ALL PRODUCTS BUTTON --- */}
        <div className="flex justify-center mt-16 relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            onClick={() => navigate("/products")}
            className="group relative inline-flex items-center gap-3 bg-slate-900 text-white font-bold h-14 px-10 rounded-2xl transition-all duration-300 overflow-hidden shadow-xl shadow-slate-900/20 cursor-pointer select-none"
          >
            {/* Sliding Red Overlay on Hover */}
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            
            <span className="relative z-10 text-sm">Lihat Semua Produk</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>

          {/* Quick View Modal - Premium Custom Panel Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ perspective: 1200 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-6 overflow-hidden"
            onClick={() => setSelectedProduct(null)} // Tutup modal jika area luar diklik
          >
            {/* Cinematic Ambient Glow */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-0 pointer-events-none select-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.18, scale: 1.15 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-r from-red-650 via-red-600 to-amber-500 blur-[80px] md:blur-[160px] animate-pulse"
              />
            </div>

            {/* Top Navigation Bar: Tutup / Kembali */}
            <motion.div 
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="absolute top-4 left-4 right-4 md:top-8 md:px-8 flex justify-between items-center z-[110]" 
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 backdrop-blur-md cursor-pointer shadow-lg outline-none select-none transition-shadow hover:shadow-white/5"
              >
                <ArrowLeft className="w-4 h-4 text-red-500" />
                <span>{t('nav.home') === 'Home' ? 'Back' : 'Kembali'}</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedProduct(null)}
                className="p-2.5 bg-white/10 text-white rounded-full border border-white/10 backdrop-blur-md cursor-pointer shadow-lg outline-none select-none"
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.82, rotateX: 10, rotateY: -5, y: 35 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, rotateX: -10, rotateY: 5, y: 35 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="relative w-full h-[50vh] md:h-[58vh] lg:h-[64vh] flex justify-center items-center max-w-5xl mx-auto my-12 z-10"
              onClick={(e) => e.stopPropagation()} // Mencegah klik di area gambar menutup modal
            >
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "center", loop: true }}>
                  <CarouselContent>
                    {selectedProduct.images.map((img, idx) => (
                      <CarouselItem key={idx} className="flex justify-center items-center font-sans">
                        <motion.img 
                          layoutId={idx === 0 ? `product-image-${selectedProduct.id}` : undefined}
                          src={img} 
                          alt={`${selectedProduct.name} - ${idx + 1}`}
                          className="max-w-full max-h-[46vh] md:max-h-[54vh] lg:max-h-[60vh] object-contain shadow-2xl rounded-[2.5rem] border border-white/10"
                          referrerPolicy="no-referrer"
                          transition={{ type: "spring", damping: 22, stiffness: 180 }}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {selectedProduct.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4 md:left-8 bg-black/50 hover:bg-black/80 border-white/20 text-white w-12 h-12" />
                      <CarouselNext className="right-4 md:right-8 bg-black/50 hover:bg-black/80 border-white/20 text-white w-12 h-12" />
                    </>
                  )}
                </Carousel>
              ) : (
                // Animasi layoutId akan bekerja sempurna di sini jika fallback gambar tunggal
                <motion.img 
                  layoutId={`product-image-${selectedProduct.id}`}
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="max-w-full max-h-[46vh] md:max-h-[54vh] lg:max-h-[60vh] object-contain shadow-2xl rounded-[2.5rem] border border-white/10 cursor-default"
                  referrerPolicy="no-referrer"
                  transition={{ type: "spring", damping: 22, stiffness: 180 }}
                />
              )}
            </motion.div>

            {/* Bottom Sheet / Info Bar */}
            <motion.div 
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 240, damping: 24, delay: 0.05 }}
              className="absolute bottom-4 inset-x-4 md:bottom-8 md:hover:bg-black/75 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl bg-black/60 backdrop-blur-2xl border border-white/10 p-5 md:p-6 rounded-3xl text-left text-white z-[110] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl transition-colors duration-300 font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase text-red-500 tracking-[0.2em]">{selectedProduct.category}</span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white truncate">{selectedProduct.name}</h3>
                <p className="text-xs text-slate-300 font-medium line-clamp-1 sm:line-clamp-2 leading-relaxed">{selectedProduct.description}</p>
              </div>
              <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setSelectedProduct(null);
                    navigate(`/product/${selectedProduct.id}`);
                  }}
                  className="flex-1 sm:flex-none px-5 h-12 rounded-2xl bg-white text-slate-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer outline-none select-none transition-shadow hover:shadow-lg shadow-black/20"
                >
                  <span>{t('products.specification', { defaultValue: 'Spesifikasi' })}</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex-1 sm:flex-none px-5 h-12 rounded-2xl bg-red-650 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center cursor-pointer outline-none select-none transition-shadow hover:shadow-lg hover:shadow-red-600/10"
                >
                  <span>{t('products.requestQuote', { defaultValue: 'Minta Penawaran' })}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
