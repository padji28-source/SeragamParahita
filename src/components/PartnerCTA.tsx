import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

export default function PartnerCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-32 relative z-10 overflow-hidden bg-white">
      {/* Decorative background bubbles */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/50 rounded-full blur-3xl -mr-96 -mt-96 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -ml-64 -mb-64 -z-10" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group bg-white rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-slate-900 shadow-2xl border border-slate-100"
        >
          {/* Background Texture Overlay */}
          <div 
            className="absolute inset-0 z-0 opacity-5 mix-blend-multiply bg-cover bg-center pointer-events-none" 
            style={{ backgroundImage: "url('/bg2.png')" }}
          />
          
          {/* Additional Ambient Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05),transparent_70%)]" />
            
            {/* Internal Dynamic Glows */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
          </div>
          
          <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-6 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-black uppercase tracking-[0.3em]"
              >
                {t('partner.getStarted')}
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900">
                {t('partner.readyToScale')}{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-600">
                  {t('partner.yourProduction')}
                </span>
              </h2>
            </div>
            
            <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              {t('partner.joinNetwork')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <motion.a 
                href="https://wa.me/6282125478346" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn px-12 py-6 bg-red-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 transition-all duration-300 shadow-2xl shadow-red-600/20"
              >
                {t('partner.becomePartner')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
