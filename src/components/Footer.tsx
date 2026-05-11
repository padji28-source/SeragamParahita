import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PRODUCTS } from "../constants";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gray-900 text-white py-24 overflow-hidden">
      {/* Background Image with Blur and Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/background.png" 
          alt="Footer Background" 
          className="w-full h-full object-cover blur-sm scale-105 opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/Logo.png" 
                alt="Parahita Logo" 
                className="h-14 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li><Link to="/" className="hover:text-red-500 transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/products" className="hover:text-red-500 transition-colors">{t('nav.products')}</Link></li>
              <li><Link to="/partner" className="hover:text-red-500 transition-colors">{t('nav.partner')}</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-wider">{t('footer.products')}</h4>
            <ul className="space-y-3 text-gray-400 font-bold">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`} className="hover:text-red-500 transition-colors">
                    {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-wider">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li>
                <a 
                  href="https://www.google.com/maps/place/PT.+PARAHITA+PRIMA+SENTOSA/@-6.2350812,106.647693,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbe8c3410c17:0x9b3aa1ee3c4a13f0!8m2!3d-6.2350812!4d106.647693!16s%2Fg%2F11c1vnlxdg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors"
                >
                  Kawasan Industri Multiguna Blok B No. 10A,<br />
                  Jl. Raya Serpong KM 7, Serpong Utara,<br />
                  Tangerang Selatan, Banten 15310
                </a>
              </li>
              <li>seragam@parahitaps.com</li>
              <li>+6221-5399-261</li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-bold">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
