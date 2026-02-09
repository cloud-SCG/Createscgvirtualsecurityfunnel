import React from 'react';
import { Phone, Mail } from 'lucide-react';
import logo from 'figma:asset/da23dae556a7184af66fd88b59c6d1866dc2cc68.png';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="SCG Virtual Security" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">PPO#119767</span>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <a href="tel:+18008065422" className="bg-[#F5B84A] text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-[#e5a839] transition-colors text-sm sm:text-base font-semibold inline-flex items-center gap-2">
              <span>📞</span>
              <span>+1 (800) 806-5422</span>
            </a>
            <a href="mailto:Sales@scgvirtualsecurity.com" className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-[#F5B84A] transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">sales@scgvirtualsecurity.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}