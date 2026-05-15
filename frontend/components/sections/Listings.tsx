"use client";

import React from "react";
import { motion } from "framer-motion";
import { DoctorCard } from "../cards/DoctorCard";
import { HospitalCard } from "../cards/HospitalCard";
import mockData from "@/data/mockData.json";

export const Listings = () => {
  return (
    <div className="space-y-32">
      {/* Featured Doctors */}
      <section id="doctors" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                Featured <span className="text-primary italic">Doctors</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium">Top-rated specialists available for instant consultation.</p>
            </div>
            <button className="text-primary font-black uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8">
              Explore All Doctors
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {mockData.doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section id="hospitals" className="py-24 px-6 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                Partner <span className="text-primary italic">Hospitals</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium">World-class medical facilities with 24/7 emergency support.</p>
            </div>
            <button className="text-primary font-black uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8">
              View All Facilities
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mockData.hospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const CTA = () => {
  return (
    <section id="join" className="py-24 px-6">
      <div className="max-w-6xl mx-auto glass-card p-16 md:p-28 text-center relative overflow-hidden bg-slate-900 border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blur-[120px] -z-10" />
        
        <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
          Ready to experience the <br />
          <span className="text-gradient-orange">Next Era of Healthcare?</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
          Join thousands of users who have found the right medical care in seconds using our AI assistant.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <button className="btn-primary text-xl px-12 py-5 uppercase tracking-widest">
            START SEARCHING
          </button>
          <button className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xl hover:bg-white/10 transition-all uppercase tracking-widest">
            CONTACT SALES
          </button>
        </div>
      </div>
    </section>
  );
};
