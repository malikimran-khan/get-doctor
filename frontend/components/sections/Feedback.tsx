"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus, HiStar } from "react-icons/hi";
import mockData from "@/data/mockData.json";

export const Testimonials = () => {
  return (
    <section className="py-32 px-6 bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">
            Patient <span className="text-primary">Voice</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Real stories from people who found the right care with GetDoctor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {mockData.testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 flex flex-col justify-between border-white/5 hover:border-primary/20 transition-all"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <HiStar key={i} className="text-orange-500 text-xl" />
                  ))}
                </div>
                <p className="text-white text-xl font-bold leading-relaxed italic mb-8 tracking-tight">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-xl text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-black text-white text-lg">{t.name}</h4>
                  <p className="text-[10px] text-muted uppercase font-black tracking-[0.2em]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const faqs = [
  {
    q: "How does the AI search work?",
    a: "Our system uses advanced Natural Language Processing to understand your medical needs. It maps your query to our database of verified doctors and hospitals to find the most relevant match based on specialization, location, and availability."
  },
  {
    q: "Is the doctor information verified?",
    a: "Yes, every doctor and healthcare provider on our platform undergoes a strict verification process. We ensure all medical licenses and hospital affiliations are authentic."
  },
  {
    q: "Can I book appointments through the site?",
    a: "Currently, we provide contact information and direct links to hospital booking systems. Real-time appointment booking within the platform is coming soon!"
  },
  {
    q: "Is my search history private?",
    a: "Absolutely. We prioritize user privacy and use industry-standard encryption to protect all search data. We do not share your medical queries with third parties."
  }
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">
          Common <span className="text-primary italic">Questions</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-medium">
          Everything you need to know about GetDoctor.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card overflow-hidden border-white/5 hover:border-white/10 transition-all">
            <button
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="w-full px-10 py-8 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-xl md:text-2xl font-black text-white tracking-tight">{faq.q}</span>
              <div className="text-primary text-3xl">
                {activeIndex === i ? <HiMinus /> : <HiPlus />}
              </div>
            </button>
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-10 pb-10 text-slate-400 text-lg leading-relaxed font-medium"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
