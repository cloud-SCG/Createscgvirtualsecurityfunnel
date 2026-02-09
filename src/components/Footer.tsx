import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from 'figma:asset/da23dae556a7184af66fd88b59c6d1866dc2cc68.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <img src={logo} alt="SCG Virtual Security" className="h-10 w-auto" />
            <span className="text-xs text-gray-500 font-medium">PPO#119767</span>
          </div>
        </div>

        {/* Contact Info - Minimal inline format */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm mb-6">
          <a href="tel:+18008065422" className="flex items-center gap-2 hover:text-[#F5B84A] transition-colors">
            <Phone className="w-4 h-4" />
            <span>+1 (800) 806-5422</span>
          </a>
          <a href="mailto:Sales@scgvirtualsecurity.com" className="flex items-center gap-2 hover:text-[#F5B84A] transition-colors">
            <Mail className="w-4 h-4" />
            <span>Sales@scgvirtualsecurity.com</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>8928 Fulbright Ave, Chatsworth, CA 91311</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            © 2026 SCG Virtual Security. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}