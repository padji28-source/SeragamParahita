import { motion, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import { MessageSquare, Microscope, Factory, Truck, ChevronRight } from "lucide-react";
import { useRef } from "react";

// Varian untuk animasi berurutan (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function SimpleProcess() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const steps = [
    { 
      icon: <MessageSquare className="w-6 h-6" />, 
      title: t('partner.steps.inquiry'), 
      desc: t('partner.steps.inquiryDesc')
    },
    { 
      icon: <Microscope className="w-6 h-6" />, 
      title: t('partner.steps.sampling'), 
      desc: t('partner.steps.samplingDesc')
    },
    { 
      icon: <Factory className="w-6 h-6" />, 
      title: t('partner.steps.production'), 
      desc: t('partner.steps.productionDesc')
    },
    { 
      icon: <Truck className="w-6 h-6" />, 
      title: t('partner.steps.delivery'), 
      desc: t('partner.steps.deliveryDesc')
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden min-h-[65vh] lg:min-h-[75vh] flex items-center bg-transparent w-full">
      
      {/* 1. Optimized Parallax Background with Extra Scale */}
      <div className="absolute inset-0 z-0 text-white">
        <motion.div 
          style={{ 
            y: bgY,
            scale: 1.15,
            willChange: "transform"
          }}
          className="absolute inset-x-0 top-0 w-full h-[140%]"
        >
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/product-1.jpg)',
              backgroundSize: 'cover'
            }}
          />
          {/* Transparent dark overlay to reveal original image texture while keeping content readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/85 backdrop-blur-[1px]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 w-full">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-red-500 text-xs font-black uppercase tracking-[0.25em] shadow-sm backdrop-blur-md">
            {t('partner.howItWorks')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
            {t('partner.simpleProcess')}
          </h2>
          <p className="text-white text-lg md:text-xl font-semibold leading-relaxed max-w-2xl mx-auto opacity-90">
            {t('partner.simpleProcessDesc')}
          </p>
        </motion.div>

        {/* --- Cards Section --- */}
        <div className="relative">
          
          {/* Garis Horizontal Animasi (Desktop) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="hidden lg:block absolute top-[3.25rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent origin-left z-0"
          />

          {/* Garis Vertikal Dashed (Mobile & Tablet) */}
          <div className="lg:hidden absolute top-10 bottom-10 left-[3.25rem] w-[2px] border-l-2 border-dashed border-white/10 z-0" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group relative"
              >
                <div className="bg-white/10 hover:bg-white/15 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-9 h-full border border-white/10 shadow-2xl hover:border-red-500/35 transition-all duration-500 lg:group-hover:-translate-y-3 relative overflow-hidden flex flex-col">
                  
                  {/* Watermark Angka Besar di Belakang */}
                  <div className="absolute -right-4 -bottom-4 text-[8rem] font-black text-white/[0.03] select-none group-hover:scale-110 group-hover:text-red-500/[0.05] transition-all duration-700 pointer-events-none">
                    {index + 1}
                  </div>

                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-8 group-hover:bg-red-650 group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4 relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-red-400 tracking-widest uppercase">
                        Step 0{index + 1}
                      </span>
                      <div className="h-[2px] flex-1 bg-white/10 group-hover:bg-red-500/25 transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-red-450 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-300 text-sm leading-relaxed font-semibold mt-auto pt-2">
                      {step.desc}
                    </p>
                  </div>

                  {/* Panah Indikator (Hanya Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-[3.25rem] -right-5 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border border-white/10 items-center justify-center text-slate-400 group-hover:text-red-400 group-hover:border-red-500/30 transition-all duration-500 z-20 shadow-lg">
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
