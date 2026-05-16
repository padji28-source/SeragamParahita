import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MessageSquare, Microscope, Factory, Truck, ArrowRight } from "lucide-react";

export default function SimpleProcess() {
  const { t } = useTranslation();

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
    <section className="py-24 relative z-10 bg-slate-50/50">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              {t('partner.howItWorks')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              {t('partner.simpleProcess')}
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
              {t('partner.simpleProcessDesc')}
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="bg-white rounded-[2.5rem] p-8 h-full border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-8 group-hover:bg-red-600 transition-colors duration-300">
                    {step.icon}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-red-600/40 tracking-widest uppercase">Step 0{index + 1}</span>
                      <div className="h-[1px] flex-1 bg-slate-100" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase group-hover:text-red-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-300 group-hover:text-red-500 group-hover:border-red-200 transition-colors z-20">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
