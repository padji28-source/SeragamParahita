import { useParams, Link } from "react-router-dom";
import { PRODUCTS, MATERIALS } from "../constants";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react"; // Pastikan versi terbaru
import { 
  ArrowLeft, CheckCircle2, Factory, ShieldCheck, 
  Ruler, ArrowRight, Layers, MessageCircle, ChevronRight,
  ChevronLeft, Send, User, Building, Package, MessageSquare
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

// Helper easing
const smoothEase = [0.16, 1, 0.3, 1];

const SALES_CONTACTS = [
  { name: "Sales 1", phone: "6285211511211" },
  { name: "Sales 2", phone: "6285211511212" }
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [activeImg, setActiveImg] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Cari produk dengan id yang sesuai
  const product = id ? PRODUCTS.find(p => p.id === id) : undefined;

  if (!product) return <NotFound t={t} />;

  const material = product.materialId ? MATERIALS.find(m => m.id === product.materialId) : undefined;
  
  // Pastikan images selalu berupa array string yang valid
  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  // Guard untuk activeImg jika images mendadak berubah atau kosong
  const safeActiveImg = (activeImg >= 0 && activeImg < images.length) ? activeImg : 0;
  const currentImage = images[safeActiveImg] || product.image || "/placeholder.jpg";

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Breadcrumbs - Membantu Navigasi & SEO */}
      <nav className="container mx-auto px-4 py-4 flex items-center gap-2 text-xs font-medium text-gray-400">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 truncate">
          {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
        </span>
      </nav>

      <section className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* KIRI: Image Gallery (Sticky di Desktop) */}
          <div className="lg:w-[55%] xl:w-[60%]">
            <div className="lg:sticky lg:top-28 space-y-4">
              <motion.div 
                layoutId={`img-${product.id}`}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={safeActiveImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={currentImage} 
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Manual Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                {product.badge && (
                  <Badge className="absolute top-6 left-6 bg-red-600 text-white font-black px-4 py-1 rounded-full shadow-xl">
                    {product.badge}
                  </Badge>
                )}
              </motion.div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={cn(
                        "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0",
                        activeImg === idx ? "border-red-500 scale-95" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* KANAN: Product Info */}
          <div className="lg:w-[45%] xl:w-[40%] flex flex-col space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="bg-red-50 text-red-600 border-none px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {product.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed">
                {t(`products.items.${product.id}.desc`, { defaultValue: product.description })}
              </p>

              {/* USP Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <Factory className="w-6 h-6 text-red-500 mb-3" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('productDetail.capacity')}</p>
                  <p className="font-bold text-gray-900">{t('productDetail.minPcs')}</p>
                </div>
                <div className="p-4 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <ShieldCheck className="w-6 h-6 text-red-500 mb-3" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('productDetail.warranty')}</p>
                  <p className="font-bold text-gray-900">{t('productDetail.returnGuarantee')}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 pt-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {(product.features || []).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span className="text-gray-600 text-sm font-medium leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex-1 h-16 rounded-2xl bg-black hover:bg-gray-800 text-white font-bold text-lg shadow-xl transition-all active:scale-95"
                >
                  {t('productDetail.requestQuote')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-16 w-full sm:w-16 rounded-2xl border-gray-200 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all"
                    )}
                  >
                    <MessageCircle className="w-6 h-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-gray-100 shadow-2xl">
                    <div className="px-3 py-2 text-xs font-black uppercase tracking-widest text-gray-400">Hubungi Sales</div>
                    {SALES_CONTACTS.map((sales, idx) => (
                      <DropdownMenuItem 
                        key={idx}
                        className="rounded-xl py-3 px-3 cursor-pointer focus:bg-green-50 focus:text-green-700 font-bold"
                        onClick={() => window.open(`https://wa.me/${sales.phone}?text=Halo ${sales.name}, saya tertarik dengan produk ${product.name}`, "_blank")}
                      >
                        <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
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

      {/* Quote Form Modal */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
           <DialogHeader className="p-8 pb-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-red-100 rounded-xl">
                    <Package className="w-5 h-5 text-red-600" />
                 </div>
                 <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Form Penawaran</DialogTitle>
              </div>
              <DialogDescription className="text-gray-500 font-medium leading-relaxed">
                 Silakan lengkapi data di bawah ini untuk mendapatkan penawaran harga terbaik untuk produk <span className="text-red-600 font-bold">{product.name}</span>.
              </DialogDescription>
           </DialogHeader>

           <form 
              className="p-8 space-y-6" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const company = formData.get('company');
                const quantity = formData.get('quantity');
                const message = formData.get('message');
                
                const waMessage = `Halo Sales 1, saya ingin meminta penawaran untuk produk *${product.name}*.\n\n*Detail Data:*\n- Nama: ${name}\n- Perusahaan: ${company || '-'}\n- Jumlah: ${quantity} Pcs\n- Pesan: ${message || '-'}`;
                
                window.open(`https://wa.me/6285211511211?text=${encodeURIComponent(waMessage)}`, "_blank");
                setIsQuoteModalOpen(false); 
              }}
           >
              <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-gray-400">Nama Lengkap</Label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input id="name" name="name" placeholder="John Doe" className="pl-11 h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-red-500/20" required />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="company" className="text-xs font-black uppercase tracking-widest text-gray-400">Perusahaan</Label>
                       <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input id="company" name="company" placeholder="Nama PT/CV" className="pl-11 h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-red-500/20" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-xs font-black uppercase tracking-widest text-gray-400">Jumlah Pesanan (Pcs)</Label>
                    <div className="relative">
                       <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <Input id="quantity" name="quantity" type="number" placeholder="Contoh: 100" className="pl-11 h-12 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-red-500/20" required />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-gray-400">Pesan Tambahan</Label>
                    <div className="relative">
                       <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                       <textarea 
                        id="message" 
                        name="message"
                        placeholder="Contoh: Saya ingin tambah logo di dada kiri..." 
                        rows={4}
                        className="w-full pl-11 pt-3.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-red-500/20 text-sm font-medium outline-none resize-none"
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-4 flex gap-3">
                 <Button type="button" variant="ghost" onClick={() => setIsQuoteModalOpen(false)} className="flex-1 h-14 rounded-2xl font-bold text-gray-500 mb-2">Batal</Button>
                 <Button type="submit" className="flex-[2] h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest shadow-xl shadow-red-600/20">
                    Kirim Permintaan
                    <Send className="w-4 h-4 ml-2" />
                 </Button>
              </div>
           </form>
        </DialogContent>
      </Dialog>

      {/* Material Section - Dibuat lebih modern dengan Card Glassmorphism */}
      {material && (
        <section className="py-24 bg-gray-50/50 border-t border-gray-100">
          <div className="container mx-auto px-4">
             <div className="max-w-3xl mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Crafted with <span className="text-red-600">Premium</span> Material
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Kami menggunakan <strong>{material.name}</strong> untuk memastikan durabilitas dan kenyamanan maksimal.
                </p>
             </div>

             <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2 space-y-10">
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="text-xs font-black text-red-500 uppercase tracking-widest">Composition</p>
                        <p className="text-xl font-bold text-gray-900 leading-tight">{material.specifications.composition}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-black text-red-500 uppercase tracking-widest">Grammage</p>
                        <p className="text-xl font-bold text-gray-900 leading-tight">{material.specifications.grammage}</p>
                      </div>
                   </div>

                   <div className="h-px bg-gray-100 w-full" />

                   <div className="space-y-4">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Technical Features</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                         {(material.specifications?.technicals || []).map((tech, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                               <div className="w-2 h-2 rounded-full bg-red-200" />
                               {tech}
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>

                <div className="lg:w-1/2 relative">
                   <div className="absolute inset-0 bg-red-100 blur-[80px] opacity-30 rounded-full" />
                   <img 
                     src={material.image} 
                     alt={material.name}
                     className="relative z-10 w-full aspect-square object-cover rounded-[2.5rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
                   />
                </div>
             </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Sub-komponen untuk Not Found agar kode lebih rapi
function NotFound({ t }: { t: any }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <Layers className="w-10 h-10 text-gray-300" />
      </div>
      <h1 className="text-3xl font-bold mb-4">{t('productDetail.notFound')}</h1>
      <Link to="/" className={cn(buttonVariants({ variant: "link" }), "text-red-500")}>
        {t('productDetail.backToHome')}
      </Link>
    </div>
  );
}
