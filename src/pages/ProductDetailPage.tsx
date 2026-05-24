import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../constants";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Factory, ShieldCheck, ArrowRight, Layers, 
  MessageCircle, ChevronRight, ChevronLeft, Send, 
  User, Building, Package, MessageSquare, Sparkles
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Varian Animasi
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 }
  })
};

const SALES_CONTACTS = [
  { name: "Sales 1", phone: "6282125478346" }
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  
  // State untuk gambar dan arah animasi
  const [[page, direction], setPage] = useState([0, 0]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const product = id ? PRODUCTS.find(p => p.id === id) : undefined;

  if (!product) return <NotFound t={t} />;
  
  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  // Handler Navigasi Gambar
  const activeIndex = Math.abs(page % images.length);
  const currentImage = images[activeIndex] || "/placeholder.jpg";

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const jumpToImage = (index: number) => {
    setPage([index, index > activeIndex ? 1 : -1]);
  };

  return (
    <div className="pt-24 pb-12 bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-red-500 selection:text-white font-sans relative overflow-hidden">
      
      {/* Animated Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-400/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- BREADCRUMBS --- */}
      <nav className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10 py-4 flex flex-wrap items-center justify-between gap-4 mb-4 lg:mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-widest uppercase">
          <Link to="/" className="hover:text-red-600 transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/products" className="hover:text-red-600 transition-colors">Produk</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 truncate max-w-[150px] sm:max-w-[300px]">
            {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
          </span>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors group bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200/60 hover:border-red-200 hover:shadow-red-500/10">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
        </motion.div>
      </nav>

      {/* --- MAIN INTERACTIVE CONTAINER --- */}
      <section className="container mx-auto px-6 lg:px-12 max-w-7xl pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: Image Gallery Showcase (Sticky Desktop) */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28 flex flex-col space-y-6">
              
              {/* Studio Canvas for Image */}
              <motion.div 
                layoutId={`product-image-${product.id}`}
                className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[3rem] overflow-hidden bg-white/60 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 group flex items-center justify-center p-8"
              >
                {/* Internal Mesh Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.img 
                    key={page}
                    src={currentImage} 
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl z-10 p-12"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={() => paginate(-1)}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-slate-800 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300 hover:bg-slate-900 hover:text-white z-20 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => paginate(1)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-slate-800 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300 hover:bg-slate-900 hover:text-white z-20 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                {product.badge && (
                  <Badge className="absolute top-8 left-8 bg-red-600/90 backdrop-blur-md border-none text-white font-black px-4 py-2 rounded-full shadow-lg tracking-widest text-[10px] uppercase z-20">
                    {product.badge}
                  </Badge>
                )}
              </motion.div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x justify-center">
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => jumpToImage(idx)}
                      className={cn(
                        "relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500 shrink-0 snap-center bg-white shadow-sm flex items-center justify-center p-2",
                        activeIndex === idx 
                          ? "border-2 border-red-500 scale-100 shadow-md" 
                          : "border border-slate-200/60 opacity-60 hover:opacity-100 hover:scale-105"
                      )}
                    >
                      <img src={img} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Staggered Content Area */}
          <div className="lg:col-span-6 flex flex-col justify-center py-6">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              {/* Category */}
              <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 text-xs font-black text-red-600 bg-red-50 px-4 py-2 rounded-full tracking-[0.2em] uppercase border border-red-100">
                <Sparkles className="w-3.5 h-3.5" />
                {product.category}
              </motion.div>
              
              {/* Title & Description */}
              <motion.div variants={fadeUpVariant} className="space-y-6">
                <motion.h1 
                  layoutId={`product-title-${product.id}`}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05]"
                >
                  {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                </motion.h1>
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                  {t(`products.items.${product.id}.desc`, { defaultValue: product.description })}
                </p>
              </motion.div>

              {/* Editorial Separator */}
              <motion.div variants={fadeUpVariant} className="w-full h-[1px] bg-gradient-to-r from-slate-200 via-slate-200 to-transparent my-8" />

              {/* USP Bento Block */}
              <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-[2rem] bg-white border border-white shadow-xl shadow-slate-200/30 flex gap-5 items-start group hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 mt-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('productDetail.capacity', { defaultValue: 'Kapasitas Minimum' })}</p>
                    <p className="font-bold text-slate-900 text-sm">{t('productDetail.minPcs', { defaultValue: 'Hubungi Sales untuk Detail' })}</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-[2rem] bg-white border border-white shadow-xl shadow-slate-200/30 flex gap-5 items-start group hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 mt-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('productDetail.warranty', { defaultValue: 'Jaminan Layanan' })}</p>
                    <p className="font-bold text-slate-900 text-sm">{t('productDetail.returnGuarantee', { defaultValue: 'Garansi Kualitas Presisi' })}</p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex-1 h-16 rounded-full bg-slate-900 hover:bg-red-600 text-white font-bold text-sm tracking-widest uppercase shadow-xl shadow-slate-900/20 hover:shadow-red-600/30 transition-all duration-500 group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {t('productDetail.requestQuote', { defaultValue: 'Minta Penawaran' })}
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 h-full w-0 bg-white/20 group-hover:w-full transition-all duration-500 ease-out skew-x-12 -ml-10" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-16 w-full sm:w-16 rounded-full border-2 border-slate-200 bg-white hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-all duration-500 shrink-0 group shadow-sm hover:shadow-xl hover:shadow-green-500/20 p-0 flex items-center justify-center"
                    )}
                  >
                    <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-3 rounded-[2rem] border-white shadow-2xl shadow-slate-200/50 bg-white/90 backdrop-blur-xl relative z-[100]">
                    <div className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 mb-2">Hubungi Konsultan Sales</div>
                    {SALES_CONTACTS.map((sales, idx) => (
                      <DropdownMenuItem 
                        key={idx}
                        className="rounded-2xl py-3 px-4 cursor-pointer focus:bg-green-50 focus:text-green-700 font-bold text-sm transition-colors group"
                        onClick={() => window.open(`https://wa.me/${sales.phone}?text=Halo ${sales.name}, saya tertarik dengan produk ${product.name}`, "_blank")}
                      >
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                          <MessageSquare className="w-4 h-4 text-green-600" />
                        </div>
                        Chat {sales.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FORM PENAWARAN MODAL --- */}
      {/* Modal tetap sama fungsionalnya, hanya diberi sentuhan styling yang lebih soft (rounded-[3rem]) */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden rounded-[3rem] border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-white/95 backdrop-blur-3xl">
           <DialogHeader className="p-10 pb-6 bg-slate-50/50 border-b border-slate-100 relative">
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-12 h-12 bg-red-100 border border-red-200 rounded-2xl flex items-center justify-center shadow-inner">
                    <Package className="w-6 h-6 text-red-600" />
                 </div>
                 <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Form Penawaran</DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 font-medium text-sm leading-relaxed pt-1">
                 Isi detail kebutuhan Anda untuk mendapatkan estimasi produksi <span className="text-red-600 font-bold">{product.name}</span>.
              </DialogDescription>
           </DialogHeader>

           <form 
              className="p-10 space-y-6" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const company = formData.get('company');
                const quantity = formData.get('quantity');
                const message = formData.get('message');
                
                const waMessage = `Halo Sales 1, saya ingin meminta penawaran untuk produk *${product.name}*.\n\n*Deskripsi Produk:*\n${product.description}\n\n*Detail Data:*\n- Nama: ${name}\n- Perusahaan: ${company || '-'}\n- Jumlah: ${quantity} Pcs\n- Pesan: ${message || '-'}`;
                
                window.open(`https://wa.me/6282125478346?text=${encodeURIComponent(waMessage)}`, "_blank");
                setIsQuoteModalOpen(false); 
              }}
           >
              {/* Inputs (Sama dengan versi Anda, disesuaikan sedikit padding dan shadow) */}
              <div className="space-y-5">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                       <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Lengkap</Label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input id="name" name="name" placeholder="John Doe" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm shadow-sm" required />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Perusahaan / CV</Label>
                       <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input id="company" name="company" placeholder="PT / Instansi" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm shadow-sm" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kuantitas (Pcs)</Label>
                    <div className="relative">
                       <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input id="quantity" name="quantity" type="number" placeholder="Contoh: 100" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm shadow-sm" required />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Catatan Tambahan</Label>
                    <div className="relative">
                       <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                       <textarea 
                        id="message" 
                        name="message"
                        placeholder="Detail kustomisasi..." 
                        rows={3}
                        className="w-full pl-11 pr-4 pt-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-medium outline-none transition-all resize-none min-h-[100px] shadow-sm"
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                 <Button type="button" variant="ghost" onClick={() => setIsQuoteModalOpen(false)} className="sm:flex-1 h-14 rounded-full font-bold text-slate-500 hover:bg-slate-100 order-2 sm:order-1">
                   Batal
                 </Button>
                 <Button type="submit" className="sm:flex-[2] h-14 rounded-full bg-slate-900 hover:bg-red-600 text-white font-bold uppercase tracking-widest text-xs shadow-xl hover:shadow-red-500/30 order-1 sm:order-2 transition-all duration-300">
                    Kirim via WhatsApp
                    <Send className="w-4 h-4 ml-3" />
                 </Button>
              </div>
           </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NotFound({ t }: { t: any }) {
  // ... (Tetap sama seperti kode Anda)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-24 h-24 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-slate-200/50">
        <Layers className="w-10 h-10 text-slate-300" />
      </div>
      <h1 className="text-3xl font-black mb-3 text-slate-900 tracking-tight">{t('productDetail.notFound', { defaultValue: 'Produk Tidak Ditemukan' })}</h1>
      <p className="text-base text-slate-500 mb-8 max-w-sm text-center font-medium">Data produk yang Anda cari tidak tersedia dalam direktori saat ini.</p>
      <Link to="/products" className={cn(buttonVariants({ variant: "default" }), "h-14 rounded-full font-bold px-8 bg-slate-900 hover:bg-red-600 shadow-xl")}>
        {t('productDetail.backToHome', { defaultValue: 'Kembali ke Katalog' })}
      </Link>
    </div>
  );
}
