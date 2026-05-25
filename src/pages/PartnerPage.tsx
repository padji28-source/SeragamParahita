import { MAJOR_PARTNERS, PARTNERS } from "../constants";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  HeartHandshake, 
  Building2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import OrderFlow from "../components/OrderFlow";
import QuoteForm from "../components/QuoteForm";

const smoothEase = [0.16, 1, 0.3, 1];

export default function PartnerPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-red-200 font-sans overflow-hidden">
      
      {/* --- GLOBAL BACKGROUND AMBIENT --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-slate-100 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[550px] lg:h-[600px] flex items-center overflow-hidden z-10">
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Partners Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Overlay Gelap Kiri ke Kanan */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          {/* Overlay Mulus Melarut ke Bawah */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 border border-slate-700/50 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              {t('partner.strategicPartnerships', { defaultValue: 'Client Partnerships' })}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]"
            >
              {t('partner.title', { defaultValue: 'Klien Strategis' })} <br />
              <span className="text-red-500">Parahita.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed opacity-90"
            >
              {t('partner.subtitle', { defaultValue: 'Membangun sinergi kokoh bersama perusahaan terkemuka demi menghadirkan inovasi manufaktur berstandar tinggi.' })}
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- TRUSTED BY / MARQUEE LOGO --- */}
      <section className="py-12 relative z-10 -mt-16">
        <div className="relative w-full flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-slate-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-slate-50 after:to-transparent">
          <div className="flex items-center space-x-20 animate-marquee min-w-max pr-20 hover:[animation-play-state:paused] py-4">
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <img
                key={`${partner.name}-${index}`}
                src={partner.logo}
                alt={partner.name}
                className="h-9 md:h-11 w-auto max-w-none object-contain opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- ACTIVE PROJECTS SECTION --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <div className="flex flex-col items-start space-y-4 mb-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-[0.2em]">
              <Building2 className="w-4 h-4" />
              {t('partner.activeCooperation', { defaultValue: 'Kerja Sama Aktif' })}
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              {t('partner.largeScaleCollab', { defaultValue: 'Kolaborasi Industri Skala Besar' })}
            </h2>
            <p className="text-slate-500 font-medium text-base md:text-lg">
              {t('partner.largeScaleCollabDesc', { defaultValue: 'Daftar entitas dan pengerjaan proyek berjalan yang memercayakan standardisasi produksinya kepada infrastruktur manufaktur kami.' })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {MAJOR_PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: smoothEase }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="bg-white/80 backdrop-blur-md border border-slate-200/60 overflow-hidden group hover:border-red-500/30 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)] h-full flex flex-col rounded-[2.2rem]">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    
                    <div className="relative h-44 bg-slate-50/50 flex items-center justify-center p-10 overflow-hidden border-b border-slate-100">
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                      </div>
                      
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-center">
                      <div className="space-y-1 text-center">
                        <h3 className="font-black text-slate-900 text-lg group-hover:text-red-600 transition-colors">{partner.name}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t('partner.projectId', { defaultValue: 'Project ID' })}: PRT-24-{100 + index}</p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ORDER FLOW SECTION DENGAN BACKGROUND --- */}
      <OrderFlow bgImage="/background.png" />

      {/* --- CTA SECTION --- */}
      <QuoteForm />
    </div>
  );
}
