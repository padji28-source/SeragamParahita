import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { PhoneCall, CheckCircle2, Zap, ArrowRight, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QuoteForm() {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', whatsapp: '', estQuantity: '', productType: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Parahita! Saya ingin berkonsultasi mengenai pesanan:\n- Nama: ${formData.name}\n- Produk: ${formData.productType}\n- Estimasi: ${formData.estQuantity} Pcs`;
    window.open(`https://wa.me/6282125478346?text=${encodeURIComponent(message)}`, '_blank');
    setShowForm(false);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Ambient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
              <Layers className="w-3 h-3" /> Solusi Manufaktur
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Solusi Produksi untuk <span className="text-red-600">Brand Terbaik</span> Anda.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
              Kami menggabungkan teknologi manufaktur terkini dengan standar kualitas tinggi untuk memastikan produk Anda menonjol di pasar.
            </p>
            
            <div className="flex flex-col gap-4 pt-4">
              {[ "Standardisasi Kualitas Tinggi", "Efisiensi Produksi Massal", "Konsultasi Desain Profesional" ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-red-600" /> {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-1 rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            <div className="bg-slate-50 rounded-[2.8rem] p-10 md:p-14 text-center space-y-8 border border-white/50">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-100">
                <PhoneCall className="w-8 h-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Siap untuk Memulai?</h3>
                <p className="text-slate-500 text-sm">Tim kami siap membantu kebutuhan produksi Anda.</p>
              </div>

              <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogTrigger
                  render={
                    <Button className="w-full h-16 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-900/10">
                      Mulai Konsultasi <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  }
                />
                
                <DialogContent className="sm:max-w-[450px] p-8 rounded-[2rem] border-none shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black mb-4">Detail Pesanan</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                    <Input placeholder="Nama Lengkap" className="h-12 bg-slate-50 border-0 rounded-2xl" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <Input placeholder="Jenis Produk (ex: Kaos/Jaket)" className="h-12 bg-slate-50 border-0 rounded-2xl" onChange={(e) => setFormData({...formData, productType: e.target.value})} />
                    <Input placeholder="Estimasi Jumlah (Pcs)" type="number" className="h-12 bg-slate-50 border-0 rounded-2xl" onChange={(e) => setFormData({...formData, estQuantity: e.target.value})} />
                    <Button type="submit" className="w-full h-14 bg-red-600 rounded-2xl font-bold hover:bg-red-700">Kirim via WhatsApp</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
