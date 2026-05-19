import { useParams, Link } from "react-router-dom";
import { PRODUCTS, MATERIALS } from "../constants";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, CheckCircle2, Factory, ShieldCheck, 
  Ruler, ArrowRight, Layers, MessageCircle, ChevronRight,
  ChevronLeft, Send, User, Building, Package, MessageSquare, Info
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

const smoothEase = [0.16, 1, 0.3, 1];

const SALES_CONTACTS = [
  { name: "Sales 1", phone: "6282125478346" }
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [activeImg, setActiveImg] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const product = id ? PRODUCTS.find(p => p.id === id) : undefined;

  if (!product) return <NotFound t={t} />;
  
  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  const safeActiveImg = (activeImg >= 0 && activeImg < images.length) ? activeImg : 0;
  const currentImage = images[safeActiveImg] || product.image || "/placeholder.jpg";

  return (
    <div className="pt-24 bg-slate-50/50 min-h-screen text-slate-900 selection:bg-red-100 font-sans relative overflow-hidden">
      
      {/* Ambient Decorative Light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] -left-20 w-[400px] h-[400px] bg-slate-400/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* --- BREADCRUMBS & NAVIGATION --- */}
      <nav className="container mx-auto px-6 max-w-7xl relative z-10 py-4 flex items-center justify-between border-b border-slate-200/60 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 tracking-wider uppercase">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 truncate max-w-[200px] sm:max-w-none">
            {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
          </span>
        </div>
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {t('productDetail.backToList', { defaultValue: 'Kembali' })}
        </Link>
      </nav>

      {/* --- MAIN INTERACTIVE CONTAINER --- */}
      <section className="container mx-auto px-6 max-w-7xl pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Image Gallery Showcase (Sticky on Desktop) */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="lg:sticky lg:top-28 flex flex-col space-y-4">
              <motion.div 
                layoutId={`img-${product.id}`}
                className="relative w-full aspect-[4/4] sm:aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden bg-white border border-slate-200/60 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] group"
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={safeActiveImg}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    src={currentImage} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                {/* Arrow Controllers */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-3 transition-all duration-300 hover:bg-slate-900 hover:text-white"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-3 transition-all duration-300 hover:bg-slate-900 hover:text-white"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Modern Floating Bar Indicator */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/20 backdrop-blur-md border border-white/20 shadow-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImg(idx)}
                          className={cn(
                            "transition-all duration-300 rounded-full h-1.5",
                            activeImg === idx ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {product.badge && (
                  <Badge className="absolute top-6 left-6 bg-red-600 border border-red-500 text-white font-black px-4 py-1.5 rounded-xl shadow-lg tracking-widest text-[10px] uppercase z-10">
                    {product.badge}
                  </Badge>
                )}
              </motion.div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-hide snap-x">
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={cn(
                        "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 snap-start bg-white shadow-sm",
                        activeImg === idx ? "border-red-500 scale-[0.98]" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Corporate Product Specification Meta */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="space-y-6"
            >
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 text-xs font-black text-red-600 bg-red-50 px-3.5 py-1.5 rounded-xl tracking-wider uppercase">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {product.category}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
              </h1>

              <p className="text-base text-slate-500 leading-relaxed font-medium">
                {t(`products.items.${product.id}.desc`, { defaultValue: product.description })}
              </p>

              {/* USP Bento Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_10px_25px_rgba(0,0,0,0.01)] flex gap-4 items-start group hover:border-slate-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 shrink-0 shadow-inner">
                    <Factory className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('productDetail.capacity', { defaultValue: 'Kapasitas Minimum' })}</p>
                    <p className="font-bold text-slate-900 text-sm">{t('productDetail.minPcs', { defaultValue: 'Hubungi Sales' })}</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_10px_25px_rgba(0,0,0,0.01)] flex gap-4 items-start group hover:border-slate-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 shrink-0 shadow-inner">
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('productDetail.warranty', { defaultValue: 'Jaminan Layanan' })}</p>
                    <p className="font-bold text-slate-900 text-sm">{t('productDetail.returnGuarantee', { defaultValue: 'Garansi Presisi Ganti Baru' })}</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Action Gateway */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex-1 h-15 rounded-2xl bg-slate-900 hover:bg-red-600 text-white font-bold text-base shadow-lg shadow-slate-900/10 hover:shadow-red-600/20 transition-all group"
                >
                  {t('productDetail.requestQuote', { defaultValue: 'Minta Penawaran Harga' })}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-15 w-full sm:w-15 rounded-2xl border-slate-200 bg-white hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all shrink-0"
                    )}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60 p-2 rounded-2xl border-slate-200/80 shadow-xl bg-white/95 backdrop-blur-md relative z-[100]">
                    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Hubungi Konsultan Sales</div>
                    {SALES_CONTACTS.map((sales, idx) => (
                      <DropdownMenuItem 
                        key={idx}
                        className="rounded-xl py-2.5 px-3 cursor-pointer focus:bg-green-50 focus:text-green-700 font-bold text-sm transition-colors"
                        onClick={() => window.open(`https://wa.me/${sales.phone}?text=Halo ${sales.name}, saya tertarik dengan produk ${product.name}`, "_blank")}
                      >
                        <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
                        {sales.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FORM PENAWARAN MODAL --- */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-2xl bg-white">
           <DialogHeader className="p-8 pb-5 bg-slate-50 border-b border-slate-100 relative">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-red-600" />
                 </div>
                 <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">E-Quote Form Penawaran</DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 font-medium text-xs leading-relaxed pt-1">
                 Isi formulir secara lengkap untuk mendapatkan estimasi harga produksi massal unit <span className="text-red-600 font-bold">{product.name}</span> dari tim estimasi kami.
              </DialogDescription>
           </DialogHeader>

           <form 
              className="p-8 space-y-5" 
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
              <div className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap</Label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input id="name" name="name" placeholder="John Doe" className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-slate-900/10 focus-visible:border-slate-900 transition-all font-medium text-sm" required />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Perusahaan / CV</Label>
                       <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input id="company" name="company" placeholder="Nama PT / Instansi" className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-slate-900/10 focus-visible:border-slate-900 transition-all font-medium text-sm" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <Label htmlFor="quantity" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimasi Kuantitas Kebutuhan (Pcs)</Label>
                    <div className="relative">
                       <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input id="quantity" name="quantity" type="number" placeholder="Contoh: 100" className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-slate-900/10 focus-visible:border-slate-900 transition-all font-medium text-sm" required />
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Catatan Spesifikasi Kustom</Label>
                    <div className="relative">
                       <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                       <textarea 
                        id="message" 
                        name="message"
                        placeholder="Detail kustomisasi seperti posisi bordir logo instansi, variasi warna kancing, skema ukuran, atau deadline kebutuhan..." 
                        rows={3}
                        className="w-full pl-11 pr-4 pt-3 rounded-xl bg-slate-50 border border-slate-200/80 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-medium outline-none transition-all resize-none min-h-[90px]"
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                 <Button type="button" variant="ghost" onClick={() => setIsQuoteModalOpen(false)} className="sm:flex-1 h-13 rounded-xl font-bold text-slate-500 hover:bg-slate-100 order-2 sm:order-1">
                   Batal
                 </Button>
                 <Button type="submit" className="sm:flex-[2] h-13 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold uppercase tracking-wider text-xs shadow-md order-1 sm:order-2 transition-colors">
                    Kirim via WhatsApp
                    <Send className="w-3.5 h-3.5 ml-2" />
                 </Button>
              </div>
           </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NotFound({ t }: { t: any }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <Layers className="w-8 h-8 text-slate-400" />
      </div>
      <h1 className="text-2xl font-black mb-2 text-slate-900">{t('productDetail.notFound', { defaultValue: 'Produk Tidak Ditemukan' })}</h1>
      <p className="text-sm text-slate-400 mb-6 max-w-xs text-center font-medium">Data produk yang Anda cari tidak tersedia dalam direktori parahita.</p>
      <Link to="/products" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl font-bold px-6 border-slate-200 bg-white")}>
        {t('productDetail.backToHome', { defaultValue: 'Lihat Katalog Produk' })}
      </Link>
    </div>
  );
}
