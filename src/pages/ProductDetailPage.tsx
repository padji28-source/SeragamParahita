import { useParams, Link } from "react-router-dom";
import { PRODUCTS, MATERIALS } from "../constants";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Factory, Scissors, ShieldCheck, Ruler, ArrowRight, Layers } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const CAT_KEYS: Record<string, string> = {
  "Semua": "products.categories.all",
  "Waralaba": "products.categories.franchise",
  "Otomotif": "products.categories.automotive",
  "Tambang": "products.categories.mining",
  "Media": "products.categories.media",
  "Food & Beverage": "products.categories.fnb",
  "Event": "products.categories.event",
  "Kantor": "products.categories.office",
  "Merchandise": "products.categories.merchandise"
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { t } = useTranslation();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{t('productDetail.notFound')}</h1>
          <Link to="/" className="text-red-500 hover:text-red-600 font-medium">{t('productDetail.backToHome')}</Link>
        </div>
      </div>
    );
  }

  const material = MATERIALS.find(m => m.id === product.materialId);

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Product Header / Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50/50 rounded-bl-[100px] pointer-events-none -z-10" />
        
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            {/* Left Image Side */}
            <motion.div 
              initial={{ opacity: 0, filter: "blur(10px)" }} 
              animate={{ opacity: 1, filter: "blur(0px)" }} 
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 w-full max-w-2xl"
            >
              <div className="relative group rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-square bg-gray-100 shadow-2xl border-4 border-white">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {product.badge && (
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1.5 shadow-lg shadow-red-600/30">
                      {product.badge}
                    </Badge>
                  </div>
                )}

                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-gray-800 text-center">{t('productDetail.highQualityMaterial')}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Information Side */}
            <motion.div 
              initial={{ opacity: 0, filter: "blur(5px)" }} 
              animate={{ opacity: 1, filter: "blur(0px)" }} 
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lg:w-1/2 w-full lg:pl-4 space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <Badge variant="outline" className="text-gray-500 font-bold uppercase tracking-widest text-[10px] border-gray-200">
                    {t(CAT_KEYS[product.category] || product.category)}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  {t(`products.items.${product.id}.name`, { defaultValue: product.name })}
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                  {t(`products.items.${product.id}.desc`, { defaultValue: product.description })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 md:p-5 flex flex-col gap-2 relative overflow-hidden">
                   <Factory className="w-6 h-6 text-red-500 mb-1" />
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('productDetail.capacity')}</span>
                   <p className="font-bold text-gray-900 leading-none">{t('productDetail.minPcs')}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 md:p-5 flex flex-col gap-2">
                   <ShieldCheck className="w-6 h-6 text-red-500 mb-1" />
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('productDetail.warranty')}</span>
                   <p className="font-bold text-gray-900 leading-none">{t('productDetail.returnGuarantee')}</p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <h3 className="font-bold text-gray-900 mb-2">{t('productDetail.specialFeatures')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Array.isArray(t(`products.items.${product.id}.features`, { returnObjects: true })) 
                    ? (t(`products.items.${product.id}.features`, { returnObjects: true }) as string[]) 
                    : (product.features || [])
                  ).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-red-600" />
                      </div>
                      <span className="text-gray-600 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                 <a href="#quote-request" className={cn(buttonVariants(), "h-14 px-8 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-600/25 font-bold group")}>
                     {t('productDetail.requestQuote')}
                     <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                 </a>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Material Specifications Section */}
      {material && (
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 max-w-5xl">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('productDetail.priorityMaterials')}</h2>
               <p className="text-gray-500 max-w-2xl mx-auto text-lg">{material.name} - {material.specifications.recommendedUse}</p>
             </div>

             <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-bl-full opacity-50 pointer-events-none" />
                
                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                   <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-black tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-gray-400" /> {t('productDetail.compositionSpecs')}
                        </h3>
                        <p className="text-2xl font-semibold text-gray-900 leading-snug">
                          {material.specifications.composition}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('productDetail.grammage')}</p>
                          <p className="font-extrabold text-gray-900 text-xl">{material.specifications.grammage}</p>
                        </div>
                        <div className="w-px h-12 bg-gray-100" />
                        <div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('productDetail.sizeOptions')}</p>
                           <p className="font-extrabold text-gray-900 text-xl">{(product.sizes || []).join(", ")}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-black tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                          <Scissors className="w-4 h-4 text-gray-400" /> {t('productDetail.technicalFeatures')}
                        </h3>
                        <ul className="grid grid-cols-1 gap-3">
                           {(material.specifications?.technicals || []).map((tech, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                 <Ruler className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                 <span className="font-medium text-gray-700">{tech}</span>
                              </li>
                           ))}
                        </ul>
                      </div>
                   </div>

                   <div className="relative rounded-[2rem] overflow-hidden aspect-square self-center shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto">
                     <img 
                       src={material.image} 
                       alt={material.name}
                       className="w-full h-full object-cover scale-105"
                       referrerPolicy="no-referrer"
                     />
                   </div>
                </div>
             </div>
          </div>
        </section>
      )}

      {/* CTA section (could navigate to an inquiry or link the contact form) */}
      <section id="quote-request" className="py-24 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat opacity-15"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('productDetail.readyToMake')} {' '} {t(`products.items.${product.id}.name`, { defaultValue: product.name })}?</h2>
          <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {t('productDetail.contactExperts')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to="/contact" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 rounded-xl bg-white text-red-600 hover:bg-gray-50 font-bold hover:scale-105 transition-transform")}>
                {t('productDetail.contactUsNow')}
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
