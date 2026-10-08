"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Star, ArrowUpRight, Compass, Layers, RotateCcw, X, Sparkles, Navigation } from "lucide-react";
import { DESTINATIONS, type Destination } from "@/lib/data";

// Dynamically import Map3D for client-side rendering
const Map3D = dynamic(() => import("./Map3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] flex items-center justify-center bg-[#0D1F35]/60 rounded-3xl border border-white/10">
      <div className="flex flex-col items-center gap-3 text-[#E8A84C]">
        <Compass className="w-8 h-8 animate-spin" />
        <span className="text-xs uppercase tracking-widest font-semibold">Initializing 3D Maharashtra Map...</span>
      </div>
    </div>
  ),
});

type Category = "All" | "Mountains" | "Beaches" | "Heritage" | "Adventure" | "Nature" | "Food";
const CATEGORIES: Category[] = ["All", "Mountains", "Beaches", "Heritage", "Adventure", "Nature", "Food"];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

function DestinationCard({
  dest,
  index,
  onView3D,
}: {
  dest: Destination;
  index: number;
  onView3D: (dest: Destination) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0D1F35] border border-white/8 hover:border-[#E8A84C]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#C4622D]/10"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-transparent to-transparent" />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0A1628]/80 backdrop-blur-sm border border-[#E8A84C]/30 text-[#E8A84C]">
          {dest.category}
        </span>
        {dest.featured && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C4622D] text-white">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-[#F0EDE8] leading-tight">{dest.name}</h3>
            <p className="text-xs text-[#C4622D] font-semibold uppercase tracking-wider">{dest.tagline}</p>
          </div>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onView3D(dest);
            }}
            title="Inspect in 3D Map"
            className="w-8 h-8 rounded-full bg-[#E8A84C]/15 border border-[#E8A84C]/30 flex items-center justify-center hover:bg-[#E8A84C] hover:text-[#0A1628] transition-colors"
          >
            <Compass size={14} className="text-[#E8A84C] group-hover:text-inherit" />
          </motion.button>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={11} className="text-[#2A7A6F]" />
          <span className="text-xs text-[#F0EDE8]/50">{dest.location}</span>
        </div>

        <p className="text-xs text-[#F0EDE8]/60 leading-relaxed line-clamp-2 mb-4">{dest.description}</p>

        {/* Highlights tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {dest.highlights.slice(0, 2).map((h) => (
            <span key={h} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#F0EDE8]/60 border border-white/5">
              {h}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-[#E8A84C]" />
              <span className="text-xs text-[#F0EDE8]/60">{dest.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={11} className="text-[#E8A84C] fill-[#E8A84C]" />
              <span className="text-xs font-bold text-[#F0EDE8]">{dest.rating}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#F0EDE8]/40">from</span>
            <span className="text-sm font-bold text-[#E8A84C] ml-1">₹{dest.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationExplorer() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<"grid" | "3d">("3d");
  const [selected3DDest, setSelected3DDest] = useState<Destination | null>(DESTINATIONS[0]);

  const filtered = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchCat = activeCat === "All" || d.category === activeCat;
      const matchQuery =
        query === "" ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.location.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, activeCat]);

  const handleView3D = (dest: Destination) => {
    setSelected3DDest(dest);
    setViewMode("3d");
  };

  const scrollToPlanner = () => {
    const el = document.querySelector("#planner");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="destinations" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#0A1628]">
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#2A7A6F]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D] mb-3 block">
          Interactive Discovery
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight mb-4">
          Explore Maharashtra in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4622D] via-[#E8A84C] to-[#2A7A6F]">
            3D & Detail
          </span>
        </h2>
        <p className="text-[#F0EDE8]/55 text-base max-w-xl mx-auto">
          Rotate the topographic travel map, inspect pins, follow travel routes, or browse curated regional stays.
        </p>
      </motion.div>

      {/* View Mode Toggle & Search Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-6xl mx-auto">
        {/* Toggle Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0D1F35] border border-white/10">
          <button
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
              viewMode === "3d"
                ? "bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white shadow-md shadow-[#C4622D]/20"
                : "text-[#F0EDE8]/60 hover:text-[#F0EDE8]"
            }`}
          >
            <Compass size={14} />
            3D Interactive Map
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white shadow-md shadow-[#C4622D]/20"
                : "text-[#F0EDE8]/60 hover:text-[#F0EDE8]"
            }`}
          >
            <Layers size={14} />
            Destination Grid
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F0EDE8]/40" />
          <input
            type="text"
            placeholder="Search Matheran, Alibaug..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0D1F35] border border-white/10 text-[#F0EDE8] placeholder-[#F0EDE8]/30 text-xs focus:outline-none focus:border-[#E8A84C]/50 transition"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCat === cat
                ? "bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white shadow-md shadow-[#C4622D]/25"
                : "bg-[#0D1F35] border border-white/10 text-[#F0EDE8]/60 hover:border-[#E8A84C]/30 hover:text-[#E8A84C]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── MODE 1: 3D INTERACTIVE MAP ── */}
      {viewMode === "3d" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-6xl mx-auto rounded-3xl bg-[#0D1F35]/90 border border-[#E8A84C]/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* 3D Map Canvas */}
          <div className="h-[560px] w-full relative">
            <Map3D
              selectedDest={selected3DDest}
              onSelectDest={(dest) => setSelected3DDest(dest)}
            />

            {/* Top Overlay Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 bg-[#0A1628]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-[#F0EDE8] pointer-events-auto">
                <Navigation size={13} className="text-[#E8A84C]" />
                <span>Drag to rotate terrain • Scroll to zoom • Click pins</span>
              </div>

              {selected3DDest && (
                <button
                  onClick={() => setSelected3DDest(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A1628]/80 backdrop-blur-md border border-[#E8A84C]/30 text-[#E8A84C] text-xs font-bold hover:bg-[#E8A84C] hover:text-[#0A1628] transition-all cursor-pointer pointer-events-auto"
                >
                  <RotateCcw size={12} />
                  Reset View
                </button>
              )}
            </div>

            {/* Quick Destination Pill selector at top */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 flex gap-2 overflow-x-auto no-scrollbar pb-1 pointer-events-auto max-w-full sm:max-w-xl">
              {filtered.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelected3DDest(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                    selected3DDest?.id === d.id
                      ? "bg-[#E8A84C] text-[#0A1628] border-[#E8A84C] shadow-lg"
                      : "bg-[#0A1628]/85 backdrop-blur-md border-white/10 text-[#F0EDE8]/75 hover:border-[#E8A84C]/40"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>

            {/* Selected Destination Floating Card (Bottom Right) */}
            <AnimatePresence>
              {selected3DDest && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="absolute top-16 right-4 sm:right-6 w-80 sm:w-88 rounded-2xl bg-[#0A1628]/95 backdrop-blur-2xl border border-[#E8A84C]/40 shadow-2xl p-5 text-[#F0EDE8] z-20 pointer-events-auto"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#E8A84C] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E8A84C]/15 border border-[#E8A84C]/30">
                      {selected3DDest.category}
                    </span>
                    <button
                      onClick={() => setSelected3DDest(null)}
                      className="text-[#F0EDE8]/50 hover:text-[#E8A84C] p-1 rounded-md transition"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="flex gap-3 mb-3">
                    <img
                      src={selected3DDest.image}
                      alt={selected3DDest.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#F0EDE8] leading-tight">
                        {selected3DDest.name}
                      </h3>
                      <p className="text-xs text-[#C4622D] font-semibold">{selected3DDest.tagline}</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#F0EDE8]/50 mt-1">
                        <MapPin size={10} className="text-[#2A7A6F]" />
                        {selected3DDest.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#F0EDE8]/70 leading-relaxed mb-3 line-clamp-2">
                    {selected3DDest.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/5 rounded-xl p-2.5 mb-3 border border-white/5">
                    <div>
                      <span className="text-[#F0EDE8]/40 block">Best Season</span>
                      <span className="font-semibold text-[#F0EDE8]">{selected3DDest.bestTime}</span>
                    </div>
                    <div>
                      <span className="text-[#F0EDE8]/40 block">Trip Starting</span>
                      <span className="font-bold text-[#E8A84C]">₹{selected3DDest.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={scrollToPlanner}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white text-xs font-bold hover:opacity-90 transition shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles size={12} />
                      Plan Trip Here
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── MODE 2: DESTINATION GRID ── */}
      {viewMode === "grid" && (
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCat + query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {filtered.map((dest, i) => (
                <DestinationCard
                  key={dest.id}
                  dest={dest}
                  index={i}
                  onView3D={handleView3D}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-4xl mb-4">🗺️</p>
              <p className="text-[#F0EDE8]/50 text-sm">No destinations found matching your criteria.</p>
              <button
                onClick={() => { setQuery(""); setActiveCat("All"); }}
                className="mt-4 text-[#E8A84C] text-sm font-semibold hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
