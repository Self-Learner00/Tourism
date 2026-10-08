"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative py-32 px-6 sm:px-10 lg:px-20 bg-[#0A1628] overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-r from-[#C4622D]/12 via-[#E8A84C]/8 to-[#2A7A6F]/12 blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,168,76,0.04),_transparent_70%)]" />
      </div>

      {/* Decorative corner mountains (SVG) */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-10 pointer-events-none" viewBox="0 0 1440 120" fill="none">
        <path d="M0 120L240 40L480 80L720 20L960 70L1200 30L1440 60V120H0Z" fill="#E8A84C" />
        <path d="M0 120L180 55L360 85L540 35L720 75L900 25L1080 65L1260 40L1440 80V120H0Z" fill="#C4622D" opacity="0.6" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8A84C] mb-5 block">
            Your Journey Starts Now
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#F0EDE8] leading-tight mb-6">
            Your next adventure is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4622D] via-[#E8A84C] to-[#C4622D]">
              closer than you think.
            </span>
          </h2>
          <p className="text-[#F0EDE8]/55 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            The Sahyadris are calling. The Konkan coast is waiting. Your story in Maharashtra begins with a single click.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#planner")}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white font-bold text-base shadow-2xl shadow-[#C4622D]/30 hover:opacity-95 transition cursor-pointer"
            >
              Plan My Trip
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#destinations")}
              className="px-8 py-4 rounded-xl border border-[#F0EDE8]/20 text-[#F0EDE8] font-bold text-base hover:border-[#E8A84C]/50 hover:bg-white/5 transition cursor-pointer"
            >
              Explore Destinations
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
