"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/data";

export default function Experiences() {
  return (
    <section id="experiences" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#080F1C]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(42,122,111,0.08),_transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#2A7A6F] mb-3 block">
          What to Do
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight mb-4">
          Every Kind of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7A6F] to-[#E8A84C]">
            Adventure
          </span>
        </h2>
        <p className="text-[#F0EDE8]/50 text-base max-w-lg mx-auto">
          Maharashtra is endlessly varied. Whatever you seek — you'll find it here.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl p-6 bg-[#0A1628] border border-white/8 hover:border-[#E8A84C]/30 transition-all cursor-pointer overflow-hidden"
          >
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top left, ${exp.color}18, transparent 70%)`,
              }}
            />

            <div className="text-4xl mb-4">{exp.icon}</div>
            <h3 className="text-sm font-bold text-[#F0EDE8] mb-2">{exp.title}</h3>
            <p className="text-xs text-[#F0EDE8]/50 leading-relaxed line-clamp-3">{exp.description}</p>
            <div className="mt-4 flex items-center gap-1.5">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${exp.color}22`, color: exp.color }}
              >
                {exp.count}+ trips
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
