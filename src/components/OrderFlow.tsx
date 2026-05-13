import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Send, Layers, Settings, Scissors, CheckCircle, ArrowRight } from "lucide-react";
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
    const { name, company, email, whatsapp, productType, industryCategory, estQuantity, additionalNotes } = formData;
    
    if (!name || !email || !whatsapp || !productType || !estQuantity) {
      alert("Mohon lengkapi bagian yang ditandai bintang (*).");
      return;
    }

    const message = `Halo Parahita, saya ingin meminta penawaran dengan detail sebagai berikut:

*Informasi Kontak*
- Nama: ${name}
- Perusahaan: ${company || '-'}
- Email: ${email}
- WhatsApp: ${whatsapp}

*Detail Pesanan*
- Jenis Produk: ${productType}
- Kategori Industri: ${industryCategory || '-'}
- Estimasi Jumlah: ${estQuantity} pcs

*Catatan Tambahan*
${additionalNotes || '-'}

Mohon informasi harga dan estimasi waktu pengerjaan. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waNumbers = ["6285211511211", "6285211511212"];
    // Select one randomly, or we could just use a fixed number.
    const targetWa = waNumbers[Math.floor(Math.random() * waNumbers.length)];
    
    window.open(`https://wa.me/${targetWa}?text=${encodedMessage}`, '_blank');
    setShowForm(false);
  };

  return (
    <section className="bg-white">
      {/* Inquiry & Order Flow Header */}
      <div className="bg-white py-24 relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Parahita Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Layers className="w-3 h-3" />
              {t('orderFlow.howToOrder')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t('orderFlow.title')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              {t('orderFlow.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-[100px] left-[10%] right-[10%] h-0.5 bg-gray-200/60 -z-10" />

            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: t('orderFlow.steps.consultation.title'),
                desc: t('orderFlow.steps.consultation.desc'),
                color: "bg-blue-50 text-blue-600 border-blue-100",
                image: "/bg1.png"
              },
              {
                icon: <Settings className="w-6 h-6" />,
                title: t('orderFlow.steps.design.title'),
                desc: t('orderFlow.steps.design.desc'),
                color: "bg-purple-50 text-purple-600 border-purple-100",
                image: "/bg2.png"
              },
              {
                icon: <Scissors className="w-6 h-6" />,
                title: t('orderFlow.steps.production.title'),
                desc: t('orderFlow.steps.production.desc'),
                color: "bg-orange-50 text-orange-600 border-orange-100",
                image: "/bg3.png"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: t('orderFlow.steps.qc.title'),
                desc: t('orderFlow.steps.qc.desc'),
                color: "bg-green-50 text-green-600 border-green-100",
                image: "/Parahitaprimasentosa.png"
              }
            ].map((step, index) => {
              return (
                <div key={index} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative group flex flex-col items-center bg-white rounded-3xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 mt-4 h-full"
                  >
                    {/* Number Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-red-50 flex items-center justify-center text-xl font-black text-red-600 shadow-md z-10">
                      {index + 1}
                    </div>

                    {/* Image/Visual */}
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 mt-4 relative border border-gray-100">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className={`absolute bottom-3 right-3 w-10 h-10 rounded-xl ${step.color} flex items-center justify-center shadow-lg border border-white/20`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="text-center w-full flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>

                  {/* Flow Arrow (only visible on large screens between items) */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-[130px] -right-[2.5rem] w-8 h-8 z-0 text-red-200">
                      <ArrowRight className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <div id="quote" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/50 to-transparent pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-100 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Sidebar Info */}
            <div className="lg:col-span-12 max-w-3xl mx-auto space-y-8 sm:space-y-10 text-center flex flex-col items-center px-4">
              <div className="w-full">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm self-center">
                  <Send className="w-3 h-3 text-red-600" />
                  {t('orderFlow.inquiry.startNow')}
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight text-center">
                  {t('orderFlow.inquiry.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">{t('orderFlow.inquiry.titleDream')}</span>
                  {t('orderFlow.inquiry.title2')}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-lg mb-8 text-center mx-auto max-w-2xl text-balance px-2">
                  {t('orderFlow.inquiry.desc')} <strong className="text-gray-900">{t('orderFlow.inquiry.descBold')}</strong>.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 text-left w-full max-w-2xl px-2">
                {[
                  { icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />, title: t('orderFlow.inquiry.specs.title'), desc: t('orderFlow.inquiry.specs.desc') },
                  { icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />, title: t('orderFlow.inquiry.design.title'), desc: t('orderFlow.inquiry.design.desc') },
                  { icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />, title: t('orderFlow.inquiry.noCommitment.title'), desc: t('orderFlow.inquiry.noCommitment.desc') },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-5 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow max-w-2xl w-full">
                    <div className="p-3 bg-red-50/80 rounded-xl text-red-600 shrink-0 h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 pb-12 w-full px-4 sm:px-0 flex justify-start sm:justify-center">
                <Dialog open={showForm} onOpenChange={setShowForm}>
                  <DialogTrigger
                    className={cn(buttonVariants(), "w-full sm:w-auto px-4 sm:px-8 h-auto min-h-14 sm:min-h-16 py-3 sm:py-0 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-sm sm:text-lg rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3 group whitespace-normal break-words text-center")}
                  >
                      <span>{t('orderFlow.inquiry.btnAsk')}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-0 overflow-y-auto max-h-[85vh] sm:max-h-[90vh] rounded-2xl md:rounded-[2rem] border-none bg-white">
                    <div className="p-5 sm:p-8 md:p-10 relative">
                      <DialogHeader className="mb-6 md:mb-8 text-center">
                        <DialogTitle className="text-2xl md:text-3xl font-extrabold text-gray-900">
                          {t('orderFlow.inquiry.formTitle')}
                        </DialogTitle>
                      </DialogHeader>

                      <form className="space-y-8 sm:space-y-10" onSubmit={handleWhatsAppSubmit}>
                        
                        {/* Step 1: Informasi Kontak */}
                        <div className="space-y-5 sm:space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-gray-100 pb-4">
                            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0">1</div>
                            <h4 className="font-bold text-gray-900 text-lg sm:text-xl">{t('orderFlow.inquiry.contactInfo')}</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.name')} <span className="text-red-500">*</span></Label>
                              <Input placeholder="John Doe" className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 hover:bg-white rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all font-medium" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.company')}</Label>
                              <Input placeholder="PT Sukses Makmur" className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 hover:bg-white rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all font-medium" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.email')} <span className="text-red-500">*</span></Label>
                              <Input type="email" placeholder="john@perusahaan.com" className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 hover:bg-white rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all font-medium" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.whatsapp')} <span className="text-red-500">*</span></Label>
                              <Input type="tel" placeholder="0812xxxx" className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 hover:bg-white rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all font-medium" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                            </div>
                          </div>
                        </div>

                        {/* Step 2: Detail Pesanan */}
                        <div className="space-y-5 sm:space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-gray-100 pb-4">
                            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0">2</div>
                            <h4 className="font-bold text-gray-900 text-lg sm:text-xl">{t('orderFlow.inquiry.form.orderDetails')}</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.productType')} <span className="text-red-500">*</span></Label>
                              <Select value={formData.productType} onValueChange={(val) => setFormData({...formData, productType: val})}>
                                <SelectTrigger className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 hover:bg-white rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all font-medium">
                                  <SelectValue placeholder="Pilih Produk" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-gray-100 border bg-white shadow-xl">
                                  <SelectItem value="kemeja" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Kemeja Kerja</SelectItem>
                                  <SelectItem value="kaos" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Kaos / Polo</SelectItem>
                                  <SelectItem value="jaket" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Jaket / Hoodie</SelectItem>
                                  <SelectItem value="wearpack" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Wearpack / Safety</SelectItem>
                                  <SelectItem value="lainnya" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Lainnya</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.industryCategory')}</Label>
                              <Select value={formData.industryCategory} onValueChange={(val) => setFormData({...formData, industryCategory: val})}>
                                <SelectTrigger className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 hover:bg-white rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all font-medium">
                                  <SelectValue placeholder="Pilih Industri" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-gray-100 border bg-white shadow-xl">
                                  <SelectItem value="waralaba" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Waralaba / F&B</SelectItem>
                                  <SelectItem value="otomotif" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Otomotif</SelectItem>
                                  <SelectItem value="tambang" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Pertambangan</SelectItem>
                                  <SelectItem value="kantor" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Corporate / Kantor</SelectItem>
                                  <SelectItem value="event" className="cursor-pointer hover:bg-red-50 focus:bg-red-50">Event / Komunitas</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.estQuantity')} <span className="text-red-500">*</span></Label>
                              <Input type="number" placeholder="Min. 24 pcs" min="24" className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 hover:bg-white rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all font-medium" value={formData.estQuantity} onChange={(e) => setFormData({...formData, estQuantity: e.target.value})} />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.uploadDesign')}</Label>
                              <div className="relative group">
                                <Input type="file" className="h-12 sm:h-14 border-gray-200 bg-gray-50/50 group-hover:bg-red-50/30 rounded-xl pt-2 sm:pt-[0.8rem] focus:ring-red-500/20 focus:border-red-500 transition-all cursor-pointer file:mr-2 sm:file:mr-4 file:py-1 file:px-3 sm:file:py-1.5 sm:file:px-4 file:rounded-full file:border-0 file:text-[10px] sm:file:text-[11px] file:font-bold file:uppercase file:tracking-wider file:bg-red-100 file:text-red-700 hover:file:bg-red-200 file:transition-colors file:cursor-pointer" />
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">{t('orderFlow.inquiry.form.additionalNotes')}</Label>
                              <textarea 
                                rows={4} 
                                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:outline-none transition-all font-medium text-gray-900 resize-none text-sm"
                                placeholder="..."
                                value={formData.additionalNotes}
                                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full h-14 sm:h-16 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group mt-4">
                          {t('orderFlow.inquiry.form.sendQuote')}
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <p className="text-center text-[10px] sm:text-xs text-gray-400 font-medium">
                          {t('orderFlow.inquiry.form.privacyNote')}
                        </p>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
