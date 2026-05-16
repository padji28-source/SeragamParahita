import { PARTNERS } from "@/src/constants";
import { useTranslation } from "react-i18next";

export default function Partners() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Trusted Industry Leaders
          </div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">
            {t('partner.distinguished')}
          </h2>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex items-center space-x-12 md:space-x-24 animate-marquee min-w-max pr-12 md:pr-24 hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
              <img
                key={`${partner.name}-${index}`}
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-12 w-auto max-w-none object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
