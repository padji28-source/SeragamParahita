import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PRODUCTS } from "../constants";
import { motion } from "motion/react";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowRight, ArrowUp, Send } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <footer className="relative bg-[#020617] text-slate-300 pt-10 md:pt-16 pb-8 overflow-hidden font-sans border-t border-slate-900">
      
      {/* 1. Cinematic Background & Image Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Background Image Texture */}
        <img 
          src="/Parahitaprimasentosa.png" 
          alt="Background Texture" 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.05] grayscale"
          loading="lazy"
          decoding="async"
        />

        {/* Subtle animated noise / grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[130px] rounded-full translate-x-1/3 -translate-y-1/3 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* 3. Main Links Grid with Animated Hover */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 lg:mb-24"
        >
          {/* Kolom 1: Brand Info */}
          <motion.div variants={itemVariants} className="lg:col-span-4 lg:pr-12 flex flex-col h-full">
            <Link to="/" onClick={scrollToTop} className="inline-block mb-8">
              <img 
                src="/Logo.png" 
                alt="Parahita Logo" 
                width={210}
                height={56}
                className="h-14 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-slate-400/90 leading-relaxed text-sm font-medium mb-8 flex-1">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "#", name: "Instagram" },
                { Icon: Facebook, href: "#", name: "Facebook" },
                { Icon: Linkedin, href: "#", name: "LinkedIn" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  aria-label={social.name}
                  className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Kolom 2: Navigasi */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.2em] text-slate-100/50">{t('footer.menuUtama', { defaultValue: 'Menu Utama' })}</h4>
            <ul className="space-y-4">
              {[
                { key: 'home', label: t('nav.home'), path: '/' },
                { key: 'products', label: t('nav.products'), path: '/products' },
                { key: 'about', label: t('nav.about'), path: '/tentang-kami' },
                { key: 'partner', label: t('nav.partner'), path: '/partner' },
                { key: 'contact', label: t('nav.contact'), path: '/contact' }
              ].map((item) => (
                <li key={item.key}>
                  <Link 
                    to={item.path} 
                    className="group flex items-center text-slate-300 hover:text-white transition-colors w-max"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2 text-red-500 transition-all duration-300" />
                    <span className="font-medium transform transition-transform duration-300 group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kolom 3: Produk */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.2em] text-slate-100/50">{t('footer.koleksiProduk', { defaultValue: 'Koleksi Produk' })}</h4>
            <ul className="space-y-4">
              {PRODUCTS.slice(0, 4).map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`} className="group flex items-center text-slate-300 hover:text-white transition-colors w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-3 group-hover:bg-red-500 group-hover:scale-150 transition-all duration-300" />
                    <span className="font-medium transform transition-transform duration-300 group-hover:translate-x-1">
                      {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kolom 4: Kontak */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.2em] text-slate-100/50">{t('footer.informasiKontak', { defaultValue: 'Informasi Kontak' })}</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-colors">
                  <MapPin className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                </div>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors leading-relaxed pt-2">
                  Kawasan Industri Multiguna Blok B No. 10A, Serpong Utara, Tangsel
                </a>
              </li>
              <li className="flex gap-4 items-center group">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                </div>
                <a href="mailto:seragam@parahitaps.com" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  seragam@parahitaps.com
                </a>
              </li>
              <li className="flex gap-4 items-center group">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-colors">
                  <Phone className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                </div>
                <a href="tel:+62215399261" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  +6221-5399-261
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* 4. Bottom Legal Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10"
        >
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} PT Parahita Prima Sentosa. {t('footer.rights')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs font-bold text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors uppercase tracking-[0.15em]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors uppercase tracking-[0.15em]">Terms of Service</Link>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors group"
          >
            Kembali ke Atas
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
              <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
            </div>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
