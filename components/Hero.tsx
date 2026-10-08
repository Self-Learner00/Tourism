"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";

// Lazy load the 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
} as const;

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#0A1628]"
    >
      {/* 3D Scene — full bleed background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A1628]/70 via-transparent to-[#0A1628]/90 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A1628]/80 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen px-6 sm:px-10 lg:px-20 pt-28 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Label */}
          <motion.div variants={itemVariant} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8A84C]/40 bg-[#E8A84C]/10 text-[#E8A84C] text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A84C] animate-pulse" />
              Maharashtra's Premier Travel Startup
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariant}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-[#F0EDE8] mb-6"
          >
            Where the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4622D] via-[#E8A84C] to-[#C4622D]">
              Ghats
            </span>
            <br />
            Meet the{" "}
            <span className="text-[#2A7A6F]">Sea.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariant}
            className="text-base sm:text-lg text-[#F0EDE8]/65 leading-relaxed max-w-lg mb-10"
          >
            Discover the raw beauty of Maharashtra — from misty Sahyadri peaks to untouched
            Konkan shores. Curated experiences crafted for the modern explorer.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariant} className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#destinations")}
              className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white font-bold text-sm tracking-wide hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-[#C4622D]/30 cursor-pointer"
            >
              Explore Destinations
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              onClick={() => scrollTo("#planner")}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#F0EDE8]/25 text-[#F0EDE8] font-bold text-sm tracking-wide hover:border-[#E8A84C]/60 hover:bg-white/5 transition-all cursor-pointer"
            >
              <Play size={15} className="text-[#E8A84C]" />
              Plan My Trip
            </button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={itemVariant}
            className="mt-14 flex gap-8 items-center"
          >
            {[
              { val: "50+", label: "Destinations" },
              { val: "4.9★", label: "Avg Rating" },
              { val: "12K+", label: "Happy Travellers" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl font-bold text-[#E8A84C]">{val}</span>
                <span className="text-xs text-[#F0EDE8]/50 font-semibold uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#explore")}
      >
        <span className="text-[10px] text-[#F0EDE8]/40 uppercase tracking-widest font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#E8A84C]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
