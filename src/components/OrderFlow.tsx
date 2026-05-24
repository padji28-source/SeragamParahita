import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { FileText, Layers, Settings, Scissors, CheckCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface OrderFlowProps {
  bgImage?: string; // Menambahkan prop opsional untuk background gambar
}

export default function OrderFlow({ bgImage = "/bg2.png" }: OrderFlowProps) {
  const { t } = useTranslation();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const steps = [
    { icon: <FileText />, title: t('orderFlow.steps.step1.title'), desc: t('orderFlow.steps.step1.desc'), bg: "bg-blue-600", image: "/pattern.jpg" },
    { icon: <Scissors />, title: t('orderFlow.steps.step2.title'), desc: t('orderFlow.steps.step2.desc'), bg: "bg-orange-600", image: "/cutting.jpg" },
    { icon: <Sparkles />, title: t('orderFlow.steps.step3.title'), desc: t('orderFlow.steps.step3.desc'), bg: "bg-purple-600", images: ["/sablon.jpg", "/bordir.jpg"] },
    { icon: <Settings />, title: t('orderFlow.steps.step4.title'), desc: t('orderFlow.steps.step4.desc'), bg: "bg-indigo-600", image: "/jahit2.jpg" },
    { icon: <CheckCircle />, title: t('orderFlow.steps.step5.title'), desc: t('orderFlow.steps.step5.desc'), bg: "bg-green-600", image: "/qc1.jpg" },
    { icon: <Layers />, title: t('orderFlow.steps.step6.title'), desc: t('orderFlow.steps.step6.desc'), bg: "bg-slate-600", image: "/packing.jpg" }
  ];

  return (
    <section ref={sectionRef} id="order-flow" className="relative w-full overflow-hidden bg-transparent py-24 lg:py-32">
      {/* Background Dinamis menggunakan prop bgImage */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          y: bgY,
          height: "140%"
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase">{t('orderFlow.howToOrder', { defaultValue: 'HOW TO ORDER' })}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            {t('orderFlow.title', { defaultValue: 'Alur Produksi Kami' })}
          </motion.h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
            {t('orderFlow.subtitle', { defaultValue: 'Standar operasional terukur untuk memastikan kualitas produk dari hulu ke hilir.' })}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 text-[10rem] font-black text-slate-900/5 group-hover:text-red-600/5 transition-colors pointer-events-none select-none">
                {index + 1}
              </div>

              <div className="flex flex-col h-full relative z-10">
                <div className="relative mb-8 pt-4">
                  <div className="overflow-hidden rounded-[2rem] aspect-[4/3] shadow-lg bg-slate-800">
                    {step.images ? (
                      <div className="grid grid-cols-2 h-full gap-1">
                        {step.images.map((img, i) => (
                          <img key={i} src={img} alt={`${step.title} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                        ))}
                      </div>
                    ) : (
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    )}
                  </div>
                  <div className={cn("absolute -bottom-4 left-8 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/10 ring-4 ring-white", step.bg)}>
                    {React.cloneElement(step.icon, { size: 24 })}
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="text-red-600 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-red-600" />
                    Tahap {index + 1}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">{step.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
