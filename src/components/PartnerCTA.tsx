import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles } from "lucide-react";

// Variabel untuk animasi berurutan (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

export default function PartnerCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-transparent min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center text-slate-900 shadow-2xl shadow-slate-200/50"
        >
          {/* Internal Dynamic Glows - Animated Pulsing */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-red-400/20 blur-[100px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-amber-400/20 blur-[100px] rounded-full" 
            />
          </div>

          {/* Grid Pattern Overlay untuk kesan modern/profesional */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', 
              backgroundSize: '32px 32px' 
            }} 
          />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 space-y-8 md:space-y-10 max-w-3xl mx-auto"
          >
            <div className="space-y-6">
              {/* Badge dengan icon Sparkles */}
              <motion.div variants={itemVariants} className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-50/80 backdrop-blur-sm border border-red-100/50 text-red-600 text-xs md:text-sm font-black uppercase tracking-[0.2em] shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  {t('partner.getStarted')}
                </div>
              </motion.div>
              
              {/* Title dengan gradient text */}
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                {t('partner.readyToScale')}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                  {t('partner.yourProduction')}
                </span>
              </motion.h2>
            </div>
            
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              {t('partner.joinNetwork')}
            </p>

            {/* Button dengan efek premium */}
            <motion.div variants={itemVariants} className="flex justify-center pt-4">
              <motion.a 
                href="https://wa.me/6282125478346" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group/btn px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.15em] text-xs md:text-sm flex items-center gap-3 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-red-500/30 hover:bg-red-600"
              >
                {/* Efek Shine/Kilau pada tombol saat dihover */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                
                <span className="relative z-10">{t('partner.becomePartner')}</span>
                <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
