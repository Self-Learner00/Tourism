"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mountain, Mail, Send, MapPin, Globe, AtSign, PlayCircle } from "lucide-react";

const FOOTER_LINKS = {
  Destinations: ["Matheran", "Mahabaleshwar", "Alibaug", "Lonavala", "Raigad", "Konkan"],
  Experiences: ["Adventure", "Mountains", "Beaches", "Heritage", "Food & Culture", "Weekend Trips"],
  Company: ["About Us", "How It Works", "Careers", "Press", "Contact"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#050D1A] border-t border-white/8 pt-16 pb-8 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C4622D] to-[#E8A84C] flex items-center justify-center shadow-lg">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-[#F0EDE8] tracking-wider text-lg">
                  Wander<span className="text-[#E8A84C]">Maharashtra</span>
                </span>
                <p className="text-[10px] text-[#C4622D] tracking-widest uppercase">Explore the Western Ghats</p>
              </div>
            </div>
            <p className="text-sm text-[#F0EDE8]/50 leading-relaxed mb-5 max-w-xs">
              Maharashtra's premier travel startup. Curated local experiences, expert guides and unforgettable adventures.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-[#F0EDE8]/40 mb-6">
              <MapPin size={12} className="text-[#C4622D]" />
              Mumbai, Maharashtra, India
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {[Globe, AtSign, PlayCircle].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-xl bg-[#0D1F35] border border-white/10 flex items-center justify-center text-[#F0EDE8]/50 hover:text-[#E8A84C] hover:border-[#E8A84C]/30 transition"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8A84C] mb-4">{section}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#F0EDE8]/50 hover:text-[#F0EDE8] hover:translate-x-1 transition-all inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl bg-[#0D1F35] border border-white/8 p-6 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C4622D]/20 border border-[#C4622D]/30 flex items-center justify-center">
                <Mail size={15} className="text-[#C4622D]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F0EDE8]">Get travel inspiration</h4>
                <p className="text-xs text-[#F0EDE8]/45">Weekend escapes, hidden gems and early bird deals.</p>
              </div>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-[#2A7A6F] text-sm font-bold">
                ✓ You're subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 sm:w-56 px-4 py-2.5 rounded-xl bg-[#0A1628] border border-white/10 text-[#F0EDE8] placeholder-[#F0EDE8]/30 text-sm focus:outline-none focus:border-[#E8A84C]/40 transition"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C4622D] to-[#E8A84C] text-white text-sm font-bold hover:opacity-90 transition cursor-pointer"
                >
                  <Send size={13} />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/8">
          <p className="text-xs text-[#F0EDE8]/35">
            © 2025 WanderMaharashtra. Crafted with ❤️ in Mumbai.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Responsible Tourism"].map((t) => (
              <a key={t} href="#" className="text-xs text-[#F0EDE8]/35 hover:text-[#E8A84C] transition">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
