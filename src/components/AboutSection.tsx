import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Factory, Users, Award, Target, Rocket, Download, ShieldCheck, Trophy, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const stats = [
    { icon: <Factory className="w-8 h-8 text-red-600" />, label: t('about.stats.capacity') || "Production Capacity", value: "50,000+ pcs/month" },
    { icon: <Users className="w-8 h-8 text-red-600" />, label: t('about.stats.workers') || "Skilled Workers", value: "200+" },
    { icon: <Award className="w-8 h-8 text-red-600" />, label: t('about.stats.experience') || "Years Experience", value: "15+ Years" },
  ];

  const achievements = [
    { icon: <Trophy className="w-8 h-8 text-red-600" />, title: "Award Winning", desc: "Produk Seragam Berkualitas Tinggi Nasional" },
    { icon: <ShieldCheck className="w-8 h-8 text-red-600" />, title: "Certified Quality", desc: "Standar Produksi Teruji & Terpercaya" },
    { icon: <Award className="w-8 h-8 text-red-600" />, title: "Top Provider", desc: "Mitra Pilihan 100+ Perusahaan Multi Nasional" },
    { icon: <Star className="w-8 h-8 text-red-600" />, title: "Excellent Service", desc: "Kepuasan Pelanggan Adalah Prioritas Utama" },
  ];

  return (
    <div className="bg-[#fdfdfd]">
      {/* Video Section */}
      <section className="relative w-full bg-black">
        <div className="w-full relative aspect-video">
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

      {/* About Split-Pane Section */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/Parahitaprimasentosa.png" 
            alt="Parahita Building" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/20" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-stretch">
           <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[55%] xl:w-[50%] bg-white/95 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.1)] p-8 md:p-14 lg:p-16 relative rounded-3xl md:rounded-[2.5rem] border border-white/50"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1] relative">
              {t('about.story.title')}
            </h2>
            
            <div className="space-y-5 text-gray-600 font-medium text-[15px] md:text-base leading-relaxed [&>p>strong]:text-gray-900 [&>p>strong]:font-bold">
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p1') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p2') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p3') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p4') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.story.p5') }} />
            </div>

            <div className="mt-12">
              <a 
                href="/company-profile.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[maroon] hover:bg-neutral-900 text-white font-black h-14 md:h-16 px-8 md:px-10 rounded-2xl shadow-xl shadow-[maroon]/20 tracking-wider text-xs md:text-sm transition-all duration-300 active:scale-[0.98] uppercase group"
              >
                <span>{t('about.companyProfile')}</span>
                <Download className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          <div className="w-full lg:w-[45%] xl:w-[50%] flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full"
            >
              {achievements.map((item, idx) => (
                <div key={idx} className="bg-white/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-red-100/50">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-10 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 flex flex-col h-full"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{t('about.vision')}</h2>
              </div>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-serif italic text-balance mb-8 flex-1">
                "{t('about.visionStatement')}"
              </p>
              <div className="w-16 h-1 bg-red-600 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900 p-10 md:p-14 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[60px] rounded-full -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 blur-[60px] rounded-full -ml-20 -mb-20 pointer-events-none" />
              
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm shrink-0">
                  <Rocket className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{t('about.mission')}</h2>
              </div>
              <ul className="space-y-5 relative z-10 flex-1">
                {(Array.isArray(t('about.missionStatements', { returnObjects: true })) ? (t('about.missionStatements', { returnObjects: true }) as string[]) : []).map((misi, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-start gap-4 text-gray-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                    <span className="text-base md:text-lg font-medium leading-relaxed">{misi}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0">
          <img 
            src="/bahanpolos.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="border-white/20 shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white/90 backdrop-blur-xl rounded-[2rem]">
                  <CardContent className="p-10 md:p-12 text-center space-y-4 flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-red-50 rounded-2xl mb-2 text-red-600 shadow-sm border border-red-100/50">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                    <p className="text-sm uppercase tracking-widest font-bold text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
