import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const benefits = [
    {
      image: "/p3.png",
      title: t('partner.benefits.quality.title'),
      description: t('partner.benefits.quality.desc')
    },
    {
      image: "/p2.png",
      title: t('partner.benefits.fast.title'),
      description: t('partner.benefits.fast.desc')
    },
    {
      image: "/p1.png",
      title: t('partner.benefits.scalable.title'),
      description: t('partner.benefits.scalable.desc')
    }
  ];

  return (
    <section className="py-24 relative z-10 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{t('partner.whyPartner') || "Why Choose Us"}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">{t('partner.whyPartnerDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-full aspect-square mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 group-hover:shadow-red-200/50 transition-all duration-500">
                <img 
                  src={benefit.image} 
                  alt={benefit.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-red-600 transition-colors uppercase tracking-tight">{benefit.title}</h3>
              <p className="text-slate-500 leading-relaxed text-base font-medium">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
