import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, Product } from "../data/products";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Factory,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEOHead } from "../components/SEOHead";
import { COMPANY } from "../config/company";
import { submitQuoteLead } from "../services/leadService";
import { getSafeImageUrl } from "../lib/assetAudit";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const product: Product | undefined = id
    ? PRODUCTS.find((p) => p.id === id || p.slug.toLowerCase() === id.toLowerCase())
    : undefined;

  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "100",
    notes: "",
  });
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState("");

  useEffect(() => {
    setCurrentSliderIndex(0);
    setDirection(0);
  }, [id]);

  if (!product) return <NotFound t={t} />;

  const variations = product.variations.map((v) => ({
    ...v,
    img: getSafeImageUrl(v.img),
  }));

  const activeIndex = Math.min(
    Math.max(0, currentSliderIndex),
    Math.max(0, variations.length - 1)
  );

  const nextSlide = () => {
    if (variations.length === 0) return;
    setDirection(1);
    setCurrentSliderIndex((prev) => (prev + 1) % variations.length);
  };

  const prevSlide = () => {
    if (variations.length === 0) return;
    setDirection(-1);
    setCurrentSliderIndex((prev) => (prev - 1 + variations.length) % variations.length);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await submitQuoteLead(
      {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        product: product.name,
        quantity: formData.quantity,
        notes: formData.notes,
      },
      isId ? "id" : "en"
    );

    if (result.whatsappUrl) {
      window.open(result.whatsappUrl, "_blank");
    }
    setSubmitSuccessMsg(result.message);
    setTimeout(() => {
      setSubmitSuccessMsg("");
      setIsQuoteModalOpen(false);
    }, 4000);
  };

  return (
    <div className="pt-24 pb-32 lg:pb-16 bg-[#F8FAFC] min-h-screen text-slate-900 font-sans relative overflow-x-hidden selection:bg-red-600 selection:text-white">
      <SEOHead
        title={`${product.name} - Spesifikasi & Penawaran`}
        description={`${product.description} MOQ: ${product.moq}. Estimasi produksi: ${product.productionTime}. Diproduksi oleh ${COMPANY.legalName}.`}
      />

      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* BREADCRUMBS */}
      <nav className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10 py-4 flex flex-wrap items-center justify-between gap-4 mb-4 lg:mb-8">
        <div className="flex items-center gap-2 text-xs font-black text-slate-400 tracking-widest uppercase">
          <Link to="/" className="hover:text-red-600 transition-colors">
            {t("nav.home", { defaultValue: "Beranda" })}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/products" className="hover:text-red-600 transition-colors">
            {t("nav.products", { defaultValue: "Produk" })}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>

        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-red-600 transition-colors group bg-white px-5 py-2.5 rounded-full shadow-xs border border-slate-200 hover:border-red-200"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Katalog
          </Link>
        </div>
      </nav>

      {/* MASTER CATALOG BINDER */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative">
          
          {/* LEFT SIDE: VISUAL SLIDER */}
          <div className="lg:col-span-6 p-8 md:p-10 lg:p-12 pb-6 flex flex-col justify-between relative bg-gradient-to-br from-slate-50 via-white to-slate-50/20 overflow-hidden">
            <div>
              <div className="mb-6 text-left">
                <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-1">
                  CLIENT VARIATIONS & SAMPLES
                </h2>
                <div className="w-20 h-[3px] bg-red-600 rounded-full" />
              </div>

              {variations.length > 0 && (
                <div className="relative flex flex-col items-center justify-center py-2">
                  <div className="w-full max-w-xl mx-auto flex items-center justify-between gap-4 relative">
                    <button
                      aria-label="Previous image"
                      type="button"
                      onClick={prevSlide}
                      className="absolute left-[-15px] md:left-[-35px] z-30 w-12 h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-red-600 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[480px] md:min-h-[540px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col items-center w-full"
                        >
                          <div className="h-[420px] md:h-[480px] w-full flex items-center justify-center relative">
                            <img
                              src={variations[activeIndex].img}
                              alt={variations[activeIndex].name}
                              className="max-h-full max-w-full object-contain filter drop-shadow-lg select-none"
                              loading="eager"
                            />
                          </div>

                          <div className="mt-4 flex flex-col items-center text-center space-y-1.5">
                            <div className="px-4 py-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center gap-2">
                              <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", variations[activeIndex].bgClass || "bg-slate-900")} />
                              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                {variations[activeIndex].brand}
                              </span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase pt-1">
                              {variations[activeIndex].name}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <button
                      aria-label="Next image"
                      type="button"
                      onClick={nextSlide}
                      className="absolute right-[-15px] md:right-[-35px] z-30 w-12 h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-red-600 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    {variations.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        type="button"
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          setCurrentSliderIndex(idx);
                        }}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all cursor-pointer",
                          idx === activeIndex ? "bg-red-600 w-8" : "bg-slate-200 hover:bg-slate-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: PRODUCT SPECS */}
          <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between relative bg-white">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight mt-1">
                  {product.name}
                </h1>
              </div>

              <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed">
                {product.description}
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400">Harga Mulai</span>
                    <p className="font-black text-red-600 text-base">{product.currency} {product.priceFrom} <span className="text-slate-400 font-normal text-xs">/ pcs</span></p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400">Minimum Order</span>
                    <p className="font-bold text-slate-900 text-sm">{product.moq}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400">Estimasi Produksi</span>
                    <p className="font-bold text-slate-900">{product.productionTime}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400">Pilihan Bahan</span>
                    <p className="font-bold text-slate-900">{product.materials.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Factory className="w-5 h-5 text-red-600 shrink-0" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Kapasitas</p>
                    <p className="text-xs font-bold text-slate-900">20.000 Pcs/Bulan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Garansi</p>
                    <p className="text-xs font-bold text-slate-900">100% Retur Bebas Cacat</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-red-600 text-white font-black text-xs uppercase tracking-widest transition cursor-pointer shadow-lg"
              >
                Minta Penawaran Resmi
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* QUOTE MODAL */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-black text-slate-900 uppercase">
              Form Penawaran: {product.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-medium">
              Isi formulir di bawah ini untuk mendapatkan estimasi harga resmi dari {COMPANY.legalName}.
            </DialogDescription>
          </DialogHeader>

          {submitSuccessMsg ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-800">{submitSuccessMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500">Nama Lengkap *</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className="h-11 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500">Perusahaan / Instansi *</Label>
                <Input
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="PT / CV / Instansi"
                  className="h-11 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-slate-500">Email *</Label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@perusahaan.com"
                    className="h-11 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-slate-500">WhatsApp *</Label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812xxxxxxxx"
                    className="h-11 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500">Kuantitas Order (Pcs) *</Label>
                <Input
                  required
                  type="number"
                  min={1}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="h-11 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500">Catatan Spesifikasi</Label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Kustomisasi bordir, pilihan warna, atau tenggat waktu..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-slate-900 hover:bg-red-600 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition cursor-pointer"
              >
                Kirim Permintaan Penawaran
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NotFound({ t }: { t: any }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 font-sans">
      <h1 className="text-3xl font-black mb-3 text-slate-900">Produk Tidak Ditemukan</h1>
      <p className="text-sm text-slate-500 mb-6 font-medium">Data produk tidak tersedia.</p>
      <Link
        to="/products"
        className={cn(buttonVariants({ variant: "default" }), "h-12 rounded-full font-bold px-8 bg-slate-900 hover:bg-red-600")}
      >
        Kembali ke Katalog
      </Link>
    </div>
  );
}
