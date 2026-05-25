import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight, MessageSquare, Clock, Shield, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-red-200 font-sans overflow-hidden">
      
      {/* --- GLOBAL BACKGROUND AMBIENT --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-slate-100 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[30%] -right-40 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -left-40 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[450px] flex items-center overflow-hidden z-10">
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Contact Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md"
            >
              <Shield className="w-3.5 h-3.5" />
              {t('contact.badge', { defaultValue: 'Get In Touch' })}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-6xl font-black tracking-tight text-white"
            >
              {t('contact.title', { defaultValue: 'Hubungi' })} <span className="text-red-500">Parahita</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-xl font-medium leading-relaxed"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- CONTACT MAIN CONTENT HUB --- */}
      <section className="py-16 lg:py-24 relative z-10 -mt-10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Channels Info */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                  <Minus className="w-5 h-5 text-red-500" /> {t('contact.contactInfo', { defaultValue: 'Corporate Directory' })}
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {t('contact.connectTitle', { defaultValue: 'Saluran Komunikasi Resmi' })}
                </h2>
                <p className="text-slate-500 text-base leading-relaxed">
                  {t('contact.contactDesc', { defaultValue: 'Hubungi tim operasional dan layanan pelanggan kami melalui kanal resmi di bawah ini untuk respons cepat.' })}
                </p>
              </div>

              {/* Info Block Node Cards */}
              <div className="space-y-4">
                
                {/* Phone Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex gap-5 items-center group hover:border-red-500/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:bg-red-50 group-hover:text-red-600 transition-colors shadow-inner">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('contact.phone', { defaultValue: 'Telepon Kantor' })}</h4>
                    <a href="tel:+62215399261" className="text-base font-bold text-slate-900 hover:text-red-600 transition-colors block">
                      +6221-5399-261
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex gap-5 items-center group hover:border-red-500/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:bg-red-50 group-hover:text-red-600 transition-colors shadow-inner">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('contact.email', { defaultValue: 'Korespondensi Email' })}</h4>
                    <a href="mailto:cs@seragamparahita.com" className="text-base font-bold text-slate-900 hover:text-red-600 transition-colors block breakdown-all">
                      cs@seragamparahita.com
                    </a>
                  </div>
                </div>

                {/* Office Address Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex gap-5 items-start group hover:border-red-500/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:bg-red-50 group-hover:text-red-600 transition-colors shadow-inner mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('contact.office', { defaultValue: 'Headquarters Address' })}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Kawasan Industri Multiguna Blok B No. 10A, Jl. Raya Serpong KM 7, Pakualam, Serpong Utara, Kota Tangerang Selatan, Banten 15310
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Department Gateway */}
            <div className="lg:col-span-7 h-full">
              <div className="bg-white border border-slate-200/80 p-8 md:p-10 rounded-[2.2rem] shadow-[0_15px_40px_rgba(0,0,0,0.02)] space-y-8 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 blur-[60px] rounded-full pointer-events-none" />
                
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    {t('contact.hours', { defaultValue: 'Response Time: < 15 Mins' })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{t('contact.waTitle', { defaultValue: 'Instant Support & Inquiry' })}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                    {t('contact.waDesc', { defaultValue: 'Terhubung langsung dengan perwakilan divisi kami untuk memproses konsultasi desain, penawaran harga produksi, atau status kerja sama secara praktis.' })}
                  </p>
                </div>

                {/* Split Router Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  
                  {/* Channel 1: B2B Sales */}
                  <a 
                    href="https://wa.me/6282125478346" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-green-300 hover:bg-white transition-all group relative flex flex-col justify-between items-start space-y-6"
                  >
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:scale-105 transition-transform shadow-inner">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between w-full">
                        <h4 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors text-base">Divisi Sales & B2B</h4>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">{t('contact.chatNow', { defaultValue: 'Konsultasi Produksi Massal & Seragam Korporat' })}</p>
                    </div>
                  </a>

                  {/* Channel 2: General Helpdesk */}
                  <a 
                    href="https://wa.me/6282125478346" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-green-300 hover:bg-white transition-all group relative flex flex-col justify-between items-start space-y-6"
                  >
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:scale-105 transition-transform shadow-inner">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between w-full">
                        <h4 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors text-base">Customer Support</h4>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">{t('contact.supportDesc', { defaultValue: 'Layanan Pelacakan Pesanan & Informasi Umum' })}</p>
                    </div>
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FLOATING MAP INTEGRATION --- */}
      <section className="py-8 bg-transparent relative pb-24 z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] lg:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2162348545!2d106.6455043!3d-6.2350812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbe8c3410c17%3A0x9b3aa1ee3c4a13f0!2sPT.%20PARAHITA%20PRIMA%20SENTOSA!5e0!3m2!1sen!2sid!4v1713145000000!5m2!1sen!2sid" 
              className="absolute inset-0 w-full h-full border-0 transition-transform duration-700 ease-out grayscale-[20%] contrast-[110%] group-hover:scale-[1.02]"
              allowFullScreen
              loading="lazy"
              title="Parahita Office Location"
            ></iframe>
            
            {/* Ambient Shadow Overlay on map container */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            
            {/* Docked / Floating Premium Meta-Card */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-auto lg:w-96 bg-white/95 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-xl border border-white/60 transform transition-all duration-500 ease-out z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 shadow-inner">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-black text-slate-900 text-base leading-tight">Head Office</h4>
                  <p className="text-xs font-bold text-red-500">PT Parahita Prima Sentosa</p>
                </div>
              </div>
              <p className="text-xs lg:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                Kawasan Industri Multiguna Blok B No. 10A, Jl. Raya Serpong KM 7, Pakualam, Serpong Utara.
              </p>
              
              <a 
                href="https://www.google.com/maps/place/PT.+PARAHITA+PRIMA+SENTOSA/@-6.2350812,106.647693,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbe8c3410c17:0x9b3aa1ee3c4a13f0!8m2!3d-6.2350812!4d106.647693!16s%2Fg%2F11c1vnlxdg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors flex items-center justify-center gap-2 group/btn shadow-md shadow-slate-900/10 hover:shadow-red-600/20"
              >
                <MapPin className="w-4 h-4 group-hover/btn:animate-bounce" />
                {t('contact.openMap', { defaultValue: 'Buka di Google Maps' })}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
