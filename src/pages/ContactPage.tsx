import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/background.png" 
            alt="Contact Background" 
            className="w-full h-full object-cover blur-sm scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
          >
            {t('contact.title', { defaultValue: 'Hubungi' })} <span className="text-red-600">Parahita</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-medium"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">{t('contact.contactInfo')}</h2>
                <p className="text-gray-500">
                  {t('contact.contactDesc')}
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <Phone className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-1">{t('contact.phone')}</h4>
                    <a href="tel:+62215399261" className="text-gray-600 font-medium hover:text-red-600 transition-colors">
                      +6221-5399-261
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <Mail className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-1">{t('contact.email')}</h4>
                    <a href="mailto:seragam@parahitaps.com" className="text-gray-600 font-medium hover:text-red-600 transition-colors">
                      seragam@parahitaps.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <MapPin className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-1">{t('contact.office')}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Kawasan Industri Multiguna Blok B No. 10A, Jl. Raya Serpong KM 7, Pakualam, Serpong Utara, Kota Tangerang Selatan, Banten 15310
                    </p>
                    <a 
                      href="https://www.google.com/maps/place/PT.+PARAHITA+PRIMA+SENTOSA/@-6.2350812,106.647693,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbe8c3410c17:0x9b3aa1ee3c4a13f0!8m2!3d-6.2350812!4d106.647693!16s%2Fg%2F11c1vnlxdg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 text-sm font-bold hover:underline mt-2 inline-block"
                    >
                      {t('contact.viewOnMaps')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center h-full space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact.waTitle')}</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {t('contact.waDesc')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
                  <a 
                    href="https://wa.me/6281234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">Sales 1</h4>
                    <p className="text-sm text-gray-500 mt-1">{t('contact.chatNow')}</p>
                  </a>

                  <a 
                    href="https://wa.me/6281234567891" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">Sales 2</h4>
                    <p className="text-sm text-gray-500 mt-1">{t('contact.chatNow')}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-gray-100 relative overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2162348545!2d106.6455043!3d-6.2350812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbe8c3410c17%3A0x9b3aa1ee3c4a13f0!2sPT.%20PARAHITA%20PRIMA%20SENTOSA!5e0!3m2!1sen!2sid!4v1713145000000!5m2!1sen!2sid" 
          className="absolute inset-0 w-full h-full border-0 grayscale contrast-125"
          allowFullScreen
          loading="lazy"
          title="Parahita Office Location"
        ></iframe>
        <div className="absolute inset-0 bg-red-600/5 pointer-events-none" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a 
            href="https://www.google.com/maps/place/PT.+PARAHITA+PRIMA+SENTOSA/@-6.2350812,106.647693,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbe8c3410c17:0x9b3aa1ee3c4a13f0!8m2!3d-6.2350812!4d106.647693!16s%2Fg%2F11c1vnlxdg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <MapPin className="w-5 h-5" />
            {t('contact.openMap')}
          </a>
        </div>
      </section>
    </div>
  );
}
