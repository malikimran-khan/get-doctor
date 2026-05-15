"use client";

import React from "react";
import { motion } from "framer-motion";
import { AISearchBox } from "../search/AISearchBox";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] pt-40 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black tracking-[0.3em] uppercase mb-10 inline-block backdrop-blur-md">
            AI-POWERED HEALTHCARE REVOLUTION
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] text-white">
            Find the Best <br />
            <span className="text-gradient-orange italic">Doctor & Hospital</span> <br />
            with Smart AI
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            Stop searching, start finding. Use our advanced AI to discover top specialists, 
            check real-time availability, and get instant healthcare answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AISearchBox />
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24"
        >
          {[
            { label: "Verified Doctors", value: "5,000+" },
            { label: "Partner Hospitals", value: "300+" },
            { label: "Cities Covered", value: "50+" },
          ].map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-primary transition-colors">{stat.value}</h3>
              <p className="text-[10px] md:text-xs text-muted font-black uppercase tracking-[0.4em]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none mix-blend-overlay" />
    </section>
  );
};
