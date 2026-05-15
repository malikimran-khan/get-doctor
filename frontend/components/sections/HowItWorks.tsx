"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiSearch, HiChip, HiCheckCircle } from "react-icons/hi";

const steps = [
  {
    title: "Describe your need",
    desc: "Type or speak your medical requirement in natural language.",
    icon: HiSearch,
    color: "bg-primary"
  },
  {
    title: "AI Analysis",
    desc: "Our AI model analyzes specialization, location, and availability.",
    icon: HiChip,
    color: "bg-secondary"
  },
  {
    title: "Get Results",
    desc: "Receive verified doctor and hospital information instantly.",
    icon: HiCheckCircle,
    color: "bg-primary"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">
            Seamless <span className="text-primary italic">Process</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Finding healthcare should be simple. Here's how we make it happen.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-20 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40 -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative z-10 flex flex-col items-center text-center max-w-sm group"
            >
              <div className={`w-28 h-28 rounded-[2.5rem] ${step.color} flex items-center justify-center text-4xl text-white mb-10 glow-orange transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] shadow-3xl border-4 border-slate-900`}>
                <step.icon />
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">{step.desc}</p>
              
              {/* Step Number Overlay */}
              <span className="absolute -top-6 -right-6 text-9xl font-black text-white/[0.03] pointer-events-none select-none italic group-hover:text-primary/10 transition-colors">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
