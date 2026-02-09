import React from 'react';
import { DollarSign, Clock, Shield, Award, Headphones, Zap } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Cost Savings',
    description: 'Save up to 60% compared to traditional on-site security guards while maintaining the same level of protection.'
  },
  {
    icon: Clock,
    title: '24/7 Protection',
    description: 'Round-the-clock monitoring with no gaps in coverage, holidays, or shift changes to worry about.'
  },
  {
    icon: Zap,
    title: 'Rapid Response',
    description: 'Instant alerts and response times under 60 seconds when security events are detected.'
  },
  {
    icon: Shield,
    title: 'Advanced Technology',
    description: 'State-of-the-art AI-powered cameras and analytics that detect threats before they escalate.'
  },
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'All virtual guards are trained, licensed security professionals with years of experience.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Personal account manager and 24/7 customer support to address any concerns immediately.'
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-bold tracking-tight">Why Choose SCG Virtual Security?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            We combine cutting-edge technology with human expertise to deliver superior security solutions
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-7 lg:p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="bg-[#F5B84A]/10 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-5 lg:mb-6">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5B84A]" />
                </div>
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 font-semibold">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-10 sm:mt-12 lg:mt-16 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2 font-bold">500+</div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Sites Protected</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2 font-bold">10M+</div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Hours Monitored</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2 font-bold">99.9%</div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2 font-bold">15 Years</div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Industry Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}