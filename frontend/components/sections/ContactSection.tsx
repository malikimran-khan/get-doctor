"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get in <span className="text-primary">Touch</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-md">
                Have questions about our AI platform or need help finding a doctor? Our team is here to assist you 24/7.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: HiMail, label: "Email Us", val: "support@getdoctor.ai" },
                { icon: HiPhone, label: "Call Us", val: "+92 (042) 111-222-333" },
                { icon: HiLocationMarker, label: "Visit Us", val: "123 AI Plaza, Tech Avenue, Lahore" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase font-bold tracking-widest">{item.label}</p>
                    <p className="text-white font-medium">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-8 md:p-12 border-white/10"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted ml-2">Name</label>
                  <input type="text" placeholder="Your Name" className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted ml-2">Email</label>
                  <input type="email" placeholder="Your Email" className="input-field" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted ml-2">Subject</label>
                <input type="text" placeholder="How can we help?" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-muted ml-2">Message</label>
                <textarea rows={4} placeholder="Your Message..." className="input-field resize-none" />
              </div>
              <button className="w-full btn-primary text-lg py-5">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
