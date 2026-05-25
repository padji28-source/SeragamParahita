import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { 
  Target, 
  Rocket, 
  Download, 
  CheckCircle2, 
  Award, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Calendar,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function AboutPage() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  // Stats definition
  const stats = [
    {
      value: "15+",
      label: t('about.stats.experience', { defaultValue: 'Years Experience' }),
      icon: Calendar,
      desc: t('about.stats.dedication', { defaultValue: 'Dedicated to providing the best quality.' }),
      color: "border-red-500/10 hover:border-red-500/30 bg-white"
    },
    {
      value: "50k+",
      label: t('about.stats.capacity', { defaultValue: 'Capacity/mo' }),
      icon: Cpu,
      desc: t('nav.home') === 'Home' ? "Garment production capacity" : "Kapasitas produksi garmen bulanan",
      color: "border-slate-200/60 hover:border-slate-300 bg-white"
    },
    {
      value: "200+",
      label: t('about.stats.workers', { defaultValue: 'Experts' }),
      icon: Users,
      desc: t('nav.home') === 'Home' ? "Highly skilled professional tailors & team" : "Tenaga ahli profesional & penjahit terlatih",
      color: "bg-red-650 border-red-650 text-white shadow-xl shadow-red-650/10"
    }
  ];

  // Core Strengths / Values
  const keyStrengths = [
    {
      icon: Award,
      title: t('nav.home') === 'Home' ? "Premium Quality" : "Kualitas Premium",
      desc: t('nav.home') === 'Home' ? "Only premium grade fabric and accessories with meticulous multi-stage quality control." : "Hanya bahan berstandar premium dengan sistem pengawasan kualitas bertahap."
    },
    {
      icon: ShieldCheck,
      title: t('nav.home') === 'Home' ? "Guaranteed Production" : "Garansi Produksi",
      desc: t('nav.home') === 'Home' ? "100% replacement and repair warranty for any manufacturing defect or sizing mismatch." : "Garansi 100% retur atau perbaikan jika terdapat cacat produksi atau ketidaksesuaian ukuran."
    },
    {
      icon: Sparkles,
      title: t('nav.home') === 'Home' ? "Custom Tailored Design" : "Desain Kustom Berkelas",
      desc: t('nav.home') === 'Home' ? "Free uniform design consultation and physical fabric sample kits tailored for clients." : "Konsultasi desain seragam gratis serta pengiriman sampel bahan fisik yang disesuaikan."
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-red-200 font-sans overflow-hidden">
      
      {/* GLOBAL BACKGROUND AMBIENT */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#0052cc 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-slate-100 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HERO BANNER --- */}
      <section className="relative h-[480px] lg:h-[540px] flex items-center overflow-hidden z-10">
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="About Parahita Background" 
            className="w-full h-full object-cover object-center grayscale opacity-85"
            referrerPolicy="no-referrer"
          />
          {/* Overlay gradient for stunning visual depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative z-10">
          <div className="max-w-3xl text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3 text-red-500 fill-red-500/30 animate-pulse" />
              {t('nav.about', { defaultValue: 'Tentang Kami' })}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)", y: 25 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: smoothEase }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]"
            >
              PT Parahita <br />
              <span className="text-red-500">Prima Sentosa.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base md:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed"
            >
              {t('about.subtitle', { defaultValue: 'Menciptakan keunggulan dalam setiap jahitan sejak 1990.' })}
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- SECTION 1: TENTANG PARAHITA STORY --- */}
      <section className="relative z-20 py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Rich Story content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-red-650 font-black tracking-[0.25em] uppercase text-xs block">
                {t('nav.home') === 'Home' ? 'ESTABLISHED 1990' : 'SEJAK TAHUN 1990'}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-none uppercase">
                {t('about.story.title', { defaultValue: 'Tentang Parahita' })}
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 font-medium text-base md:text-lg leading-relaxed border-l-2 border-red-500/20 pl-6 italic">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                {t('about.story.p1')}
              </p>
              <p>{t('about.story.p2')}</p>
              
              {showMore && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 overflow-hidden pt-4 border-t border-slate-100"
                >
                  <p>{t('about.story.p3')}</p>
                  <p>{t('about.story.p4')}</p>
                  <p>{t('about.story.p5')}</p>
                </motion.div>
              )}
            </div>

            {/* Interaction Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a 
                href="/company-profile.pdf" 
                download
                className="group relative inline-flex items-center gap-3 bg-slate-900 hover:bg-red-650 text-white font-bold h-12 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-slate-950/10 cursor-pointer"
              >
                <span>{t('about.companyProfile', { defaultValue: 'Unduh Profil Perusahaan' })}</span>
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </a>

              <button 
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center gap-2 hover:text-red-650 text-slate-800 text-sm font-black uppercase tracking-wider cursor-pointer select-none transition-colors"
              >
                <span>{showMore ? t('about.closeStory', { defaultValue: 'Tutup' }) : t('about.readMore', { defaultValue: 'Selengkapnya' })}</span>
                <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform hover:border-red-600 duration-300">
                  <span className={`transform transition-transform text-xs ${showMore ? 'rotate-90' : 'rotate-0'}`}>→</span>
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Statistics Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: smoothEase }}
                  className={`border border-slate-200/60 p-8 rounded-[2rem] flex items-center gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 relative overflow-hidden ${stat.color}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${stat.value === '200+' ? 'bg-white/10 border-white/20 text-white' : 'bg-red-50/50 border-red-100 text-red-600'}`}>
                    <stat.icon className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-1">
                      {stat.value}
                    </h3>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80 ${stat.value === '200+' ? 'text-white/85' : 'text-slate-500'}`}>
                      {stat.label}
                    </p>
                    <p className={`text-xs font-semibold ${stat.value === '200+' ? 'text-white/70' : 'text-slate-400'}`}>
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 2: VISI & MISI (Elegant, Clean Light Layout) --- */}
      <section className="relative z-20 py-16 md:py-24 bg-white border-y border-slate-100">
        {/* Decorative elements backdrop */}
        <div className="absolute inset-0 bg-slate-50/30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-red-650 font-black tracking-[0.3em] uppercase text-xs block">
              {t('nav.home') === 'Home' ? 'OUR GUIDING VALUES' : 'NILAI PEDOMAN KAMI'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
              {t('nav.home') === 'Home' ? 'Vision & Mission' : 'Visi & Misi'}
            </h2>
            <div className="h-1 w-16 bg-red-650 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* Visi Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/20 hover:shadow-xl hover:shadow-slate-200/35 transition-all duration-300"
            >
              <div className="absolute top-10 right-10 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none select-none">
                <Target className="w-56 h-56 text-slate-900" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-650">
                  <Target className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase tracking-wider text-slate-900">
                    {t('about.vision', { defaultValue: 'Visi' })}
                  </h3>
                  <p className="text-slate-400 font-bold tracking-[0.05em] uppercase text-[10px]">
                    PT Parahita Prima Sentosa
                  </p>
                </div>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-700 italic border-l-2 border-red-500/30 pl-4">
                  "{t('about.visionStatement')}"
                </p>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-12 flex items-center justify-between text-slate-400 text-[10px] font-black tracking-wider uppercase">
                <span>PARAHITA GARMENT</span>
                <span>SINCE 1990</span>
              </div>
            </motion.div>

            {/* Misi Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/20 hover:shadow-xl hover:shadow-slate-200/35 transition-all duration-300"
            >
              <div className="absolute top-10 right-10 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none select-none">
                <Rocket className="w-56 h-56 text-slate-900" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-650">
                  <Rocket className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase tracking-wider text-slate-900">
                    {t('about.mission', { defaultValue: 'Misi' })}
                  </h3>
                  <p className="text-slate-400 font-bold tracking-[0.05em] uppercase text-[10px]">
                    Core Operational Missions
                  </p>
                </div>

                <ul className="space-y-4">
                  {(t('about.missionStatements', { returnObjects: true }) as string[]).map((missionText, idx) => (
                    <li key={idx} className="flex gap-4 items-start group/item">
                      <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 group-hover/item:bg-red-650 group-hover/item:text-white select-none transition-all">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 group-hover/item:text-white transition-colors" />
                      </div>
                      <span className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                        {missionText}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-100 mt-12 flex items-center justify-between text-slate-400 text-[10px] font-black tracking-wider uppercase">
                <span>COMMITMENT TO INTEGRITY</span>
                <span>QUALITY FIRST</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: VIDEO PROFIL (Stunning Mock Player framed inline) --- */}
      <section className="relative z-20 py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <span className="text-red-650 font-black tracking-[0.3em] uppercase text-xs block">
            {t('about.getToKnowUs', { defaultValue: 'KENALI KAMI LEBIH DEKAT' })}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 uppercase">
            {t('about.videoTitle', { defaultValue: 'Video Profil Perusahaan' })}
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            {t('nav.home') === 'Home' 
              ? 'Watch our state-of-the-art production workflow, manufacturing capabilities, and dedicated team in actions.' 
              : 'Saksikan alur kerja produksi canggih, kapasitas manufaktur, dan dedikasi tim kerja profesional kami.'}
          </p>
        </div>

        {/* Video Player Frame with amazing shadow and glow */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="relative max-w-5xl mx-auto aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-[0_30px_100px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/10 p-2 md:p-3"
        >
          {/* Subtle Ambient Red Glow under the player */}
          <div className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full z-0 opacity-70 pointer-events-none scale-90" />
          
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden z-10 border border-white/5">
            <iframe
              className="w-full h-full relative z-10"
              src="https://www.youtube.com/embed/iKVxh4JNqgo?si=QEQObrFyzIVKlGmw"
              title="Company Profile Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 4: KEY ADVANTAGES --- */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-100 relative z-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {keyStrengths.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-650 border border-red-100">
                  <item.icon className="w-5 h-5 shrink-0" />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
