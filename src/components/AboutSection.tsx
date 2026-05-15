import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Download, Target, Rocket, ArrowRight, Minus, PlayCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');
  const [showMoreStory, setShowMoreStory] = useState(false);

  return (
    <div className="relative bg-white text-slate-900 selection:bg-red-100 font-sans overflow-hidden">
      <section className="container mx-auto px-6 md:px-12 py-20 lg:py-32 max-w-7xl flex flex-col gap-20 lg:gap-32">
        
        {/* --- BAGIAN 1: Cerita & Statistik (Bento Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="flex items-center gap-3 text-red-600 font-semibold tracking-wider uppercase text-sm">
                <Minus className="w-6 h-6" /> Tentang Kami
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                {t('about.story.title')}
              </h2>
            </div>
            
            <div className="space-y-5 text-slate-600 text-base md:text-lg leading-relaxed">
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
                download="Company Profile MKS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white font-medium h-12 md:h-14 px-8 rounded-full transition-all duration-300 group shadow-lg shadow-slate-900/20 hover:shadow-red-600/30"
              >
                <span>Unduh Profil</span>
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              </a>

              <button
                onClick={() => setShowMoreStory(!showMoreStory)}
                className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-red-600 transition-colors group"
              >
                {showMoreStory ? "Tutup Cerita" : "Baca Selengkapnya"}
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showMoreStory ? '-rotate-45' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 bg-slate-50 rounded-[2rem] p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-slate-100 group">
              <div className="text-7xl md:text-8xl font-black text-red-600 mb-2 tracking-tighter group-hover:scale-105 transition-transform duration-500">
                15+
              </div>
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest">
                Tahun Pengalaman
              </h3>
              <p className="text-slate-500 font-medium mt-2">
                Berdedikasi memberikan kualitas terbaik.
              </p>
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-slate-100 group">
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 group-hover:text-red-600 transition-colors">50k+</div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kapasitas/Bln</p>
            </div>
            
            <div className="bg-slate-50 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-slate-100 group">
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 group-hover:text-red-600 transition-colors">200+</div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tenaga Ahli</p>
            </div>
          </motion.div>
        </div>

        {/* --- BAGIAN 2: Visi & Misi --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden flex flex-col items-center border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
          
          <div className="relative z-10 flex p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-slate-200 shadow-sm w-max mb-12 md:mb-16">
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
                      className="bg-white border border-slate-100 hover:border-red-200 hover:shadow-md p-6 md:p-8 rounded-[1.5rem] flex items-start gap-5 group transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                      </div>
                      <p className="text-slate-600 group-hover:text-slate-900 font-medium leading-relaxed text-base md:text-lg transition-colors pt-1">
                        {misi}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* --- BAGIAN 3: Video Interaktif (Cinematic Upgrade) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto relative group"
        >
          {/* Ambilight Background Glow */}
          <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-red-600/30 via-transparent to-slate-500/30 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 ring-1 ring-slate-800/50 shadow-2xl z-10">
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

            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Overlay Content / Badge */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 pointer-events-none flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {/* Ping Animation Indicator */}
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/80">
                  Fasilitas Produksi
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
                Di Balik Layar Kami
              </h3>
            </div>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
