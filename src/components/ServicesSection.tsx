import React from 'react';
import { Camera, Eye, Wifi, AlertCircle, Users, Lock } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Virtual Guard Services',
    description: 'Professional security officers remotely monitoring your facility 24/7, providing the same protection as on-site guards at a fraction of the cost.',
    image: 'https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWN1cml0eSUyMGd1YXJkJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NzAxNDIyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Camera,
    title: 'Camera System Installation',
    description: 'State-of-the-art HD and 4K camera systems with night vision, motion detection, and AI-powered analytics for comprehensive coverage.',
    image: 'https://images.unsplash.com/photo-1761491924454-b57bb3323405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXJ2ZWlsbGFuY2UlMjBjYW1lcmFzJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc3MDE0MjIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Eye,
    title: 'Remote Monitoring',
    description: 'Continuous surveillance from our secure operations center with instant alerts and rapid response to any suspicious activity.',
    image: 'https://images.unsplash.com/photo-1766788467067-d443f19314b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG9wZXJhdGlvbnMlMjBjZW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDE0MjIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Wifi,
    title: 'Access Control Systems',
    description: 'Advanced keycard and biometric systems to control who enters your facility, with detailed logging and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1724343025504-3afb6d67566b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMG1vbml0b3JpbmclMjBjb250cm9sJTIwcm9vbXxlbnwxfHx8fDE3NzAxNDIyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: AlertCircle,
    title: 'Emergency Response',
    description: 'Immediate coordination with local law enforcement and emergency services when security threats are detected.',
    image: 'https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWN1cml0eSUyMGd1YXJkJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NzAxNDIyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Lock,
    title: 'Site Security Assessment',
    description: 'Comprehensive evaluation of your security vulnerabilities with customized recommendations to protect your assets.',
    image: 'https://images.unsplash.com/photo-1761491924454-b57bb3323405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXJ2ZWlsbGFuY2UlMjBjYW1lcmFzJTIwaW5zdGFsbGF0aW9ufGVufDF8fHx8MTc3MDE0MjIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function ServicesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-bold tracking-tight">Comprehensive Security Solutions</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From installation to 24/7 monitoring, we provide end-to-end security solutions tailored to your business needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#F5B84A] p-2.5 sm:p-3 rounded-lg">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 font-semibold">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}