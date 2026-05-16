import { PARTNERS } from "@/src/constants";
import { useTranslation } from "react-i18next";

export default function Partners() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
          {t('partner.distinguished')}
        </h2>
        <div className="relative flex overflow-hidden">
          <div className="flex items-center space-x-16 animate-marquee min-w-max pr-16 hover:[animation-play-state:paused]">
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
