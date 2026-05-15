import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Send, Layers, Settings, Scissors, CheckCircle, ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function OrderFlow() {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    productType: '',
    industryCategory: '',
    estQuantity: '',
    additionalNotes: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic tetap sama seperti sebelumnya...
    const { name, email, whatsapp, productType, estQuantity } = formData;
    if (!name || !email || !whatsapp || !productType || !estQuantity) {
      alert("Mohon lengkapi bagian yang ditandai bintang (*).");
      return;
    }
    // ... rest of logic
    setShowForm(false);
  };

  return (
    <section className="bg-transparent overflow-hidden">
      {/* --- Section 1: Header & Steps --- */}
      <div className="relative py-24 lg:py-32">
        {/* Modern Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
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

          {/* Steps Grid - Modern Card Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <FileText />,
                title: t('orderFlow.steps.consultation.title'),
                desc: t('orderFlow.steps.consultation.desc'),
                color: "text-blue-600",
                bg: "bg-blue-600",
                image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800"
              },
              {
                icon: <Settings />,
                title: t('orderFlow.steps.design.title'),
                desc: t('orderFlow.steps.design.desc'),
                color: "text-purple-600",
                bg: "bg-purple-600",
                image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800"
              },
              {
                icon: <Scissors />,
                title: t('orderFlow.steps.production.title'),
                desc: t('orderFlow.steps.production.desc'),
                color: "text-orange-600",
                bg: "bg-orange-600",
                image: "https://images.unsplash.com/photo-1596440612457-3f8c85e2b02e?q=80&w=800"
              },
              {
                icon: <CheckCircle />,
                title: t('orderFlow.steps.qc.title'),
                desc: t('orderFlow.steps.qc.desc'),
                color: "text-green-600",
                bg: "bg-green-600",
                image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500"
              >
                <div className="flex flex-col h-full">
                  <div className="relative mb-8">
                    <div className="overflow-hidden rounded-2xl aspect-[4/3]">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                    <div className={cn("absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", step.bg)}>
                      {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center font-black text-gray-300 group-hover:text-red-500 transition-colors shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Section 2: CTA Bento Box --- */}
      <div id="quote" className="pb-32 container mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-xl">
          {/* Background Image (bg2.png) */}
          <div 
            className="absolute inset-0 z-0 opacity-15 mix-blend-multiply bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: "url('/bg2.png')" }}
          />
          
          {/* Animated Background Gradients & Overlay */}
          <div className="absolute inset-0 bg-slate-50/80 z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 blur-[120px] -mr-64 -mt-64 z-0" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] -ml-48 -mb-48 z-0" />

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
                                <Label className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.name')}*</Label>
                                <Input placeholder="Nama Lengkap" className="rounded-xl bg-gray-50 border-none h-12 focus:ring-2 focus:ring-red-500/20 transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.whatsapp')}*</Label>
                                <Input placeholder="0812xxxx" className="rounded-xl bg-gray-50 border-none h-12" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.productType')}*</Label>
                              <Select value={formData.productType} onValueChange={(val) => setFormData({...formData, productType: val})}>
                                <SelectTrigger className="rounded-xl bg-gray-50 border-none h-12">
                                  <SelectValue placeholder="Pilih Jenis Produk" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="kemeja">Kemeja Kerja</SelectItem>
                                  <SelectItem value="kaos">Polo / T-Shirt</SelectItem>
                                  <SelectItem value="jaket">Jaket / Hoodie</SelectItem>
                                  <SelectItem value="wearpack">Wearpack Safety</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.estQuantity')}*</Label>
                              <Input type="number" placeholder="Contoh: 50" className="rounded-xl bg-gray-50 border-none h-12" value={formData.estQuantity} onChange={(e) => setFormData({...formData, estQuantity: e.target.value})} />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-gray-400">{t('orderFlow.inquiry.form.additionalNotes')}</Label>
                              <textarea 
                                className="w-full p-4 rounded-xl bg-gray-50 border-none h-32 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-sm resize-none"
                                placeholder="Ceritakan detail tambahan (ukuran, warna, dll)..."
                                value={formData.additionalNotes}
                                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                              />
                            </div>

                            <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-red-500/30">
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
