import React from 'react';
import { Play } from 'lucide-react';

export function VideoSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-bold tracking-tight">See How We Protect Your Business</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how our virtual security operations center monitors and responds to security events in real-time
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Video Container */}
          <div className="relative aspect-video bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            {/* Thumbnail */}
            <img
              src="https://images.unsplash.com/photo-1724343025504-3afb6d67566b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMG1vbml0b3JpbmclMjBjb250cm9sJTIwcm9vbXxlbnwxfHx8fDE3NzAxNDIyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Security Operations Center"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-[#F5B84A] w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-black ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg">
              <span className="text-white text-xs sm:text-sm">2:30</span>
            </div>
          </div>

          {/* Stats Below Video */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8">
            <div className="text-center p-4 sm:p-5 lg:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 font-bold">24/7</div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Monitoring</div>
            </div>
            <div className="text-center p-4 sm:p-5 lg:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 font-bold">&lt;60s</div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Response Time</div>
            </div>
            <div className="text-center p-4 sm:p-5 lg:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 font-bold">99.9%</div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}