"use client";

import React from "react";
import { FaStar, FaMapMarkerAlt, FaRegClock, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface DoctorCardProps {
  doctor: {
    name: string;
    specialization: string;
    hospital: string;
    city: string;
    timings: string;
    rating: number;
    reviews: number;
    availability: string;
    image: string;
  };
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="glass-card group overflow-hidden flex flex-col h-full border-white/5 hover:border-primary/30 transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        <div className="absolute top-5 right-5">
          <span
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border shadow-2xl",
              doctor.availability.includes("Available")
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-orange-500/20 text-orange-400 border-orange-500/30"
            )}
          >
            {doctor.availability}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1 bg-slate-900/40">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
              {doctor.name}
            </h3>
            <p className="text-primary font-bold text-sm uppercase tracking-wider mt-1">{doctor.specialization}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl shadow-inner">
            <FaStar className="text-orange-500 text-xs" />
            <span className="text-white text-xs font-black">{doctor.rating}</span>
          </div>
        </div>

        <div className="space-y-4 mt-4 flex-1">
          <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
              <FaMapMarkerAlt />
            </div>
            <span>{doctor.hospital}, {doctor.city}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
              <FaRegClock />
            </div>
            <span>{doctor.timings}</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
          <button className="text-xs font-black text-white/60 hover:text-white uppercase tracking-widest transition-colors">
            Profile
          </button>
          <button className="bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all glow-orange flex items-center gap-2 shadow-2xl">
            <FaCalendarCheck />
            BOOK NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
};
