import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { FileText, Layers, Settings, Scissors, CheckCircle, ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function OrderFlow() {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '', // Dipertahankan jika dibutuhkan di masa depan
    whatsapp: '',
    productType: '',
    estQuantity: '',
    additionalNotes: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, whatsapp, productType, estQuantity, additionalNotes } = formData;
    
    if (!name || !whatsapp || !productType || !estQuantity) {
      alert("Mohon lengkapi bagian yang ditandai bintang (*).");
      return;
    }

    // Menggunakan format internasional untuk WhatsApp (+62)
    const formattedWhatsApp = whatsapp.startsWith('0') ? '62' + whatsapp.slice(1) : whatsapp;

    const message = `Halo Parahita! Saya ingin melakukan konsultasi pesanan:
    
- Nama: ${name}
- WhatsApp: ${formattedWhatsApp}
- Jenis Produk: ${productType.toUpperCase()}
- Estimasi Jumlah: ${estQuantity} Pcs
- Catatan: ${additionalNotes || '-'}`;

    const encodedMessage = encodeURIComponent(message);
    // Nomor admin Parahita
    window.open(`https://wa.me/6282125478346?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    setShowForm(false);
  };

  // Pindahkan array ke dalam komponen/render untuk memastikan i18n (t) berjalan dinamis saat ganti bahasa
  const steps = [
    {
      icon: <FileText />,
      title: t('orderFlow.steps.step1.title'),
      desc: t('orderFlow.steps.step1.desc'),
      bg: "bg-blue-600",
      image: "/pattern.jpg"
    },
    {
      icon: <Scissors />,
      title: t('orderFlow.steps.step2.title'),
      desc: t('orderFlow.steps.step2.desc'),
      bg: "bg-orange-600",
      image: "/cutting.jpg"
    },
    {
      icon: <Sparkles />,
      title: t('orderFlow.steps.step3.title'),
      desc: t('orderFlow.steps.step3.desc'),
      bg: "bg-purple-600",
      images: ["/sablon.jpg", "/bordir.jpg"]
    },
    {
      icon: <Settings />,
      title: t('orderFlow.steps.step4.title'),
      desc: t('orderFlow.steps.step4.desc'),
      bg: "bg-indigo-600",
      image: "/jahit2.jpg"
    },
    {
      icon: <CheckCircle />,
      title: t('orderFlow.steps.step5.title'),
      desc: t('orderFlow.steps.step5.desc'),
      bg: "bg-green-600",
      image: "/qc1.jpg"
    },
    {
      icon: <Layers />,
      title: t('orderFlow.steps.step6.title'),
      desc: t('orderFlow.steps.step6.desc'),
      bg: "bg-slate-600",
      image: "/packing.jpg"
    }
  ];

  return (
    <section className="bg-transparent overflow-hidden">
      {/* --- Section 1: Header & Steps --- */}
      <div className="relative py-24 lg:py-32">
        {/* Modern Background Decor */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-100/40 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{t('orderFlow.howToOrder')}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
            >
              {t('orderFlow.title')}
            </motion.h2>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
              {t('orderFlow.subtitle')}
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 overflow-hidden"
              >
                {/* Background Number Watermark */}
                <div className="absolute -top-10 -right-10 text-[10rem] font-black text-gray-50/50 group-hover:text-red-50/50 transition-colors pointer-events-none select-none">
                  {index + 1}
                </div>

                <div className="flex flex-col h-full relative z-10">
                  <div className="relative mb-8 pt-4">
                    <div className="overflow-hidden rounded-[2rem] aspect-[4/3] shadow-lg bg-gray-100">
                      {step.images ? (
                        <div className="grid grid-cols-2 h-full gap-1">
                          {step.images.map((img, i) => (
                            <img 
                              key={i}
                              src={img} 
                              alt={`${step.title} ${i + 1}`} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              loading="lazy"
                            />
                          ))}
                        </div>
                      ) : (
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className={cn("absolute -bottom-4 left-8 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/10", step.bg)}>
                      {React.cloneElement(step.icon, { size: 24 })}
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="text-red-600 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-red-600" />
                      Tahap {index + 1}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">{step.title}</h3>
                    <p className="text-gray-500 text-base leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Section 2: CTA Bento Box --- */}
      <div id="quote" className="pb-32 container mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-xl">
          {/* Background Image Overlay */}
          <div 
            className="absolute inset-0 z-0 opacity-15 mix-blend-multiply bg-cover bg-center pointer-events-none" 
            style={{ backgroundImage: "url('/bg2.png')" }}
          />
          
          <div className="absolute inset-0 bg-slate-50/80 -z-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 blur-[120px] -mr-64 -mt-64 -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] -ml-48 -mb-48 -z-10" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                <Sparkles className="w-3 h-3 text-red-500" />
                {t('orderFlow.inquiry.startNow')}
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1]">
                {t('orderFlow.inquiry.title1')} <span className="text-red-500">{t('orderFlow.inquiry.titleDream')}</span> {t('orderFlow.inquiry.title2')}
              </h3>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-lg">
                {t('orderFlow.inquiry.desc')} <span className="text-slate-900 font-semibold">{t('orderFlow.inquiry.descBold')}</span>.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { title: t('orderFlow.inquiry.specs.title'), desc: t('orderFlow.inquiry.specs.desc') },
                  { title: t('orderFlow.inquiry.design.title'), desc: t('orderFlow.inquiry.design.desc') }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white/70 p-4 rounded-2xl border border-slate-200">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Action Card */}
            <div className="flex justify-center">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center border border-gray-100"
              >
                <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <PhoneCall className="w-10 h-10 text-red-600" />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-4">Mulai Konsultasi Gratis</h4>
                <p className="text-gray-500 mb-10">Tim ahli kami siap membantu mewujudkan seragam impian perusahaan Anda.</p>
                
                <Dialog open={showForm} onOpenChange={setShowForm}>
                  <DialogTrigger className={cn(
                    buttonVariants(),
                    "w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  )}>
                    Hubungi Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-[2rem] border-none bg-white">
                    <div className="flex flex-col md:flex-row">
                      {/* Left Side Form Info */}
                      <div className="hidden md:flex md:w-1/3 bg-gray-900 p-10 text-white flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-3xl" />
                        <div>
                          <h3 className="text-2xl font-bold mb-4 leading-tight">{t('orderFlow.inquiry.formTitle')}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">Isi detail kebutuhan Anda dan tim kami akan menghubungi dalam 1x24 jam.</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-xs text-gray-400 italic">
                            <CheckCircle className="w-4 h-4 text-red-500" /> Bebas biaya desain
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400 italic">
                            <CheckCircle className="w-4 h-4 text-red-500" /> Sampel bahan gratis
                          </div>
                        </div>
                      </div>

                      {/* Right Side Form fields */}
                      <div className="flex-1 p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                         <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="form-name" className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.name')}*</Label>
                                <Input id="form-name" placeholder="Nama Lengkap" className="rounded-xl bg-gray-50 border-none h-12 focus:ring-2 focus:ring-red-500/20 transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="form-whatsapp" className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.whatsapp')}*</Label>
                                <Input id="form-whatsapp" type="tel" placeholder="0812xxxx" className="rounded-xl bg-gray-50 border-none h-12" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="form-product-type" className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.productType')}*</Label>
                              <Select value={formData.productType} onValueChange={(val) => setFormData({...formData, productType: val})}>
                                <SelectTrigger id="form-product-type" className="rounded-xl bg-gray-50 border-none h-12 text-left">
                                  <SelectValue placeholder="Pilih Jenis Produk" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="kemeja">Kemeja Kerja / PDH / PDL</SelectItem>
                                  <SelectItem value="kaos">Polo Shirt / T-Shirt</SelectItem>
                                  <SelectItem value="jaket">Jaket / Bomber / Hoodie</SelectItem>
                                  <SelectItem value="wearpack">Wearpack Safety / Coverall</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="form-quantity" className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.estQuantity')}*</Label>
                              <Input id="form-quantity" type="number" min="0" placeholder="Contoh: 50" className="rounded-xl bg-gray-50 border-none h-12" value={formData.estQuantity} onChange={(e) => setFormData({...formData, estQuantity: e.target.value})} />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="form-notes" className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.additionalNotes')}</Label>
                              <textarea 
                                id="form-notes"
                                className="w-full p-4 rounded-xl bg-gray-50 border-none h-32 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-sm resize-none"
                                placeholder="Ceritakan detail tambahan (pilihan warna, penempatan bordir, atau tenggat waktu)..."
                                value={formData.additionalNotes}
                                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                              />
                            </div>

                            <Button type="submit" className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-red-500/30">
                              Kirim ke WhatsApp
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                         </form>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
