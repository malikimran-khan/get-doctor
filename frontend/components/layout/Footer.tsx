import React from "react";
import Link from "next/link";
import { FaStethoscope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-32 pb-12 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Branding */}
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center glow-orange transition-transform hover:rotate-12">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              GET<span className="text-primary">DOCTOR</span>
            </span>
          </Link>
          <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
            We are revolutionizing healthcare discovery with state-of-the-art AI. Find, verify, and connect with the best medical care instantly.
          </p>
          <div className="flex gap-5">
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all group"
              >
                <Icon className="text-slate-400 group-hover:text-white text-xl transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Platform</h4>
          <ul className="space-y-5">
            {["Search Doctors", "Find Hospitals", "AI Assistant", "Premium Plans"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-slate-400 hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Support</h4>
          <ul className="space-y-5">
            {["Contact Us", "Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-slate-400 hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Contact Info</h4>
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">Office</span>
              <p className="text-white font-bold">123 AI Plaza, Tech Avenue, Lahore</p>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">Email</span>
              <p className="text-white font-bold underline decoration-primary underline-offset-4 decoration-2">support@getdoctor.ai</p>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">Hotline</span>
              <p className="text-white font-bold">+92 (042) 111-222-333</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
          &copy; {new Date().getFullYear()} GetDoctor AI. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          <Link href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
};
