"use client";

import React, { useState, useEffect } from "react";
import { HiSearch, HiMicrophone, HiArrowRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

const suggestions = [
  "Find Dr. Rashid in F.N.C Hospital Lahore",
  "Show cardiologists available in Lahore",
  "Best neurologist in Islamabad",
  "Dentists open near me",
];

export const AISearchBox = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");

  // Typing animation for placeholder
  useEffect(() => {
    if (query) return;
    const currentSuggestion = suggestions[typingIndex % suggestions.length];
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(currentSuggestion.slice(0, i));
      i++;
      if (i > currentSuggestion.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTypingIndex((prev) => prev + 1);
        }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [typingIndex, query]);

  return (
    <div className="relative w-full max-w-4xl mx-auto z-20">
      <div
        className={cn(
          "glass-card p-3 flex items-center gap-4 transition-all duration-300",
          isFocused ? "glow-orange ring-2 ring-primary/20 scale-[1.01] border-primary/30" : "border-white/10"
        )}
      >
        <div className="pl-4 text-3xl text-primary">
          <HiSearch />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder || "Ask our AI: e.g. 'Best heart surgeon in Lahore'"}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-400 py-4 text-lg md:text-xl font-medium"
        />

        <div className="flex items-center gap-2 pr-2">
          <button className="hidden md:flex p-4 rounded-2xl hover:bg-white/5 text-muted hover:text-white transition-colors">
            <HiMicrophone className="text-2xl" />
          </button>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 transition-all glow-orange group">
            SEARCH
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute top-full left-0 w-full mt-4 glass-card p-6 border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-3xl"
          >
            <p className="text-xs font-black text-muted uppercase tracking-[0.2em] mb-6 px-2">
              Suggested AI Queries
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(item)}
                  className="w-full text-left px-5 py-4 rounded-2xl hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-all">
                    <HiSearch size={20} />
                  </div>
                  <span className="text-slate-300 group-hover:text-white font-bold transition-colors">
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
