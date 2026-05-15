import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { 
  CheckCircle2, Download, Target, Rocket, ArrowRight, 
  Minus, PlayCircle, Activity, Users, Sparkles, PhoneCall 
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');
  const [showMoreStory, setShowMoreStory] = useState(false);

  return (
    <div className="relative bg-transparent text-slate-900 selection:bg-red-100 font-sans overflow-hidden">
      
      {/* --- BAGIAN 1 & 2: Cerita, Statistik, Visi & Misi --- */}
      <section className="container mx-auto px-6 md:px-12 py-20 lg:py-32 max-w-7xl flex flex-col gap-20 lg:gap-32">
        
        {/* Cerita & Statistik (Bento Layout) */}
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

        {/* Visi & Misi */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden flex flex-col items-center border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          {/* Ornaments */}
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
      </section>

      {/* --- BAGIAN 3: Cinematic Video & Status Proyek Aktif --- */}
      <section className="relative w-full py-24 lg:py-32 bg-slate-950 overflow-hidden">
        {/* Premium Dark Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/bg2.png')" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Dapur Produksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Terbaik</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Saksikan langsung bagaimana dedikasi dan teknologi berpadu untuk menciptakan produk berkualitas tinggi bagi setiap klien kami.
            </p>
          </motion.div>

          {/* Video Player - Enhanced Cinematic Look */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto relative group z-20"
          >
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-slate-500 to-red-800 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-slate-900 ring-1 ring-white/10 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900 pointer-events-none z-0">
                <PlayCircle className="w-16 h-16 text-slate-700 animate-pulse" />
              </div>
              
              <iframe
                className="absolute inset-0 w-full h-full scale-[1.02] transition-transform duration-700 group-hover:scale-100 z-10"
                src="https://www.youtube.com/embed/iKVxh4JNqgo?autoplay=1&mute=1&loop=1&playlist=iKVxh4JNqgo&controls=0&rel=0&modestbranding=1"
                title="Production Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Status "Live" Overlay on Video */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-white text-xs font-bold tracking-widest uppercase">Live Production</span>
              </div>
            </div>
          </motion.div>

          {/* NEW: Status Proyek Aktif (Floating Ticker Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-4xl mx-auto -mt-10 relative z-30"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Activity className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Status Proyek Aktif</h4>
                  <p className="text-slate-400 text-sm">Update Real-time Hari Ini</p>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto">
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 flex-1 md:flex-none text-center">
                  <div className="text-2xl font-black text-white">48</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Diproses</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 flex-1 md:flex-none text-center">
                  <div className="text-2xl font-black text-white">12</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Antrean</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 flex-1 md:flex-none text-center">
                  <div className="text-2xl font-black text-red-400">98%</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">On-Time</div>
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BAGIAN 4: Wujudkan Seragam Impian Anda (Call to Action) --- */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden"
          >
            {/* Dekorasi Background CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/30 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mb-2">
                <Sparkles className="w-8 h-8 text-red-400" />
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Wujudkan Seragam <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Impian Anda</span> Bersama Kami
              </h2>
              
              <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl">
                Dari konsep desain hingga produk jadi, tim ahli kami siap mengeksekusi kebutuhan seragam Anda dengan presisi dan kualitas terbaik.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold h-14 px-10 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:-translate-y-1 w-full sm:w-auto"
                >
                  <PhoneCall className="w-5 h-5" />
                  Mulai Konsultasi Gratis
                </a>
                <a 
                  href="#portfolio" 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold h-14 px-8 rounded-full transition-all duration-300 border border-white/10 hover:border-white/30 w-full sm:w-auto"
                >
                  Lihat Portofolio
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
