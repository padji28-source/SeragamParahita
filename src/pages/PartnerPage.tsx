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
  Search
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MajorPartner } from "../types";
import { useTranslation } from "react-i18next";

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
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('partner.benefits.quality.title') || "Quality Assurance",
      description: t('partner.benefits.quality.desc') || "Rigorous multi-stage quality control to ensure every garment meets international standards."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('partner.benefits.fast.title') || "Fast Turnaround",
      description: t('partner.benefits.fast.desc') || "Optimized production lines and supply chain management for rapid delivery cycles."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('partner.benefits.scalable.title') || "Scalable Production",
      description: t('partner.benefits.scalable.desc') || "Flexible manufacturing capacity that grows with your business demands."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('partner.benefits.tracking.title') || "Real-time Tracking",
      description: t('partner.benefits.tracking.desc') || "Full transparency with live monitoring of your project's production efficiency."
    }
  ];

  const testimonials = [
    {
      quote: "Parahita has been our go-to partner for years. Their attention to detail and commitment to deadlines is unmatched in the industry.",
      author: "Operations Manager",
      company: "Major Retail Chain",
      avatar: "https://picsum.photos/seed/person1/100/100"
    },
    {
      quote: "The real-time tracking feature changed how we manage our inventory. We always know exactly where our orders are in the production line.",
      author: "Procurement Lead",
      company: "National Energy Corp",
      avatar: "https://picsum.photos/seed/person2/100/100"
    }
  ];

  const steps = [
    { title: "Inquiry", desc: "Send us your requirements and design concepts." },
    { title: "Sampling", desc: "We create prototypes for your approval." },
    { title: "Production", desc: "Mass production with real-time tracking." },
    { title: "Delivery", desc: "Quality-checked products delivered to your doorstep." }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Partners Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-600/30 text-red-400 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <HeartHandshake className="w-3 h-3" />
            {t('partner.strategicPartnerships') || 'Strategic Partnerships'}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-xl"
          >
            {t('partner.title')} <span className="text-red-600">Partners</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-medium"
          >
            {t('partner.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Partner Logo Grid */}
      <section className="py-24 border-b border-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
              {t('partner.distinguished')}
            </h2>
          </div>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex items-center space-x-16 animate-marquee min-w-max pr-16 hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
              <img
                key={`${partner.name}-${index}`}
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-14 w-auto max-w-none object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Active Projects Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center justify-center gap-2 text-red-600 font-bold tracking-widest uppercase text-sm mb-3">
                <Activity className="w-4 h-4 animate-pulse" />
                {t('partner.liveProduction')}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{t('partner.activeStatus')}</h2>
              <p className="text-gray-500 mt-4 text-lg leading-relaxed mx-auto">
                {t('partner.monitoring')}
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm inline-block">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{t('partner.capacity')}</p>
              <p className="text-2xl font-bold text-gray-900">94.2% <span className="text-xs text-green-500 ml-1 font-bold">▲ 2.1%</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {MAJOR_PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-gray-100 overflow-hidden group hover:border-red-600/30 transition-all duration-500 shadow-xl hover:shadow-2xl h-full flex flex-col rounded-[2rem]">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="relative h-44 bg-gray-50 flex items-center justify-center p-10 overflow-hidden border-b border-gray-50">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                      </div>
                      
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100 flex items-center gap-1.5 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          {partner.status}
                        </div>
                      </div>
                    </div>

                    <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-1">{partner.name}</h3>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t('partner.projectId')}: PRT-24-{100 + index}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">{t('partner.efficiency')}</span>
                          <span className="text-2xl font-black text-gray-900">{partner.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${partner.progress}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedPartner(partner)}
                        className="w-full py-4 mt-4 rounded-2xl bg-gray-900 hover:bg-red-600 text-white text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-gray-900/10 hover:shadow-red-600/20"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {t('partner.trackOrder')}
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

      {/* Partnership Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap className="w-3 h-3" />
              {t('partner.howItWorks')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('partner.simpleProcess')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('partner.simpleProcessDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gray-200 -ml-4 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center text-xl font-black text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('partner.whyPartner')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('partner.whyPartnerDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-red-600/20 transition-all duration-300 group shadow-sm hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-red-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-50 transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <MessageSquare className="w-3 h-3" />
              {t('partner.feedback')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('partner.successStories')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-10 rounded-[3rem] relative border border-gray-100"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-red-600/10" />
                <p className="text-lg text-gray-700 italic mb-8 relative z-10 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                  <div>
                    <div className="font-bold text-gray-900">{t.author}</div>
                    <div className="text-xs text-red-600 font-bold uppercase tracking-widest">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 blur-[100px] rounded-full -ml-48 -mb-48" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                {t('partner.readyToScale')} <br /> <span className="text-red-600">{t('partner.yourProduction')}</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg mb-12">
                {t('partner.joinNetwork')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-red-600/20 hover:scale-105">
                  {t('partner.becomePartner')}
                </button>
                <button className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/10">
                  {t('partner.viewCaseStudies')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Modal */}
      <Dialog open={!!selectedPartner} onOpenChange={(open) => !open && setSelectedPartner(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
          {selectedPartner && (
            <div className="flex flex-col">
              <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full -mr-32 -mt-32" />
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-20 h-20 bg-white rounded-2xl p-4 flex items-center justify-center shadow-xl">
                    <img 
                      src={selectedPartner.logo} 
                      alt={selectedPartner.name} 
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedPartner.name}</h2>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{t('partner.projectId')}: PRT-24-{100 + MAJOR_PARTNERS.indexOf(selectedPartner)}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-gray-900">{t('partner.productionTimeline')}</h3>
                  <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                    <Activity className="w-4 h-4 animate-pulse" />
                    {t('partner.liveStatus')}
                  </div>
                </div>

                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[26px] top-2 bottom-2 w-0.5 bg-gray-100" />
                  
                  {getTrackingSteps(selectedPartner.progress).map((step, idx) => (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className="flex gap-6 relative z-10"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-lg ${
                        step.status === "completed" 
                          ? "bg-red-600 text-white shadow-red-600/20" 
                          : step.status === "current"
                          ? "bg-white border-2 border-red-600 text-red-600 shadow-red-600/10"
                          : "bg-gray-50 text-gray-300 border border-gray-100"
                      }`}>
                        {step.status === "completed" ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                      </div>
                      <div className="flex-1 pt-2">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-bold ${step.status === "upcoming" ? "text-gray-400" : "text-gray-900"}`}>
                            {step.title}
                          </h4>
                          {step.status === "current" && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-2 py-1 rounded-md">
                              {t('partner.processing')}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {step.status === "completed" 
                            ? t('partner.completedDesc') 
                            : step.status === "current"
                            ? `${t('partner.currentDesc')} ${selectedPartner.progress}%.`
                            : t('partner.upcomingDesc')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('partner.estDelivery')}</p>
                        <p className="font-bold text-gray-900">24 Okt 2024</p>
                      </div>
                    </div>
                    <button className="text-red-600 font-bold text-sm hover:underline">
                      {t('partner.viewDetails')}
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
