"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles, Map, Globe2 } from "lucide-react";

const STATS = [
  { val: "50+", label: "Destinations", icon: Map },
  { val: "12K+", label: "Happy Travellers", icon: Sparkles },
  { val: "4.9", label: "Average Rating", icon: Globe2 },
  { val: "8+", label: "Years Local Experience", icon: Compass },
];

export default function ExploreSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="explore" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#080F1C]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(42,122,111,0.08),_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#2A7A6F] mb-4 block">
              Built for Explorers
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F0EDE8] leading-tight mb-6">
              Maharashtra is not a destination.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7A6F] to-[#E8A84C]">
                It's a universe.
              </span>
            </h2>
            <p className="text-[#F0EDE8]/55 text-base leading-relaxed mb-8">
              Over 350 forts. 720 km of coastline. Ancient Buddhist caves. Jungle wildlife corridors.
              Tribal art villages. And the world's most vibrant street food culture.
              <br /><br />
              WanderMaharashtra is your insider guide to all of it.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("#destinations")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white text-sm font-bold hover:opacity-90 transition shadow-lg cursor-pointer"
              >
                Start Exploring →
              </button>
              <button
                onClick={() => scrollTo("#packages")}
                className="px-6 py-3 rounded-xl border border-white/15 text-[#F0EDE8]/75 text-sm font-semibold hover:border-[#E8A84C]/40 hover:text-[#E8A84C] transition cursor-pointer"
              >
                View Packages
              </button>
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-[#0A1628] border border-white/8 hover:border-[#E8A84C]/25 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8A84C]/10 border border-[#E8A84C]/20 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#E8A84C]" />
                  </div>
                  <div className="text-3xl font-bold text-[#F0EDE8] mb-1">{stat.val}</div>
                  <div className="text-xs text-[#F0EDE8]/50 font-semibold uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
