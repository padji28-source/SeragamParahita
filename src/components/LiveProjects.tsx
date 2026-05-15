import { useRef } from "react";
import { MAJOR_PARTNERS } from "@/src/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";

export default function LiveProjects() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-24 lg:py-32 bg-slate-50 border-y border-slate-200 overflow-hidden font-sans">
      
      {/* Background Image (bg2.png) dengan efek Parallax & Overlay Premium */}
      <div 
        className="absolute inset-0 z-0 opacity-15 mix-blend-multiply bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/bg2.png')" }}
      />
      {/* Gradient Overlay untuk meredupkan background agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/60 to-slate-50/90 z-0" />
      
      {/* Ambient Glow Latar Belakang */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center mb-16 gap-4 text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(220,38,38,0.1)] mb-2">
            <Activity className="w-4 h-4 animate-pulse" />
            {t('partner.liveProduction')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight drop-shadow-sm">
            {t('partner.activeStatus')}
          </h2>
          <p className="text-slate-600 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto font-medium">
            {t('partner.monitoring')}
          </p>
        </motion.div>

        {/* Carousel Dashboard Section */}
        <div className="relative px-0 sm:px-4 lg:px-12">
          <Carousel 
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6 py-8">
              {MAJOR_PARTNERS.map((partner, index) => (
                <CarouselItem key={partner.id} className="pl-4 sm:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    {/* Glassmorphism Card */}
                    <div className="flex flex-col h-full p-4 md:p-5 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-slate-200 hover:bg-white hover:border-red-400 transition-all duration-500 group shadow-lg hover:shadow-[0_10px_40px_rgba(220,38,38,0.1)] relative overflow-hidden">
                      
                      {/* Logo Container (White box to preserve brand colors) */}
                      <div className="w-full aspect-[4/3] rounded-[1.25rem] overflow-hidden mb-6 relative bg-white flex items-center justify-center p-6 shadow-inner ring-4 ring-slate-100">
                        
                        {/* Live Badge */}
                        <Badge className="absolute top-3 right-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 shadow-sm flex items-center gap-1.5 z-20 px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          {partner.status}
                        </Badge>

                        {/* Subtle Grid overlay for texture inside logo box */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                        
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Progress */}
                      <div className="w-full px-2 flex flex-col flex-1">
                        <h3 className="text-slate-900 text-sm md:text-base font-bold tracking-wider mb-5 line-clamp-1">
                          {partner.name}
                        </h3>
                        
                        <div className="space-y-3 mt-auto">
                          <div className="flex justify-between items-end">
                            <span className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">Progress Produksi</span>
                            <span className="text-lg font-black text-slate-800">{partner.progress}%</span>
                          </div>
                          
                          {/* Progress Bar with Glow */}
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${partner.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full relative"
                            >
                              {/* Shimmer effect inside progress bar */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Styled Navigation Arrows */}
            <CarouselPrevious className="hidden lg:flex -left-6 border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-500 hover:text-white hover:bg-red-600 hover:border-red-600 shadow-xl h-14 w-14 [&>svg]:w-6 [&>svg]:h-6 transition-all duration-300" />
            <CarouselNext className="hidden lg:flex -right-6 border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-500 hover:text-white hover:bg-red-600 hover:border-red-600 shadow-xl h-14 w-14 [&>svg]:w-6 [&>svg]:h-6 transition-all duration-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
