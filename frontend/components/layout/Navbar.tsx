"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { AuthModal } from "../ui/AuthModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "#doctors" },
  { name: "Hospitals", href: "#hospitals" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuth(true);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-5",
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center glow-orange transition-transform group-hover:rotate-12">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              GET<span className="text-primary">DOCTOR</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-muted hover:text-white transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-6">
              <button 
                onClick={() => openAuth("login")}
                className="text-sm font-bold text-white hover:text-primary transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => openAuth("signup")}
                className="px-8 py-3 bg-primary text-white rounded-2xl font-bold transition-all hover:scale-105 glow-orange"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-3xl text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <button 
                  onClick={() => openAuth("login")}
                  className="w-full py-4 text-white font-bold text-lg"
                >
                  Login
                </button>
                <button 
                  onClick={() => openAuth("signup")}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        initialMode={authMode} 
      />
    </>
  );
};
