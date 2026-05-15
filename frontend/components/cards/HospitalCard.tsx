"use client";

import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaHospital } from "react-icons/fa";
import { motion } from "framer-motion";

interface HospitalCardProps {
  hospital: {
    name: string;
    location: string;
    departments: string[];
    emergency: string;
    contact: string;
    image: string;
  };
}

export const HospitalCard = ({ hospital }: HospitalCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="glass-card group overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500"
    >
      <div className="relative h-56">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h3 className="text-3xl font-black text-white tracking-tight">{hospital.name}</h3>
        </div>
      </div>

      <div className="p-8 bg-slate-900/40">
        <div className="flex items-center gap-3 text-slate-300 text-sm font-bold mb-6">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
            <FaMapMarkerAlt />
          </div>
          <span>{hospital.location}</span>
        </div>

        <div className="mb-8">
          <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4">Core Departments</p>
          <div className="flex flex-wrap gap-2">
            {hospital.departments.map((dept, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400 font-bold uppercase tracking-wider"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted uppercase font-black tracking-[0.1em]">24/7 Status</span>
            <span className="text-primary text-sm font-black uppercase mt-1">{hospital.emergency}</span>
          </div>
          <a
            href={`tel:${hospital.contact}`}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary text-white hover:bg-orange-600 transition-all text-xs font-black uppercase tracking-widest glow-orange"
          >
            <FaPhoneAlt size={12} />
            CALL
          </a>
        </div>
      </div>
    </motion.div>
  );
};
