import { useState } from "react";
import { MAJOR_PARTNERS, PARTNERS } from "../constants";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3, 
  HeartHandshake, 
  Quote, 
  MessageSquare,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Scissors,
  Cpu,
  Search,
  Minus
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MajorPartner } from "../types";
import { useTranslation } from "react-i18next";
import OrderFlow from "../components/OrderFlow";

export default function PartnerPage() {
  const { t } = useTranslation();
  const [selectedPartner, setSelectedPartner] = useState<MajorPartner | null>(null);

  const getTrackingSteps = (progress: number) => {
    const steps = [
      { id: 1, title: t('partner.steps.orderReceived') || "Order Received", icon: <Package className="w-5 h-5" />, threshold: 0 },
      { id: 2, title: t('partner.steps.patternCutting') || "Pattern Cutting", icon: <Scissors className="w-5 h-5" />, threshold: 20 },
      { id: 3, title: t('partner.steps.sewing') || "Sewing & Assembly", icon: <Cpu className="w-5 h-5" />, threshold: 50 },
      { id: 4, title: t('partner.steps.qc') || "Quality Control", icon: <Search className="w-5 h-5" />, threshold: 80 },
      { id: 5, title: t('partner.steps.delivery') || "Ready for Delivery", icon: <Truck className="w-5 h-5" />, threshold: 100 },
    ];

    return steps.map(step => ({
      ...step,
      status: progress >= step.threshold ? "completed" : (progress + 20 > step.threshold ? "current" : "upcoming")
    }));
  };

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
          
          {/* Header & Live Capacity Status */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-slate-200 pb-10">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-red-600 font-bold tracking-widest uppercase text-sm">
                <Activity className="w-4 h-4 animate-pulse" />
                {t('partner.liveProduction') || "Live Production"}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                {t('partner.activeStatus') || "Active Monitoring Dashboard"}
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                {t('partner.monitoring')}
              </p>
            </div>
            
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center gap-5 shrink-0 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">{t('partner.capacity') || "Factory Utilization"}</p>
                <p className="text-2xl font-black text-slate-900 flex items-baseline gap-2">
                  94.2% <span className="text-xs text-green-500 font-bold flex items-center">▲ 2.1%</span>
                </p>
              </div>
            </div>
          </div>

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

                    {/* Description & Track Control */}
                    <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-600 transition-colors">{partner.name}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t('partner.projectId') || "Project ID"}: PRT-24-{100 + index}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">{t('partner.efficiency') || "Efficiency Rate"}</span>
                          <span className="text-xl font-black text-slate-900">{partner.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${partner.progress}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_12px_rgba(220,38,38,0.25)]"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedPartner(partner)}
                        className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md shadow-slate-900/10 hover:shadow-red-600/20"
                      >
                        {t('partner.trackOrder') || "Track Live Order"}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ORDER FLOW SECTION (Moved from Home) --- */}
      <OrderFlow />

      {/* --- CTA SECTION --- */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-[#020617] rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-800"
          >
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.15),transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
              
              {/* Dynamic Glows */}
              <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full mix-blend-screen" />
              <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
              
              {/* Image Texture as background */}
              <img 
                src="/Parahitaprimasentosa.png" 
                alt="Texture" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.03] grayscale pointer-events-none"
              />
            </div>
            
            <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-6 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-sm font-black uppercase tracking-[0.3em]"
                >
                  {t('partner.getStarted') || "Partner with us"}
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  {t('partner.readyToScale')}{" "}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-500">
                    {t('partner.yourProduction')}
                  </span>
                </h2>
              </div>
              
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                {t('partner.joinNetwork')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <motion.a 
                  href="https://wa.me/6282125478346" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 40px -10px rgba(220, 38, 38, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn px-12 py-6 bg-red-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 transition-all duration-300 shadow-xl shadow-red-600/20"
                >
                  {t('partner.becomePartner')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- LIVE TRACKING MODAL --- */}
      <Dialog open={!!selectedPartner} onOpenChange={(open) => !open && setSelectedPartner(null)}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-[2.2rem] border-none shadow-2xl bg-white">
          {selectedPartner && (
            <div className="flex flex-col">
              {/* Modal Header */}
              <div className="bg-slate-950 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-5">
                  <div className="w-16 h-16 bg-white rounded-xl p-3 flex items-center justify-center shadow-lg">
                    <img 
                      src={selectedPartner.logo} 
                      alt={selectedPartner.name} 
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold">{selectedPartner.name}</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t('partner.projectId') || "Project ID"}: PRT-24-{100 + MAJOR_PARTNERS.indexOf(selectedPartner)}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 bg-white">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-base font-bold text-slate-900">{t('partner.productionTimeline') || "Production Milestone"}</h3>
                  <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs bg-red-50 border border-red-100 px-2.5 py-1 rounded-md">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    {t('partner.liveStatus') || "Live Status"}
                  </div>
                </div>

                {/* Timeline Steps */}
                <div className="space-y-6 relative">
                  <div className="absolute left-[23px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
                  
                  {getTrackingSteps(selectedPartner.progress).map((step, idx) => (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.2 }}
                      className="flex gap-5 relative z-10"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm border ${
                        step.status === "completed" 
                          ? "bg-red-600 border-red-600 text-white shadow-red-600/10" 
                          : step.status === "current"
                          ? "bg-white border-red-500 text-red-600 shadow-md ring-4 ring-red-50"
                          : "bg-slate-50 text-slate-300 border-slate-100"
                      }`}>
                        {step.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex justify-between items-center mb-0.5">
                          <h4 className={`text-sm font-bold ${step.status === "upcoming" ? "text-slate-400" : "text-slate-900"}`}>
                            {step.title}
                          </h4>
                          {step.status === "current" && (
                            <span className="text-[9px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                              {t('partner.processing') || "In Progress"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          {step.status === "completed" 
                            ? t('partner.completedDesc') || "Milestone completed successfully."
                            : step.status === "current"
                            ? `${t('partner.currentDesc') || "Currently processing at"} ${selectedPartner.progress}%.`
                            : t('partner.upcomingDesc') || "Pending previous pipeline step."}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Estimation Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-100">
                        <Clock className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('partner.estDelivery') || "Est. Delivery"}</p>
                        <p className="text-sm font-bold text-slate-900">24 Okt 2024</p>
                      </div>
                    </div>
                    <button className="text-red-600 font-bold text-xs hover:underline uppercase tracking-wider">
                      {t('partner.viewDetails') || "Details"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
