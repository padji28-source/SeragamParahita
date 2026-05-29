import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles } from "lucide-react";

// Variabel untuk animasi berurutan (Stagger) yang interaktif
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 18 
    } 
  }
};

export default function PartnerCTA() {
  const { t } = useTranslation();

  // Konfigurasi Email
  const emailTo = "seragamparahita01@gmail.com,cs@seragamparahita.com,seragamparahita02@gmail.com";
  const emailSubject = "Pengajuan Kemitraan / Penawaran Produksi - Parahita";
  const emailBody = 
    `Halo Tim Parahita,\r\n\r\n` +
    `Saya tertarik untuk menjalin kemitraan dan ingin mendiskusikan lebih lanjut mengenai penawaran produksi.\r\n\r\n` +
    `Berikut adalah beberapa informasi awal dari kami:\r\n` +
    `- Nama Perusahaan / Instansi : \r\n` +
    `- Jenis Kebutuhan Produksi   : \r\n` +
    `- Estimasi Kuantitas         : \r\n` +
    `- Nomor Kontak (WhatsApp)    : \r\n\r\n` +
    `Mohon informasi lebih lanjut terkait prosedur kemitraan dan penawaran dari Parahita.\r\n\r\n` +
    `Terima kasih.`;

  const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <section className="py-24 relative z-10 bg-white min-h-[50vh] flex items-center overflow-hidden border-t border-slate-100">
      {/* Ambient background decoration with micro slow-float animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div 
          className="absolute -top-12 -left-12 w-96 h-96 bg-red-500/[0.02] rounded-full blur-3xl transform -translate-y-2 translate-x-2"
        />
        <div 
          className="absolute -bottom-12 -right-12 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-3xl transform translate-y-2 -translate-x-2"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8 md:space-y-10 max-w-3xl mx-auto text-center"
        >
          <div className="space-y-6">
            {/* Badge dengan icon Sparkles & Denyut Animasi */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-50 text-red-650 text-xs md:text-sm font-black uppercase tracking-[0.2em] border border-red-100/50 cursor-pointer select-none transition-colors hover:bg-red-100/45"
              >
                <Sparkles className="w-4 h-4 text-red-600 animate-pulse fill-red-600/15" />
                {t('partner.getStarted')}
              </motion.div>
            </motion.div>
            
            {/* Title Minimalis Bersih */}
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 uppercase"
            >
              {t('partner.readyToScale')}{" "}
              <span className="text-red-650 block sm:inline">
                {t('partner.yourProduction')}
              </span>
            </motion.h2>
          </div>
          
          {/* Deskripsi Minimalis */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {t('partner.joinNetwork')}
          </motion.p>

          {/* Button Modern dengan Animasi Hover yang Memikat */}
          <motion.div variants={itemVariants} className="flex justify-center pt-2">
            <motion.a 
              href={mailtoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-3 bg-slate-900 text-white font-bold h-14 px-10 rounded-2xl transition-all duration-300 overflow-hidden shadow-xl shadow-slate-900/20 cursor-pointer select-none"
            >
              {/* Sliding Red Overlay on Hover like Download Profile */}
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              
              <span className="relative z-10">{t('partner.becomePartner')}</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
