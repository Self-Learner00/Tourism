"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Compass, CheckCircle2, ArrowUpRight } from "lucide-react";
import { generateTripRecommendation } from "@/lib/data";

const STEPS = [
  {
    id: 1,
    title: "Where do you want to go?",
    subtitle: "Choose your preferred destination type",
    field: "destination",
    options: [
      { value: "Matheran", label: "Matheran", emoji: "⛰️", desc: "Hill station escape" },
      { value: "Mahabaleshwar", label: "Mahabaleshwar", emoji: "🏔️", desc: "Queen of hill stations" },
      { value: "Alibaug", label: "Alibaug", emoji: "🏖️", desc: "Coastal retreat" },
      { value: "Raigad Fort", label: "Raigad Fort", emoji: "🏯", desc: "Heritage & history" },
      { value: "Konkan Coast", label: "Konkan Coast", emoji: "🌊", desc: "Wild Konkan shores" },
      { value: "Lonavala / Khandala", label: "Lonavala", emoji: "🌿", desc: "Valley of mist" },
    ],
  },
  {
    id: 2,
    title: "What's your travel style?",
    subtitle: "We'll match the perfect experience",
    field: "style",
    options: [
      { value: "Adventure", label: "Adventure", emoji: "🧗", desc: "Trekking, climbing, thrills" },
      { value: "Relaxation", label: "Relaxation", emoji: "🧘", desc: "Slow travel, peace, nature" },
      { value: "Culture", label: "Culture", emoji: "🎭", desc: "History, food, local life" },
    ],
  },
  {
    id: 3,
    title: "How long can you travel?",
    subtitle: "Choose your available time",
    field: "duration",
    options: [
      { value: "Weekend (2 Days)", label: "Weekend", emoji: "📅", desc: "2 days / 1 night" },
      { value: "Short Trip (3-4 Days)", label: "Short Trip", emoji: "🗓️", desc: "3–4 days" },
      { value: "Extended Trip (5+ Days)", label: "Extended", emoji: "🌍", desc: "5+ days" },
    ],
  },
];

interface Selections {
  destination: string;
  style: string;
  duration: string;
}

export default function TripPlanner() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({ destination: "", style: "", duration: "" });
  const [result, setResult] = useState<ReturnType<typeof generateTripRecommendation> | null>(null);

  const current = STEPS[step];
  const field = current?.field as keyof Selections;
  const allSelected = selections.destination && selections.style && selections.duration;

  const select = (value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else if (allSelected) {
      const rec = generateTripRecommendation(selections.destination, selections.style, selections.duration);
      setResult(rec);
    }
  };

  const back = () => {
    if (result) { setResult(null); return; }
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setSelections({ destination: "", style: "", duration: "" });
    setResult(null);
  };

  return (
    <section id="planner" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#080F1C]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(42,122,111,0.07),_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#2A7A6F] mb-3 block">Smart Planner</span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight mb-4">
          Build Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7A6F] to-[#E8A84C]">
            Perfect Trip
          </span>
        </h2>
        <p className="text-[#F0EDE8]/50 text-base max-w-lg mx-auto">
          Answer three questions. We'll craft your ideal Maharashtra escape in seconds.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        {!result && (
          <div className="flex gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-gradient-to-r from-[#C4622D] to-[#E8A84C]" : "bg-white/10"}`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {result ? (
            /* ── Result ── */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-[#0D1F35] border border-[#E8A84C]/30 p-8 text-center shadow-2xl shadow-[#E8A84C]/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C4622D] to-[#E8A84C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#C4622D]/30">
                <CheckCircle2 size={28} className="text-white" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#E8A84C] mb-2 block">
                Your Trip Is Ready
              </span>
              <h3 className="text-3xl font-bold text-[#F0EDE8] mb-2">{result.title}</h3>
              <p className="text-[#C4622D] font-semibold mb-1">{result.destination}</p>
              <p className="text-sm text-[#F0EDE8]/60 mb-4">{result.duration}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {result.category.split(" + ").map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold bg-[#C4622D]/15 border border-[#C4622D]/30 text-[#C4622D]">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#F0EDE8]/65 leading-relaxed mb-6 max-w-md mx-auto">{result.description}</p>

              <div className="text-2xl font-bold text-[#E8A84C] mb-8">
                ₹{result.price.toLocaleString()}
                <span className="text-sm font-normal text-[#F0EDE8]/40 ml-1">/ person</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white font-bold text-sm hover:opacity-90 transition shadow-lg cursor-pointer">
                  Explore This Trip <ArrowUpRight size={15} />
                </button>
                <button
                  onClick={reset}
                  className="px-7 py-3 rounded-xl border border-white/15 text-[#F0EDE8]/70 text-sm font-semibold hover:border-[#E8A84C]/40 hover:text-[#E8A84C] transition cursor-pointer"
                >
                  Plan Another Trip
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── Step ── */
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-[#0D1F35] border border-white/8 p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-[#E8A84C] uppercase tracking-widest">
                  Step {step + 1} of {STEPS.length}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#F0EDE8] mb-1">{current.title}</h3>
              <p className="text-sm text-[#F0EDE8]/50 mb-7">{current.subtitle}</p>

              {/* Options grid */}
              <div className={`grid gap-3 mb-8 ${current.options.length > 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-3"}`}>
                {current.options.map((opt) => {
                  const isSelected = selections[field] === opt.value;
                  return (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => select(opt.value)}
                      className={`relative p-4 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-gradient-to-br from-[#C4622D]/20 to-[#E8A84C]/10 border-[#E8A84C]/50 shadow-lg shadow-[#E8A84C]/10"
                          : "bg-[#0A1628] border-white/10 hover:border-[#E8A84C]/30"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#E8A84C] flex items-center justify-center">
                          <CheckCircle2 size={10} className="text-[#0A1628]" />
                        </div>
                      )}
                      <div className="text-2xl mb-2">{opt.emoji}</div>
                      <div className="text-sm font-bold text-[#F0EDE8] mb-0.5">{opt.label}</div>
                      <div className="text-xs text-[#F0EDE8]/45">{opt.desc}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-[#F0EDE8]/60 text-sm font-semibold disabled:opacity-30 hover:border-white/25 hover:text-[#F0EDE8] transition cursor-pointer disabled:cursor-default"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  onClick={next}
                  disabled={!selections[field]}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white text-sm font-bold disabled:opacity-40 hover:opacity-90 transition shadow-lg cursor-pointer disabled:cursor-default"
                >
                  {step === STEPS.length - 1 ? (
                    <><Compass size={15} /> Generate Trip</>
                  ) : (
                    <>Next <ChevronRight size={16} /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
