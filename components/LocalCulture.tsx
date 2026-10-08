"use client";

import { motion } from "framer-motion";
import { CULTURE_ITEMS } from "@/lib/data";

export default function LocalCulture() {
  return (
    <section id="culture" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#0A1628]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(196,98,45,0.06),_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D] mb-3 block">
            Maharashtra's Soul
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight mb-4">
            Beyond the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4622D] to-[#E8A84C]">
              Postcard
            </span>
          </h2>
          <p className="text-[#F0EDE8]/50 text-base max-w-xl">
            Maharashtra's real magic lives in its food, its forts, its festivals and its people. Immerse yourself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CULTURE_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-7 bg-[#0D1F35] border border-white/8 hover:border-[#C4622D]/35 transition-all duration-400 overflow-hidden"
            >
              {/* Corner glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#C4622D]/8 group-hover:bg-[#C4622D]/14 transition-colors duration-500 blur-xl" />

              <div className="text-4xl mb-5">{item.emoji}</div>

              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-[#F0EDE8]">{item.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#C4622D]/15 border border-[#C4622D]/25 text-[#C4622D]">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-[#F0EDE8]/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl border border-[#E8A84C]/20 bg-gradient-to-r from-[#C4622D]/10 to-[#E8A84C]/5 p-8 text-center"
        >
          <p className="text-xl sm:text-2xl font-bold text-[#F0EDE8] leading-relaxed max-w-2xl mx-auto">
            "Maharashtra is not just a state — it's a{" "}
            <span className="text-[#E8A84C]">complete civilisation</span> compressed into mountain, coast, plateau and city."
          </p>
          <p className="text-sm text-[#F0EDE8]/40 mt-4 font-semibold">— WanderMaharashtra Editorial</p>
        </motion.div>
      </div>
    </section>
  );
}
