import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { Sparkles, PhoneCall, ArrowRight, CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QuoteForm() {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    productType: '',
    estQuantity: '',
    additionalNotes: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, whatsapp, productType, estQuantity, additionalNotes } = formData;
    
    if (!name || !whatsapp || !productType || !estQuantity) {
      alert(t('orderFlow.inquiry.form.validationError'));
      return;
    }

    const formattedWhatsApp = whatsapp.startsWith('0') ? '62' + whatsapp.slice(1) : whatsapp;

    const message = `Halo Parahita! Saya ingin melakukan konsultasi pesanan:
    
- Nama: ${name}
- WhatsApp: ${formattedWhatsApp}
- Jenis Produk: ${productType.toUpperCase()}
- Estimasi Jumlah: ${estQuantity} Pcs
- Catatan: ${additionalNotes || '-'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6282125478346?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    setShowForm(false);
  };

  return (
    <section id="quote" className="py-32 relative overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/50 rounded-full blur-3xl -mr-96 -mt-96 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -ml-64 -mb-64 -z-10" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                {t('orderFlow.inquiry.startNow')}
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                {t('orderFlow.inquiry.title1')}{" "}
                <span className="text-red-600 italic font-serif">
                  {t('orderFlow.inquiry.titleDream')}
                </span>{" "}
                {t('orderFlow.inquiry.title2')}
              </h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg">
                {t('orderFlow.inquiry.desc')} <span className="text-slate-900 font-bold">{t('orderFlow.inquiry.descBold')}</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: <ShieldCheck className="w-5 h-5 text-red-600" />,
                  title: t('orderFlow.inquiry.specs.title'), 
                  desc: t('orderFlow.inquiry.specs.desc') 
                },
                { 
                  icon: <Zap className="w-5 h-5 text-red-600" />,
                  title: t('orderFlow.inquiry.design.title'), 
                  desc: t('orderFlow.inquiry.design.desc') 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Visual element behind the card */}
            <div className="absolute inset-0 bg-slate-900 rounded-[3rem] translate-x-4 translate-y-4 -z-10 opacity-5" />
            
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
               {/* Background Texture Overlay */}
              <div 
                className="absolute inset-0 z-0 opacity-5 mix-blend-multiply bg-cover bg-center pointer-events-none" 
                style={{ backgroundImage: "url('/bg2.png')" }}
              />

              <div className="relative z-10 text-center space-y-8">
                <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                  <PhoneCall className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{t('orderFlow.inquiry.startConsultation')}</h3>
                  <p className="text-slate-500 font-medium max-w-[280px] mx-auto text-sm">{t('orderFlow.inquiry.formInfo')}</p>
                </div>

                <Dialog open={showForm} onOpenChange={setShowForm}>
                  <DialogTrigger className={cn(
                    buttonVariants(),
                    "w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] text-base font-black uppercase tracking-widest shadow-2xl shadow-red-600/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
                  )}>
                    {t('orderFlow.inquiry.contactNow')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden rounded-[3rem] border-none bg-white shadow-2xl">
                    <div className="flex flex-col md:flex-row">
                      {/* Left Side Form Info */}
                      <div className="hidden md:flex md:w-[35%] bg-slate-900 p-12 text-white flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10 space-y-6">
                          <h3 className="text-3xl font-black leading-none tracking-tight">{t('orderFlow.inquiry.formTitle')}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed font-medium">{t('orderFlow.inquiry.formInfo')}</p>
                        </div>

                        <div className="relative z-10 space-y-4 pt-10 border-t border-slate-800">
                          <div className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-wider">
                            <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-red-500" />
                            </div>
                            {t('orderFlow.inquiry.benefitDesign')}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-wider">
                            <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-red-500" />
                            </div>
                            {t('orderFlow.inquiry.benefitSample')}
                          </div>
                        </div>
                      </div>

                      {/* Right Side Form fields */}
                      <div className="flex-1 p-10 md:p-14 max-h-[90vh] overflow-y-auto">
                          <form onSubmit={handleWhatsAppSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="form-name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('orderFlow.inquiry.form.name')}*</Label>
                                <Input id="form-name" placeholder={t('orderFlow.inquiry.form.name')} className="rounded-2xl bg-slate-50 border-none h-12 focus:ring-2 focus:ring-red-500/20 transition-all font-medium" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="form-whatsapp" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('orderFlow.inquiry.form.whatsapp')}*</Label>
                                <Input id="form-whatsapp" type="tel" placeholder={t('orderFlow.inquiry.form.waPlaceholder')} className="rounded-2xl bg-slate-50 border-none h-12 font-medium" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                              </div>
                            </div>
 
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="form-product-type" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('orderFlow.inquiry.form.productType')}*</Label>
                                <Select value={formData.productType} onValueChange={(val) => setFormData({...formData, productType: val})}>
                                  <SelectTrigger id="form-product-type" className="rounded-2xl bg-slate-50 border-none h-12 text-left font-medium">
                                    <SelectValue placeholder={t('orderFlow.inquiry.form.pilihJenis')} />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-2xl">
                                    <SelectItem value="kemeja">{t('orderFlow.inquiry.form.shirt')}</SelectItem>
                                    <SelectItem value="kaos">{t('orderFlow.inquiry.form.polo')}</SelectItem>
                                    <SelectItem value="jaket">{t('orderFlow.inquiry.form.jacket')}</SelectItem>
                                    <SelectItem value="wearpack">{t('orderFlow.inquiry.form.wearpack')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="form-quantity" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('orderFlow.inquiry.form.estQuantity')}*</Label>
                                <Input id="form-quantity" type="number" min="0" placeholder={t('orderFlow.inquiry.form.qtyPlaceholder')} className="rounded-2xl bg-slate-50 border-none h-12 font-medium" value={formData.estQuantity} onChange={(e) => setFormData({...formData, estQuantity: e.target.value})} />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="form-notes" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('orderFlow.inquiry.form.additionalNotes')}</Label>
                              <textarea 
                                id="form-notes"
                                className="w-full p-4 rounded-2xl bg-slate-50 border-none h-32 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-sm resize-none font-medium"
                                placeholder={t('orderFlow.inquiry.form.additionalNotesPlaceholder')}
                                value={formData.additionalNotes}
                                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                              />
                            </div>

                            <Button type="submit" className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all hover:shadow-2xl hover:shadow-red-500/30">
                              {t('orderFlow.inquiry.form.sendQuote')}
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                         </form>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
