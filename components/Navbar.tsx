"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Mountain, MapPin, Backpack, Star, Info } from "lucide-react";

const NAV_LINKS = [
  { label: "Explore", href: "#explore", icon: Compass },
  { label: "Destinations", href: "#destinations", icon: MapPin },
  { label: "Experiences", href: "#experiences", icon: Star },
  { label: "Trips", href: "#packages", icon: Backpack },
  { label: "About", href: "#culture", icon: Info },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center pointer-events-none`}
      >
        <nav
          className={`w-full max-w-6xl flex items-center justify-between pointer-events-auto px-5 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-[#0A1628]/90 backdrop-blur-2xl border border-[#E8A84C]/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-[#0A1628]/60 backdrop-blur-xl border border-white/10"
          }`}
        >
          {/* Logo */}
          <button onClick={() => handleNav("#hero")} className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C4622D] to-[#E8A84C] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[#F0EDE8] text-sm tracking-wider uppercase">
                Wander<span className="text-[#E8A84C]">Maharashtra</span>
              </span>
              <span className="text-[10px] text-[#C4622D] tracking-widest uppercase font-semibold">
                Explore the Western Ghats
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="px-4 py-2 text-sm font-semibold text-[#F0EDE8]/75 hover:text-[#E8A84C] hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav("#planner")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white text-sm font-bold tracking-wide hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#C4622D]/30 cursor-pointer"
            >
              Plan a Trip
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-[#F0EDE8] hover:bg-white/10 transition cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl bg-[#0A1628]/95 backdrop-blur-2xl border border-[#E8A84C]/20 shadow-2xl p-4 flex flex-col gap-2"
          >
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#F0EDE8]/80 hover:text-[#E8A84C] hover:bg-white/5 transition text-sm font-semibold cursor-pointer"
              >
                <Icon size={16} className="text-[#C4622D]" />
                {label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10">
              <button
                onClick={() => handleNav("#planner")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white text-sm font-bold cursor-pointer"
              >
                Plan a Trip
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
