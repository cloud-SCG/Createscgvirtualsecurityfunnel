import React from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { VideoSection } from './VideoSection';
import { ServicesSection } from './ServicesSection';
import { WhyChooseUs } from './WhyChooseUs';
import { StatsSection } from './StatsSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <WhyChooseUs />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
