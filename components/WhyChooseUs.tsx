"use client";

import { motion } from "framer-motion";
import { Shield, Leaf, Users, Map, BadgeCheck, Heart } from "lucide-react";

const VALUES = [
  { icon: Map, title: "Local Expertise", desc: "Born and raised in Maharashtra. We know every hidden trail, every authentic dhaba, every lesser-known viewpoint.", color: "#C4622D" },
  { icon: Heart, title: "Curated Experiences", desc: "No cookie-cutter itineraries. Every trip is handpicked for quality, authenticity and unforgettable memories.", color: "#E8A84C" },
  { icon: BadgeCheck, title: "Trusted Partners", desc: "Vetted local guides, family-run guesthouses and responsible operators — people we personally trust.", color: "#2A7A6F" },
  { icon: Users, title: "Personalised Trips", desc: "Tell us what you love. We'll design an experience that fits your pace, budget and travel style perfectly.", color: "#C4622D" },
  { icon: Shield, title: "Transparent Pricing", desc: "No hidden fees. No surprise charges. The price you see is the price you pay — guaranteed.", color: "#E8A84C" },
  { icon: Leaf, title: "Responsible Tourism", desc: "We work with local communities, support sustainable practices and leave every destination better than we found it.", color: "#2A7A6F" },
];

const STEPS = [
  { num: "01", title: "Discover", desc: "Browse destinations, read real stories and explore Maharashtra's hidden gems — all in one place." },
  { num: "02", title: "Choose", desc: "Filter by terrain, experience type and duration. Pick the perfect trip or build your own with our Trip Planner." },
  { num: "03", title: "Customise", desc: "Tell us your preferences. We'll tailor accommodation, activities and pace to match your ideal journey." },
  { num: "04", title: "Explore", desc: "Arrive with a curated itinerary, a dedicated local guide and 24/7 support. Just explore and enjoy." },
];

export default function WhyChooseUs() {
  return (
    <>
      {/* ── Why Choose Us ── */}
      <section id="why-us" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#080F1C]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,168,76,0.05),_transparent_60%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8A84C] mb-3 block">Why WanderMaharashtra</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight mb-4">
            Travel Smarter.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A84C] to-[#C4622D]">
              Explore Deeper.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {VALUES.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl bg-[#0A1628] border border-white/8 hover:border-[#E8A84C]/25 transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${val.color}20`, border: `1px solid ${val.color}35` }}
                >
                  <Icon size={20} style={{ color: val.color }} />
                </div>
                <h3 className="text-base font-bold text-[#F0EDE8] mb-2">{val.title}</h3>
                <p className="text-sm text-[#F0EDE8]/55 leading-relaxed">{val.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#0A1628]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#2A7A6F] mb-3 block">The Process</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight mb-4">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7A6F] to-[#E8A84C]">
              Works
            </span>
          </h2>
          <p className="text-[#F0EDE8]/50 text-base max-w-lg mx-auto">
            Four simple steps from idea to adventure.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#E8A84C]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative text-center flex flex-col items-center"
              >
                {/* Number circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C4622D] to-[#E8A84C] flex items-center justify-center mb-5 shadow-xl shadow-[#C4622D]/30 font-bold text-lg text-white"
                >
                  {s.num}
                </motion.div>
                <h3 className="text-lg font-bold text-[#F0EDE8] mb-2">{s.title}</h3>
                <p className="text-sm text-[#F0EDE8]/55 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
