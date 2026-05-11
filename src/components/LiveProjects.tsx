import { useRef } from "react";
import { MAJOR_PARTNERS } from "@/src/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";

export default function LiveProjects() {
  const autoPlayPlugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      {/* Live Process Timeline Section */}
      <div className="bg-gray-50 py-24 relative overflow-hidden border-y border-gray-100">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[100px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 blur-[100px] rounded-full -ml-48 -mb-48" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col justify-center items-center mb-12 gap-4">
            <div className="text-center mx-auto">
              <div className="flex items-center justify-center gap-2 text-red-600 font-bold tracking-widest uppercase text-sm mb-3">
                <Activity className="w-4 h-4 animate-pulse" />
                {t('partner.liveProduction')}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{t('partner.activeStatus')}</h2>
              <p className="text-gray-500 mt-4 text-lg max-w-xl leading-relaxed mx-auto">
                {t('partner.monitoring')}
              </p>
            </div>
            <div className="hidden">
              <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{t('partner.capacity')}</p>
                <p className="text-2xl font-bold text-gray-900">94.2% <span className="text-xs text-green-500 ml-1 font-bold">▲ 2.1%</span></p>
              </div>
            </div>
          </div>

          <div className="relative px-0 sm:px-12">
            <Carousel 
              plugins={[autoPlayPlugin.current]}
              opts={{ align: "start", loop: true }}
              className="w-full"
              onMouseEnter={() => autoPlayPlugin.current.stop()}
              onMouseLeave={() => autoPlayPlugin.current.play()}
            >
              <CarouselContent className="-ml-4 sm:-ml-6 py-4">
                <AnimatePresence mode="popLayout">
                  {MAJOR_PARTNERS.map((partner, index) => (
                    <CarouselItem key={partner.id} className="pl-4 sm:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <motion.div
                        layout
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="h-full"
                      >
                        <Card className="bg-white border-none overflow-hidden group hover:border-red-600/30 transition-shadow duration-500 shadow-lg hover:shadow-xl h-full flex flex-col rounded-3xl relative">
                          <CardContent className="p-0 flex-1 flex flex-col relative z-20">
                            <div className="relative h-48 bg-white flex items-center justify-center p-8 overflow-hidden border-b border-gray-50">
                              {/* Background Pattern */}
                              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                              </div>
                              
                              <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              
                              <Badge className="absolute top-4 right-4 bg-green-50 text-green-600 hover:bg-green-100 border-none shadow-sm flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {partner.status}
                              </Badge>
                            </div>

                            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between bg-white relative z-20">
                              <div>
                                <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">PRT-24-{100 + index}</span>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{partner.name}</h3>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                  <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Progress</span>
                                  <span className="text-xl font-black text-gray-900">{partner.progress}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${partner.progress}%` }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </AnimatePresence>
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 border-none bg-white shadow-md hover:bg-gray-50" />
              <CarouselNext className="hidden md:flex -right-12 border-none bg-white shadow-md hover:bg-gray-50" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
