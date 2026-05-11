import { MATERIALS } from "@/src/constants";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Weight, Scissors, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function MaterialShowcase() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-red-600 border-red-200 bg-red-50 px-4 py-1 uppercase tracking-widest font-black text-[10px]">
            KOLEKSI MATERIAL
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Katalog Material</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Lihat lebih dekat detail dan spesifikasi dari bahan premium kami yang berkualitas.
          </p>
        </div>

        <div className="relative px-0 sm:px-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {MATERIALS.map((material) => (
                <CarouselItem key={material.id}>
                  <div className="bg-white rounded-[2rem] p-4 md:p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                       {/* Image View */}
                       <div className="md:w-1/2">
                          <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden group">
                             <img 
                               src={material.image} 
                               alt={material.name}
                               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                               referrerPolicy="no-referrer"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                             <div className="absolute bottom-6 left-6 right-6">
                                <Badge className="bg-red-600 hover:bg-red-700 text-white mb-3 border-none">{material.name}</Badge>
                                <p className="text-xl font-bold text-white mb-2 leading-tight">{material.specifications.recommendedUse}</p>
                             </div>
                          </div>
                       </div>

                       {/* Specs Config */}
                       <div className="md:w-1/2 flex flex-col justify-center gap-6 md:pr-4">
                          <div className="grid grid-cols-2 gap-4">
                             <Card className="bg-gray-50 border-none shadow-none">
                                <CardContent className="p-4 sm:p-5 flex flex-col justify-center items-start gap-2">
                                  <Weight className="w-6 h-6 text-red-600 mb-1" strokeWidth={1.5} />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Gramasi</span>
                                  <p className="font-bold text-gray-900 leading-tight">{material.specifications.grammage}</p>
                                </CardContent>
                             </Card>
                             <Card className="bg-gray-50 border-none shadow-none">
                                <CardContent className="p-4 sm:p-5 flex flex-col justify-center items-start gap-2">
                                  <Layers className="w-6 h-6 text-red-600 mb-1" strokeWidth={1.5} />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Komposisi</span>
                                  <p className="font-bold text-gray-900 leading-tight text-sm md:text-base line-clamp-2" title={material.specifications.composition}>{material.specifications.composition}</p>
                                </CardContent>
                             </Card>
                          </div>
                          
                          <div className="pt-2">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Scissors className="w-4 h-4 text-gray-400" />
                              Fitur Teknis
                            </h4>
                            <ul className="space-y-3">
                               {material.specifications.technicals.map((tech, idx) => (
                                 <div 
                                   key={idx}
                                   className="flex items-center gap-3 text-gray-700"
                                 >
                                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                                    </div>
                                    <span className="font-medium text-sm">{tech}</span>
                                 </div>
                               ))}
                            </ul>
                          </div>
                       </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-none bg-white shadow-md hover:bg-gray-50" />
            <CarouselNext className="hidden md:flex -right-12 border-none bg-white shadow-md hover:bg-gray-50" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
