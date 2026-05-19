import { MAJOR_PARTNERS, PARTNERS } from "../constants";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  HeartHandshake, 
  Minus
} from "lucide-react";
import { useTranslation } from "react-i18next";
import OrderFlow from "../components/OrderFlow";
import QuoteForm from "../components/QuoteForm";

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
      <section className="relative h-[600px] lg:h-[650px] flex items-center overflow-hidden z-10">
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Partners Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              {t('partner.strategicPartnerships') || 'Strategic Partnerships'}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15]"
            >
              {t('partner.title')} <span className="text-red-500">Partners</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed"
            >
              {t('partner.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- TRUSTED BY / MARQUEE LOGO --- */}
      <section className="py-16 relative z-10 -mt-12">
        <div className="container mx-auto px-6 max-w-7xl mb-8">
          <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
            <Minus className="w-5 h-5 text-red-500" /> {t('partner.distinguished') || "Distinguished Partners"}
          </div>
        </div>
        
        {/* Infinite Slider dengan Gradient Fade Out Kiri-Kanan */}
        <div className="relative w-full flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-slate-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-slate-50 after:to-transparent">
          <div className="flex items-center space-x-20 animate-marquee min-w-max pr-20 hover:[animation-play-state:paused] py-4">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
              <img
                key={`${partner.name}-${index}`}
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 w-auto max-w-none object-contain opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- ACTIVE PROJECTS SECTION --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          {/* Grid Major Partners */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {MAJOR_PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/80 backdrop-blur-md border border-slate-200/60 overflow-hidden group hover:border-red-500/30 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(239,68,68,0.08)] h-full flex flex-col rounded-[2.2rem]">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    
                    {/* Top Content (Logo & Badge) */}
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
                      
                      <div className="absolute top-4 right-4">
                        <div className="bg-white border border-slate-100 text-slate-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm group-hover:border-green-200 group-hover:text-green-600 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          {partner.status}
                        </div>
                      </div>
                    </div>

                    {/* Card Description */}
                    <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-center">
                      <div className="space-y-1 text-center">
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-600 transition-colors">{partner.name}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t('partner.projectId') || "Project ID"}: PRT-24-{100 + index}</p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* --- ORDER FLOW SECTION (Moved from Home) --- */}
      <OrderFlow />

      {/* --- CTA SECTION (Swapped with Home) --- */}
      <QuoteForm />
    </div>
  );
}
