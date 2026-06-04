import { motion } from "motion/react";
import { MessageCircle, Instagram } from "lucide-react";

export default function FloatingSocials() {
  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-[100] flex flex-col gap-3 lg:gap-4 scale-90 lg:scale-100 origin-bottom-right">
      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/seragam.parahita/" 
        aria-label="Follow us on Instagram"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shadow-lg shadow-pink-500/30 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Instagram className="w-6 h-6 md:w-7 md:h-7 text-white" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none drop-shadow-md">
          <div className="absolute top-1/2 -mt-1 -right-1 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900" />
          Instagram
        </div>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      >
        <motion.a
          href="https://wa.me/6282125478346?text=Halo%20Sales%201,%20saya%20tertarik%20dengan%20layanan%20Parahita." 
          aria-label="Chat with us on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-xl shadow-green-500/40 overflow-hidden"
        >
          {/* Pulsing rings effect */}
          <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
          
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white z-10" />

          {/* Tooltip */}
          <div className="absolute right-full mr-5 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-xl whitespace-nowrap pointer-events-none">
            <div className="absolute top-1/2 -mt-1.5 -right-1.5 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900" />
            Chat dengan Sales
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}
