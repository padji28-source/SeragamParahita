import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { 
Mail, 
  CheckCircle2, 
  ArrowRight, 
  Layers
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QuoteForm() {
  const { t } = useTranslation();
    
  const emailTo = "seragamparahita01@gmail.com,cs@seragamparahita.com,seragamparahita02@gmail.com";
  const emailSubject = `Request Penawaran & Konsultasi Produksi - Parahita`;
    
  const emailBody = 
    `Halo Tim Sales,\r\n\r\n` +
    `Saya ingin meminta penawaran dan berkonsultasi mengenai pesanan:\r\n\r\n` +
    `----------------------------------------\r\n` +
    `Nama Lengkap        : \r\n` +
    `Perusahaan/Instansi : \r\n` +
    `Kuantitas           :  Pcs\r\n` +
    `Catatan Tambahan    : \r\n` +
    `----------------------------------------\r\n\r\n` +
    `Mohon informasi lebih lanjut mengenai harga dan estimasi waktu produksi.\r\n\r\n` +
    `Terima kasih.`;

  const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Ambient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
              <Layers className="w-3 h-3" /> Solusi Manufaktur
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Solusi Produksi untuk <span className="text-red-600">Brand Terbaik</span> Anda.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
              Kami menggabungkan teknologi manufaktur terkini dengan standar kualitas tinggi untuk memastikan produk Anda menonjol di pasar.
            </p>
            
            <div className="flex flex-col gap-4 pt-4">
              {[ "Standardisasi Kualitas Tinggi", "Efisiensi Produksi Massal", "Konsultasi Desain Profesional" ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-red-600" /> {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-1 rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            <div className="bg-slate-50 rounded-[2.8rem] p-10 md:p-14 text-center space-y-8 border border-white/50">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-100">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Siap untuk Memulai?</h3>
                <p className="text-slate-500 text-sm">Tim kami siap membantu kebutuhan produksi Anda.</p>
              </div>

              <motion.a 
                href={mailtoLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative mt-8 overflow-hidden flex items-center justify-center w-full h-16 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-900/10 group transition-all duration-300 hover:shadow-red-600/25 hover:bg-red-600"
              >
                {/* Efek kilau (shine effect) saat tombol di-hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                
                <span className="relative z-10">Mulai Konsultasi</span>
                <ArrowRight className="relative z-10 ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
