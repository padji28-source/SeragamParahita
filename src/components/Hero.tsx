import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HERO_IMAGES } from "@/src/constants";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Scissors, Ruler, Palette, Shirt, Pipette } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-30">
      {/* Background abstract textile/thread lines */}
      <motion.div 
        className="absolute inset-0"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      />
      
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`shirt-${i}`}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 10, -10, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          className="absolute text-white/50 origin-center"
          style={{
            top: `${15 + (i * 30) % 70}%`,
            left: `${10 + (i * 25) % 80}%`,
            scale: 0.5 + (i % 3) * 0.2
          }}
        >
          <Shirt className="w-16 h-16 sm:w-24 sm:h-24 stroke-[1.5]" />
        </motion.div>
      ))}

      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`machine-${i}`}
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
          className="absolute text-white/40 origin-center"
          style={{
            bottom: `${20 + (i * 20) % 60}%`,
            right: `${15 + (i * 35) % 80}%`,
          }}
        >
          <Scissors className="w-12 h-12 sm:w-20 sm:h-20 stroke-[1]" />
        </motion.div>
      ))}
      
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`ruler-${i}`}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 25, 0],
          }}
          transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          className="absolute text-white/30 origin-center"
          style={{
            top: `${30 + (i * 15) % 50}%`,
            right: `${25 + (i * 40) % 70}%`,
          }}
        >
          <Ruler className="w-14 h-14 sm:w-16 sm:h-16 stroke-[1.5]" />
        </motion.div>
      ))}
    </div>
  );
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[65dvh] min-h-[550px] md:h-[100dvh] max-h-[1080px] overflow-hidden bg-gray-900">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full [&_[data-slot=carousel-content]]:h-full"
      >
        <CarouselContent className="h-full ml-0">
          {HERO_IMAGES.map((src, index) => (
            <CarouselItem key={index} className="h-full basis-full pl-0">
              <div className="relative h-full w-full">
                <img
                  src={src}
                  alt={`Factory view ${index + 1}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80 backdrop-blur-[4px]" />
                <div className="absolute inset-0 flex items-center justify-center text-center z-20">
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl px-4 sm:px-6 w-full"
                  >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white drop-shadow-2xl tracking-tighter leading-[1.1] sm:leading-none break-words">
                      {(t('hero.title') || '').split(' ').map((word, i) => (
                        <span key={i} className={i % 2 !== 0 ? "text-red-500" : ""}>{word} </span>
                      ))}
                    </h1>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl xl:text-2xl text-white/90 drop-shadow-md font-medium max-w-2xl mx-auto px-4 sm:px-0">
                      {t('hero.subtitle')}
                    </p>
                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
                      <Link to="/contact" className={cn(buttonVariants({ size: "lg" }), "h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg w-full sm:w-auto shadow-lg shadow-red-500/30 transition-all hover:scale-105 active:scale-95")}>
                        Konsultasi Gratis
                      </Link>
                      <a href="#products" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base sm:text-lg w-full sm:w-auto border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 border-2")}>
                        Lihat Katalog
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30 mb-safe">
          <CarouselPrevious className="relative left-0 translate-y-0 h-12 w-12 bg-white/10 hover:bg-white/30 text-white border-white/20 backdrop-blur-md" />
          <CarouselNext className="relative right-0 translate-y-0 h-12 w-12 bg-white/10 hover:bg-white/30 text-white border-white/20 backdrop-blur-md" />
        </div>
      </Carousel>
    </section>
  );
}
