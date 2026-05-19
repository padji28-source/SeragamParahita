import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Download, Target, Rocket, ArrowRight, Minus, PlayCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');
  const [showMoreStory, setShowMoreStory] = useState(false);

  return (
    // Menggunakan bg-transparent agar background utama halaman tidak tertutup
    <div className="relative bg-transparent text-slate-900 selection:bg-red-100 font-sans overflow-hidden">
      
      {/* Container Utama */}
      <section className="relative z-10 container mx-auto px-6 md:px-12 py-20 lg:py-32 max-w-7xl flex flex-col gap-20 lg:gap-32">
        
        {/* --- BAGIAN 1: Cerita & Statistik (Bento Glassmorphism Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="flex items-center gap-3 text-red-600 font-bold tracking-[0.2em] uppercase text-sm">
                <Minus className="w-6 h-6" /> {t('nav.about')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                {t('about.story.title')}
              </h2>
            </div>
            
            <div className="space-y-6 text-slate-800 text-lg md:text-xl font-medium leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p1') }} />
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

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a 
                href="/company-profile.pdf" 
                download="Compro-Parahita-Garment.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white font-semibold h-12 md:h-14 px-8 rounded-full transition-all duration-300 group shadow-lg shadow-slate-900/20 hover:shadow-red-600/30"
              >
                <span>Unduh Profil</span>
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              </a>

              <button
                onClick={() => setShowMoreStory(!showMoreStory)}
                className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors group"
              >
                {showMoreStory ? "Tutup Cerita" : "Baca Selengkapnya"}
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showMoreStory ? '-rotate-45' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </motion.div>

          {/* Stats Cards dengan Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {/* Card Besar */}
            <div className="col-span-2 bg-white/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/60 hover:shadow-xl border border-white/60 group">
              <div className="text-7xl md:text-8xl font-black text-red-600 mb-2 tracking-tighter group-hover:scale-105 transition-transform duration-500">
                15+
              </div>
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest">
                Tahun Pengalaman
              </h3>
              <p className="text-slate-600 font-semibold mt-2">
                Berdedikasi memberikan kualitas terbaik.
              </p>
            </div>

            {/* Card Kecil 1 */}
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/60 hover:shadow-md border border-white/60 group">
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 group-hover:text-red-600 transition-colors">50k+</div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Kapasitas/Bln</p>
            </div>
            
            {/* Card Kecil 2 */}
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/60 hover:shadow-md border border-white/60 group">
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 group-hover:text-red-600 transition-colors">200+</div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tenaga Ahli</p>
            </div>
          </motion.div>
        </div>

        {/* --- BAGIAN 2: Visi & Misi (Glass Container) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-white/50 backdrop-blur-lg rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden flex flex-col items-center border border-white/80 shadow-lg"
        >
          {/* Efek Cahaya Ambient Lembut */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
          
          {/* Tab Filter */}
          <div className="relative z-10 flex p-1.5 bg-white/90 backdrop-blur-md rounded-full border border-slate-200 shadow-sm w-max mb-12 md:mb-16">
            {(['vision', 'mission'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 md:px-12 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-300 outline-none ${
                  activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-red-600 rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === 'vision' ? <Target className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
                  {tab === 'vision' ? t('about.vision') : t('about.mission')}
                </span>
              </button>
            ))}
          </div>

          {/* Konten Tab */}
          <div className="relative z-10 w-full max-w-5xl min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'vision' && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center h-full pt-8 pb-12"
                >
                  <Target className="w-16 h-16 text-red-500 mb-8" />
                  <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-800 max-w-4xl">
                    "{t('about.visionStatement')}"
                  </p>
                </motion.div>
              )}

              {activeTab === 'mission' && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                >
                  {((Array.isArray(t('about.missionStatements', { returnObjects: true })) 
                    ? t('about.missionStatements', { returnObjects: true }) 
                    : []) as string[]).map((misi, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white/80 border border-white/60 hover:border-red-200 hover:bg-white hover:shadow-md p-6 md:p-8 rounded-[1.5rem] flex items-start gap-5 group transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                      </div>
                      <p className="text-slate-700 group-hover:text-slate-900 font-semibold leading-relaxed text-base md:text-lg transition-colors pt-1">
                        {misi}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* --- BAGIAN 3: Video Interaktif (Seamless Integration) --- */}
      <section className="relative w-full py-24 lg:py-32 bg-white/20 backdrop-blur-sm border-t border-white/30 overflow-hidden">
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
          
          {/* Header Video */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-[0.2em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live Preview
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Fasilitas Produksi Kami
            </h2>
          </motion.div>

          {/* Video Player */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto relative group"
          >
            {/* Glow Latar Belakang Frame */}
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-red-600/30 via-slate-500/10 to-blue-600/20 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden ring-1 ring-white/80 shadow-2xl z-10 p-2 md:p-3 backdrop-blur-md bg-white/60">
              
              {/* Inner Frame */}
              <div className="relative w-full h-full rounded-[1rem] md:rounded-[1.5rem] overflow-hidden bg-slate-900">
                {/* Loading Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 pointer-events-none">
                  <PlayCircle className="w-12 h-12 text-slate-700 animate-pulse" />
                </div>

                {/* Video Iframe */}
                <iframe
                  className="absolute inset-0 w-full h-full scale-[1.02] transition-transform duration-700 group-hover:scale-100"
                  src="https://www.youtube.com/embed/iKVxh4JNqgo?autoplay=1&mute=1&loop=1&playlist=iKVxh4JNqgo&controls=0&rel=0&modestbranding=1"
                  title="Parahita Production Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>

                {/* Overlay Halus */}
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
