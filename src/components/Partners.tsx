import React, { useState, useRef, useEffect } from "react";
import { PARTNERS } from "@/src/constants";
import { useTranslation } from "react-i18next";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Partners() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeftState] = useState(0);
  const autoScrollSpeed = 0.8; // px per frame

  // Duplicate the list of partners 5 times to ensure continuous seamless loop with wide viewports
  const duplicatedPartners = [
    ...PARTNERS, 
    ...PARTNERS, 
    ...PARTNERS, 
    ...PARTNERS, 
    ...PARTNERS
  ];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;

    const scroll = () => {
      if (!isDragging && el) {
        el.scrollLeft += autoScrollSpeed;

        // Reset positions smoothly for an endless looping marquee
        const oneFifth = el.scrollWidth / 5;
        if (el.scrollLeft >= oneFifth * 3) {
          el.scrollLeft -= oneFifth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  };

  const scrollManual = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.4;
    el.scrollTo({
      left: el.scrollLeft + (direction === 'left' ? -amount : amount),
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
        <div className="space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm select-none">
            Trusted Industry Leaders
          </div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-slate-900 leading-tight">
            {t('partner.distinguished')}
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto font-semibold">
            {t('partner.subtitle')}
          </p>
        </div>

        {/* Slider Carousel Area */}
        <div className="relative group/slider">
          
          {/* Vignette gradients for beautiful depth effects */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Interactive touch & drag viewport */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            className={`flex gap-6 items-center overflow-x-auto scrollbar-none py-6 px-12 transition-all select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-44 md:w-56 h-28 md:h-36 bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl border border-slate-200/60 flex items-center justify-center p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_45px_rgba(239,68,68,0.03)] hover:border-red-500/20 hover:scale-[1.03] transition-all duration-300 group/card"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 md:max-h-16 max-w-full object-contain filter grayscale group-hover/card:grayscale-0 opacity-60 group-hover/card:opacity-100 transition-all duration-350"
                  referrerPolicy="no-referrer"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Precision Controls (Becomes visible on hovering slider) */}
          <div className="flex justify-center items-center gap-4 mt-8 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => scrollManual('left')}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-500 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              aria-label="Scroll Left"
            >
              <MoveLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollManual('right')}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-500 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              aria-label="Scroll Right"
            >
              <MoveRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
