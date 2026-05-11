import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Factory, Users, Award, Target, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  const stats = [
    { icon: <Factory className="w-8 h-8 text-red-600" />, label: t('about.stats.capacity') || "Production Capacity", value: "50,000+ pcs/month" },
    { icon: <Users className="w-8 h-8 text-red-600" />, label: t('about.stats.workers') || "Skilled Workers", value: "200+" },
    { icon: <Award className="w-8 h-8 text-red-600" />, label: t('about.stats.experience') || "Years Experience", value: "15+ Years" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/background.png" 
            alt="About Parahita Background" 
            className="w-full h-full object-cover blur-sm scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
              <motion.h1 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-xl"
              >
            {t('about.title')} <span className="text-red-600">Parahita</span>
          </motion.h1>
              <motion.p 
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-medium"
              >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.story.title') || 'Tentang Parahita'}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t('about.story.p1')}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t('about.story.p2')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Array.isArray(t('about.features', { returnObjects: true })) ? (t('about.features', { returnObjects: true }) as string[]) : []).map((item) => (
                  <div key={item} className="flex items-center gap-2 text-gray-700 font-medium">
                    <CheckCircle2 className="text-red-600 w-5 h-5" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/iKVxh4JNqgo"
                  title="Parahita Production Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-red-600 text-white p-8 rounded-3xl hidden md:block shadow-xl">
                <p className="text-4xl font-bold">15+</p>
                <p className="text-sm uppercase tracking-widest font-medium">{t('about.yearsExcellence')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-2xl">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t('about.vision')}</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed italic">
                {t('about.visionStatement')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-2xl">
                  <Rocket className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t('about.mission')}</h2>
              </div>
              <ul className="space-y-4">
                {(Array.isArray(t('about.missionStatements', { returnObjects: true })) ? (t('about.missionStatements', { returnObjects: true }) as string[]) : []).map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                    <span className="text-lg">{misi}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-10 text-center space-y-4">
                  <div className="flex justify-center">{stat.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-500 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
