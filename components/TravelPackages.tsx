"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Users, Star, Check, ArrowUpRight, Sparkles } from "lucide-react";
import { PACKAGES, type Package } from "@/lib/data";

function PackageModal({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-3xl bg-[#0D1F35] border border-[#E8A84C]/25 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F35] via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0A1628]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#F0EDE8] hover:text-[#E8A84C] transition cursor-pointer"
            >
              <X size={16} />
            </button>
            {pkg.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#C4622D] text-white uppercase tracking-wide">
                {pkg.badge}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-[#F0EDE8] mb-1">{pkg.name}</h3>
              <p className="text-sm text-[#C4622D] font-semibold">{pkg.subtitle}</p>
            </div>

            <p className="text-sm text-[#F0EDE8]/65 leading-relaxed mb-5">{pkg.description}</p>

            {/* Meta */}
            <div className="flex gap-4 mb-5">
              <div className="flex items-center gap-2 text-xs text-[#F0EDE8]/60">
                <Clock size={13} className="text-[#E8A84C]" />
                {pkg.days} Days / {pkg.nights} Nights
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F0EDE8]/60">
                <Star size={13} className="text-[#E8A84C] fill-[#E8A84C]" />
                4.8 Rating
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F0EDE8]/60">
                <Users size={13} className="text-[#E8A84C]" />
                2–8 People
              </div>
            </div>

            {/* Activities */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-[#E8A84C] uppercase tracking-wider mb-2">Activities</h4>
              <div className="flex flex-wrap gap-2">
                {pkg.activities.map((a) => (
                  <span key={a} className="px-3 py-1 rounded-full text-xs bg-[#C4622D]/15 border border-[#C4622D]/30 text-[#C4622D] font-semibold">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Includes */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#E8A84C] uppercase tracking-wider mb-2">Includes</h4>
              <div className="grid grid-cols-2 gap-1">
                {pkg.includes.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-xs text-[#F0EDE8]/70">
                    <Check size={12} className="text-[#2A7A6F]" />
                    {inc}
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-xs text-[#F0EDE8]/40 line-through block">₹{pkg.originalPrice.toLocaleString()}</span>
                <span className="text-2xl font-bold text-[#E8A84C]">₹{pkg.price.toLocaleString()}</span>
                <span className="text-xs text-[#F0EDE8]/40 ml-1">/ person</span>
              </div>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white font-bold text-sm hover:opacity-90 transition shadow-lg cursor-pointer">
                Book This Trip
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PackageCard({ pkg, index, onClick }: { pkg: Package; index: number; onClick: () => void }) {
  const savings = pkg.originalPrice - pkg.price;
  const savingPct = Math.round((savings / pkg.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0D1F35] border border-white/8 hover:border-[#E8A84C]/35 transition-all duration-400 hover:shadow-xl hover:shadow-[#C4622D]/10"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent" />

        {/* Savings badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#2A7A6F] text-white text-[10px] font-bold uppercase">
          Save {savingPct}%
        </div>
        {pkg.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#C4622D] text-white text-[10px] font-bold uppercase">
            {pkg.badge}
          </div>
        )}

        {/* Duration chip */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628]/90 backdrop-blur-sm text-[#F0EDE8] text-[10px] font-bold border border-white/10">
          <Clock size={10} />
          {pkg.days}D / {pkg.nights}N
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#F0EDE8] mb-0.5">{pkg.name}</h3>
        <p className="text-xs text-[#C4622D] font-semibold mb-2">{pkg.subtitle}</p>
        <p className="text-xs text-[#F0EDE8]/55 leading-relaxed line-clamp-2 mb-4">{pkg.description}</p>

        {/* Activities tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.activities.slice(0, 3).map((a) => (
            <span key={a} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0A1628] border border-white/10 text-[#F0EDE8]/60">
              {a}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8">
          <div>
            <span className="text-xs text-[#F0EDE8]/40 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
            <div>
              <span className="text-xl font-bold text-[#E8A84C]">₹{pkg.price.toLocaleString()}</span>
              <span className="text-xs text-[#F0EDE8]/40 ml-1">/ person</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E8A84C] group-hover:gap-2.5 transition-all">
            View Details
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TravelPackages() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  return (
    <section id="packages" className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#0A1628]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(196,98,45,0.07),_transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#C4622D] mb-3 block">Curated Trips</span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0EDE8] leading-tight mb-4">
          Premium{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4622D] to-[#E8A84C]">
            Travel Packages
          </span>
        </h2>
        <p className="text-[#F0EDE8]/50 text-base max-w-xl mx-auto">
          Every detail planned. Every experience curated. Just arrive and explore.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} index={i} onClick={() => setSelectedPkg(pkg)} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-[#F0EDE8]/50">
          <Sparkles size={13} className="text-[#E8A84C]" />
          All packages include local expert guides and 24/7 support
        </div>
      </motion.div>

      {selectedPkg && (
        <PackageModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
      )}
    </section>
  );
}
