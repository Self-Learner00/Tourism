"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <section id="testimonials" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#080F1C] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,98,45,0.05),_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D] mb-3 block">Traveller Stories</span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight">
          Real Trips.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4622D] to-[#E8A84C]">
            Real Stories.
          </span>
        </h2>
      </motion.div>

      {/* Carousel */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl bg-[#0D1F35] border border-white/8 p-8 sm:p-10"
          >
            <Quote size={40} className="text-[#C4622D]/20 absolute top-6 left-6" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: TESTIMONIALS[idx].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-[#E8A84C] fill-[#E8A84C]" />
              ))}
            </div>

            {/* Review */}
            <p className="text-lg sm:text-xl text-[#F0EDE8]/85 leading-relaxed mb-8 italic">
              "{TESTIMONIALS[idx].review}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C4622D] to-[#E8A84C] flex items-center justify-center text-white font-bold text-sm">
                  {TESTIMONIALS[idx].avatar}
                </div>
                <div>
                  <p className="font-bold text-[#F0EDE8] text-sm">{TESTIMONIALS[idx].name}</p>
                  <p className="text-xs text-[#F0EDE8]/45">{TESTIMONIALS[idx].city}</p>
                </div>
              </div>
              <span className="hidden sm:block px-3 py-1 rounded-full text-xs font-bold bg-[#C4622D]/15 border border-[#C4622D]/25 text-[#C4622D]">
                {TESTIMONIALS[idx].destination}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#F0EDE8]/60 hover:border-[#E8A84C]/40 hover:text-[#E8A84C] transition cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${i === idx ? "w-6 bg-[#E8A84C]" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#F0EDE8]/60 hover:border-[#E8A84C]/40 hover:text-[#E8A84C] transition cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
