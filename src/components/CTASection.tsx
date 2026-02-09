import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

export function CTASection() {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Text */}
            <div className="p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-5 lg:mb-6 leading-tight font-bold tracking-tight">
                Ready to Enhance Your Security?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-7 lg:mb-8 leading-relaxed">
                Get a free security assessment and discover how much you can save while improving protection for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={scrollToHero}
                  className="bg-[#F5B84A] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#e5a839] transition-colors inline-flex items-center justify-center gap-2 text-base sm:text-lg font-semibold"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="tel:+18008065422"
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2 text-base sm:text-lg font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </div>
              <div className="mt-6 sm:mt-7 lg:mt-8 pt-6 sm:pt-7 lg:pt-8 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
                  <div>
                    <div className="text-2xl sm:text-3xl text-[#F5B84A] mb-1 font-bold">Free</div>
                    <div className="text-xs sm:text-sm text-gray-400">Assessment</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl text-[#F5B84A] mb-1 font-bold">No</div>
                    <div className="text-xs sm:text-sm text-gray-400">Commitment</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl text-[#F5B84A] mb-1 font-bold">24h</div>
                    <div className="text-xs sm:text-sm text-gray-400">Response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1766788467067-d443f19314b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG9wZXJhdGlvbnMlMjBjZW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDE0MjIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Security Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 to-transparent lg:from-black/80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}