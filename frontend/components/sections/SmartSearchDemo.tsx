"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";
import { DoctorCard } from "../cards/DoctorCard";
import mockData from "@/data/mockData.json";

export const SmartSearchDemo = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left: Content */}
          <div className="flex-1 space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]">
              <HiSparkles />
              <span>LIVE AI ENGINE DEMO</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] text-white tracking-tighter">
              Watch our AI <br />
              <span className="text-primary italic">Solve complex queries</span>
            </h2>
            <div className="space-y-6">
              {[
                { q: "Find Dr. Rashid in F.N.C Hospital Lahore", a: "Analyzing location, specialist database, and live hospital schedules..." },
                { q: "Best cardiologist near me in Lahore", a: "Scanning 500+ cardiologists with verified top ratings in your area..." },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-card p-8 border-l-8 border-primary bg-slate-900/60"
                >
                  <p className="text-white text-xl font-bold mb-3 italic tracking-tight underline decoration-primary/30 underline-offset-8">"{item.q}"</p>
                  <p className="text-slate-400 text-sm flex items-center gap-3 font-medium">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-primary glow-orange"
                    />
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Mock Response Card */}
          <div className="flex-1 w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 blur-[100px] -z-10" />
              <p className="text-xs font-black text-muted mb-6 uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-12 h-[1px] bg-muted/30" />
                AI VERIFIED RESULT
              </p>
              <DoctorCard doctor={mockData.doctors[0]} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
