import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PRODUCTS } from "../constants";
import { motion } from "motion/react";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/background.png" 
          alt="Footer Background" 
          className="w-full h-full object-cover opacity-20 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Section: CTA & Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 italic uppercase">
              Ready to <span className="text-red-600">Upgrade</span> Your Uniform?
            </h2>
            <p className="text-gray-400 font-medium">
              Konsultasikan kebutuhan garmen perusahaan Anda dengan tim ahli kami sekarang.
            </p>
          </div>
          <div className="flex gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <Separator className="bg-white/5 mb-16" />

        {/* Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-8">
            <Link to="/" onClick={scrollToTop}>
              <img 
                src="/Logo.png" 
                alt="Logo" 
                className="h-16 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-red-600">Navigasi</h4>
            <ul className="space-y-4 text-gray-300 font-bold text-sm">
              {['home', 'partner', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item === 'home' ? '' : item}`} className="hover:text-red-500 transition-colors flex items-center group">
                    {t(`nav.${item}`)}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-red-600">Koleksi Produk</h4>
            <ul className="space-y-4 text-gray-300 font-bold text-sm">
              {PRODUCTS.slice(0, 4).map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`} className="hover:text-red-500 transition-colors">
                    {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-red-600">Hubungi Kami</h4>
            <ul className="space-y-6 text-gray-400 font-medium text-sm">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                <a href="#" className="hover:text-white transition-colors leading-relaxed">
                  Kawasan Industri Multiguna Blok B No. 10A, Serpong Utara, Tangerang Selatan
                </a>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <span>seragam@parahitaps.com</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <span>+6221-5399-261</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Parahita. {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-xs text-gray-500 font-medium">
            <Link to="/privacy" className="hover:text-white transition-colors tracking-widest uppercase">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors tracking-widest uppercase">Terms of Service</Link>
          </div>
          <button 
            onClick={scrollToTop}
            className="text-xs font-black uppercase tracking-widest text-red-600 hover:text-white transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
