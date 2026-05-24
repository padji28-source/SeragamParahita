import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { CheckCircle2, Download, Target, Rocket, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const [showMoreStory, setShowMoreStory] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    // Menggunakan bg-white sebagai warna dasar utama
    <div className="relative bg-white text-slate-700 selection:bg-red-100 font-sans overflow-hidden">
      
      {/* 1. BAGIAN CERITA (Background Putih Bersih) */}
      <section className="relative z-10 container mx-auto px-8 md:px-12 py-20 lg:py-32 max-w-7xl flex flex-col gap-20 lg:gap-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Kolom Kiri: Konten Teks */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="h-[2px] w-12 bg-red-600" />
                 <span className="text-red-600 font-black tracking-[0.3em] uppercase text-xs">
                    {t('nav.about')}
                 </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[1] text-slate-900 uppercase">
                {t('about.story.title')}
              </h2>
            </div>
            
            <div className="relative space-y-6 text-slate-600 text-lg md:text-xl font-medium leading-relaxed italic border-l-2 border-slate-100 pl-8">
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p1') }} className="first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left" />
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p2') }} />
              
              <AnimatePresence>
                {showMoreStory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-5 overflow-hidden"
                  >
                    <p dangerouslySetInnerHTML={{ __html: t('about.story.p3') }} />
                    <p dangerouslySetInnerHTML={{ __html: t('about.story.p4') }} />
                    <p dangerouslySetInnerHTML={{ __html: t('about.story.p5') }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <a 
                href="/company-profile.pdf" 
                className="group relative inline-flex items-center gap-3 bg-slate-900 text-white font-bold h-14 px-10 rounded-2xl transition-all duration-300 overflow-hidden shadow-xl shadow-slate-900/20"
              >
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{t('about.downloadProfile')}</span>
                <Download className="relative z-10 w-5 h-5 transition-transform group-hover:-translate-y-1" />
              </a>

              <button
                onClick={() => setShowMoreStory(!showMoreStory)}
                className="flex items-center gap-3 text-slate-900 font-black uppercase text-sm tracking-widest hover:text-red-600 transition-colors group"
              >
                {showMoreStory ? t('about.closeStory') : t('about.readMore')}
                <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-red-600 transition-colors">
                    <ArrowRight className={`w-4 h-4 transition-transform duration-500 ${showMoreStory ? '-rotate-45' : 'group-hover:translate-x-1'}`} />
                </div>
              </button>
            </div>
          </motion.div>

          {/* Kolom Kanan: Stats Cards (Clean Style) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 relative bg-slate-50 rounded-[3rem] p-10 md:p-14 border border-slate-100 text-center group">
                <div className="text-8xl md:text-9xl font-black text-slate-900 mb-2 tracking-tighter inline-block">
                  15<span className="text-red-600">+</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-[0.2em] mb-3">{t('about.stats.experience')}</h3>
                <p className="text-slate-500 font-bold max-w-[200px] mx-auto text-sm leading-relaxed">{t('about.stats.dedication')}</p>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 text-center">
                <div className="text-4xl font-black text-red-600 mb-2">50k+</div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('about.stats.capacity')}</p>
              </div>
              
              {/* Diubah dari bg-slate-900 ke bg-red-600 agar tetap bold tapi senada */}
              <div className="bg-red-600 rounded-[2.5rem] p-8 shadow-xl shadow-red-600/20 text-center">
                <div className="text-4xl font-black text-white mb-2">200+</div>
                <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">{t('about.stats.workers')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     {/* --- BAGIAN 2: Visi & Misi (Refactored) --- */}
<section ref={sectionRef} className="relative w-full overflow-hidden min-h-[65vh] lg:min-h-[75vh] flex items-center py-20 lg:py-32 bg-transparent">
  
  {/* 1. Optimized Parallax Background with Extra Scale */}
  <div className="absolute inset-0 z-0">
    <motion.div 
      style={{ 
        y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
        scale: 1.15,
        willChange: "transform"
      }}
      className="absolute inset-0 w-full h-[140%]"
    >
      <div 
        className="h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/product-1.jpg)',
          backgroundSize: 'cover'
        }}
      />
      {/* Overlay Gelap Asli untuk Menjaga Keaslian Gambar dengan Kontras Teks Ekstrem */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950/85 backdrop-blur-[1.5px]" />
    </motion.div>
  </div>

  {/* 2. Floating Decorative Icon */}
  <motion.div 
    style={{ 
      y: useTransform(scrollYProgress, [0, 1], [120, -120]),
      rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
      willChange: "transform"
    }}
    className="absolute top-10 right-[-2%] z-0 hidden lg:block opacity-[0.05] pointer-events-none"
  >
    <Target className="w-96 h-96 text-white" />
  </motion.div>

  <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
      
      {/* --- Vision Box --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="lg:col-span-5 h-full"
      >
        <div className="h-full bg-white/10 hover:bg-white/15 backdrop-blur-xl rounded-[2rem] p-10 lg:p-12 border border-white/15 shadow-2xl relative overflow-hidden group transition-all duration-500">
          
          {/* Elemen Dekoratif Kutipan Belakang */}
          <span className="absolute -top-6 -right-2 text-[12rem] font-serif leading-none text-white/[0.06] group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none">
            "
          </span>

          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-8 shadow-lg shadow-red-500/30">
              <Target className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xs font-black text-red-400 tracking-[0.3em] uppercase mb-4">
              {t('about.vision')}
            </h3>
            
            <p className="text-2xl lg:text-3xl font-black text-white leading-tight">
              {t('about.visionStatement')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* --- Mission Box --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="lg:col-span-7 h-full"
      >
        <div className="h-full bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-10 lg:p-12 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-5 mb-10 pb-6 border-b border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm">
              <Rocket className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {t('about.mission')}
              </h3>
              <p className="text-slate-300 font-medium mt-1">Langkah nyata kami untuk mencapai visi</p>
            </div>
          </div>

          {/* Staggered Animation Container */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
          >
            {((Array.isArray(t('about.missionStatements', { returnObjects: true })) 
              ? t('about.missionStatements', { returnObjects: true }) 
              : []) as string[]).map((misi, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 group cursor-default"
              >
                <div className="mt-0.5 bg-red-500/10 border border-red-500/20 rounded-full p-1 group-hover:bg-red-600 transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-red-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-slate-200 font-bold text-base leading-snug group-hover:text-white transition-colors duration-300">
                  {misi}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
    </div>
  </div>
</section>
    </div>
  );
}
