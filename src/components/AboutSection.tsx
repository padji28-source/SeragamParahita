import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Factory, Users, Award, Target, Rocket, Download, ShieldCheck, Trophy, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | null>(null);
  const [showMoreStory, setShowMoreStory] = useState(false);

  const toggleTab = (tab: 'vision' | 'mission') => {
    setActiveTab(prev => prev === tab ? null : tab);
  };


  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="/Parahitaprimasentosa.png" 
          alt="Parahita Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background gradients for About and Vision sections */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
      
      {/* About Split-Pane Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden z-20">
        <div className="container mx-auto px-4 md:px-8">

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Text & Story */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 space-y-8 bg-white/85 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl"
            >
              <div className="space-y-4">
                <h3 className="text-red-600 font-bold tracking-widest uppercase text-sm">Tentang Kami</h3>
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.2]">
                  {t('about.story.title')}
                </h2>
              </div>
              
              <div className="space-y-5 text-gray-700 font-medium text-[15px] md:text-base leading-relaxed">
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

              <div className="pt-2">
                <button
                  onClick={() => setShowMoreStory(!showMoreStory)}
                  className="text-red-600 font-bold text-sm tracking-widest uppercase hover:text-gray-900 transition-colors flex items-center gap-2 mb-4"
                >
                  {showMoreStory ? "Lebih Sedikit" : "Lihat Lebih Banyak"}
                  <motion.svg 
                    animate={{ rotate: showMoreStory ? 180 : 0 }} 
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </motion.svg>
                </button>
              </div>

              <div className="pt-4">
                <a 
                  href="/company-profile.pdf" 
                  download="Company Profile MKS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[maroon] hover:bg-neutral-900 text-white font-bold h-14 px-8 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm group shadow-lg"
                >
                  <span>{t('about.companyProfile')}</span>
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>

            {/* Right: Stats including 15+ Years */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {/* 15+ Years - Takes full width or prominent spot */}
                <div className="col-span-2 bg-white/85 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl flex flex-col items-center justify-center text-center group hover:bg-white/95 transition-all">
                   <div className="text-6xl md:text-8xl font-black text-red-600 mb-4 tracking-tighter group-hover:scale-105 transition-transform duration-500 drop-shadow-sm">
                     15+
                   </div>
                   <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 uppercase tracking-widest">
                     Tahun Pengalaman
                   </h3>
                   <p className="text-sm md:text-base text-gray-600 font-medium">
                     Berdedikasi dalam memberikan kualitas terbaik.
                   </p>
                </div>

                <div className="bg-white/85 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/50 shadow-xl flex flex-col items-center justify-center text-center">
                   <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2 drop-shadow-sm">50.000+</div>
                   <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Kapasitas Produksi (Pcs/Bulan)</p>
                </div>
                
                <div className="bg-white/85 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/50 shadow-xl flex flex-col items-center justify-center text-center">
                   <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2 drop-shadow-sm">200+</div>
                   <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Tenaga Ahli</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="pt-4 pb-24 relative overflow-hidden z-20">
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => toggleTab('vision')}
              className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/50 flex flex-col shadow-2xl cursor-pointer group"
            >
              <div className="flex items-center gap-4 transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-2xl shadow-sm border border-red-100 shrink-0 group-hover:bg-red-100 transition-colors">
                  <Target className="w-7 h-7 text-red-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex-1">{t('about.vision')}</h2>
                <motion.div 
                  animate={{ rotate: activeTab === 'vision' ? 180 : 0 }} 
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 group-hover:text-red-600 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </motion.div>
              </div>
              <AnimatePresence>
                {activeTab === 'vision' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed font-serif italic text-balance mb-6 flex-1 drop-shadow-sm">
                      "{t('about.visionStatement')}"
                    </p>
                    <div className="w-12 h-1 bg-red-600 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => toggleTab('mission')}
              className="bg-gray-900/90 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border border-gray-700/50 cursor-pointer group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[60px] rounded-full -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 blur-[60px] rounded-full -ml-20 -mb-20 pointer-events-none" />
              
              <div className="flex items-center gap-4 relative z-10 transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm shrink-0 group-hover:bg-white/20 transition-colors">
                  <Rocket className="w-7 h-7 text-red-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex-1">{t('about.mission')}</h2>
                <motion.div 
                  animate={{ rotate: activeTab === 'mission' ? 180 : 0 }} 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-400 group-hover:text-red-400 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </motion.div>
              </div>
              <AnimatePresence>
                {activeTab === 'mission' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden relative z-10"
                  >
                    <ul className="space-y-4 flex-1">
                      {(Array.isArray(t('about.missionStatements', { returnObjects: true })) ? (t('about.missionStatements', { returnObjects: true }) as string[]) : []).map((misi, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (idx * 0.1) }}
                          className="flex items-start gap-4 text-gray-300"
                        >
                          <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base font-medium leading-relaxed">{misi}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative w-full pb-20 lg:pb-32 flex justify-center z-20 px-4">
        <div className="w-full max-w-7xl relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
          <div className="absolute inset-0 bg-gray-900 animate-pulse pointer-events-none" />
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/iKVxh4JNqgo?autoplay=1&mute=1&loop=1&playlist=iKVxh4JNqgo&controls=0&rel=0&modestbranding=1"
            title="Parahita Production Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}
