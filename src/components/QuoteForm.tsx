import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Pastikan komponen Label sudah terpasang, atau ganti dengan <label> biasa
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  Layers,
  User,
  Building,
  Package,
  MessageSquare,
  Send
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QuoteForm() {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const company = formData.get('company');
    const quantity = formData.get('quantity');
    const message = formData.get('message');
    
    // Daftar email tujuan (dipisahkan dengan koma)
    const emailTo = "seragamparahita01@gmail.com,cs@seragamparahita.com,seragamparahita02@gmail.com";
    const emailSubject = `Request Penawaran & Konsultasi Produksi - Parahita`;
    
    // Menyusun isi form agar tercopy rapi ke body email menggunakan \r\n (Enter)
    const emailBody = 
      `Halo Tim Sales,\r\n\r\n` +
      `Saya ingin meminta penawaran dan berkonsultasi mengenai pesanan:\r\n\r\n` +
      `----------------------------------------\r\n` +
      `Nama Lengkap        : ${name}\r\n` +
      `Perusahaan/Instansi : ${company || '-'}\r\n` +
      `Kuantitas           : ${quantity} Pcs\r\n` +
      `Catatan Tambahan    : ${message || '-'}\r\n` +
      `----------------------------------------\r\n\r\n` +
      `Mohon informasi lebih lanjut mengenai harga dan estimasi waktu produksi.\r\n\r\n` +
      `Terima kasih.`;
    
    // Mengarahkan user ke email bawaan dengan data yang sudah tercopy
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
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
                <DialogTrigger asChild>
                  <Button className="w-full h-16 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-900/10">
                    Mulai Konsultasi <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden rounded-[3rem] border border-white shadow-2xl bg-white">
                  <DialogHeader className="p-10 pb-6 bg-slate-50/50 border-b border-slate-100 relative">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-red-100 border border-red-200 rounded-2xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-red-600" />
                      </div>
                      <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Form Penawaran</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-500 font-medium text-sm leading-relaxed pt-1">
                      Isi detail kebutuhan Anda untuk mendapatkan estimasi harga dan waktu produksi.
                    </DialogDescription>
                  </DialogHeader>

                  <form 
                    onSubmit={handleEmailSubmit}
                    className="p-10 space-y-6" 
                  >
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Lengkap</Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input id="name" name="name" placeholder="John Doe" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Perusahaan / instansi</Label>
                          <div className="relative">
                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input id="company" name="company" placeholder="PT / Instansi" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kuantitas (Pcs)</Label>
                        <div className="relative">
                          <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input id="quantity" name="quantity" type="number" placeholder="Contoh: 100" className="pl-11 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium text-sm" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Catatan Tambahan</Label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                          <textarea 
                            id="message" 
                            name="message"
                            placeholder="Detail jenis produk atau spesifikasi..." 
                            rows={3}
                            className="w-full pl-11 pr-4 pt-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm font-medium outline-none transition-all resize-none min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="sm:flex-1 h-14 rounded-full font-bold text-slate-500 hover:bg-slate-100 order-2 sm:order-1">
                        Batal
                      </Button>
                      <Button type="submit" className="sm:flex-[2] h-14 rounded-full bg-slate-900 hover:bg-red-600 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl hover:shadow-red-500/30 order-1 sm:order-2">
                        Kirim via Email
                        <Send className="w-4 h-4 ml-3" />
                      </Button>
                    </div>
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
