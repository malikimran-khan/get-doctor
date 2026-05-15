"use client";

import React from "react";
import { 
  HiSearch, 
  HiOutlineShieldCheck, 
  HiOutlineLightningBolt, 
  HiOutlineClock, 
  HiOutlineMap, 
  HiOutlineThumbUp 
} from "react-icons/hi";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Doctor Search",
    desc: "Find specialists using natural language queries without complex filters.",
    icon: HiSearch,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Verified Data",
    desc: "Every doctor and hospital in our database is verified for authenticity.",
    icon: HiOutlineShieldCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Fast Results",
    desc: "Get instant search results and recommendations in milliseconds.",
    icon: HiOutlineLightningBolt,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Real-Time Availability",
    desc: "Check live timings and available slots for doctor appointments.",
    icon: HiOutlineClock,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Hospital Discovery",
    desc: "Explore top hospitals in your city with detailed department info.",
    icon: HiOutlineMap,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Smart Recommendations",
    desc: "Our AI learns from user queries to suggest the best medical care.",
    icon: HiOutlineThumbUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  }
];

export const Features = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">
            Smart <span className="text-primary">Features</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Cutting-edge technology meets healthcare to provide you with the most seamless experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="glass-card p-10 group border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-8 text-3xl transition-transform group-hover:rotate-12 group-hover:scale-110`}>
                <f.icon />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
