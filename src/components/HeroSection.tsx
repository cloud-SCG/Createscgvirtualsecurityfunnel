import React, { useState } from 'react';
import { Shield, CheckCircle, Clock, DollarSign, Users, Award } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const serviceOptions = [
  'Virtual Guard Services',
  'Camera Systems Installation'
];

const budgetOptions = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Not Sure'
];

export function HeroSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    budget: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check required fields
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid 10-digit US phone number');
      return;
    }

    // Validate email if provided
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address (e.g., Sales@scgvirtualsecurity.com)');
      return;
    }

    setSubmitting(true);

    try {
      // Submit lead to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7e40671b/leads`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            budget: formData.budget
          })
        }
      );

      const data = await response.json();
      console.log('Lead submission response:', data);

      if (!response.ok) {
        console.error('Lead submission error:', data.error);
        toast.error(data.error || 'Submission failed. Please try again.');
        setSubmitting(false);
        return;
      }

      // Success message with the message from backend
      toast.success(data.message || 'Thank you! We\'ll contact you within 24 hours.');
      console.log('Lead submitted successfully:', data.leadId);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        budget: ''
      });
    } catch (error) {
      console.error('Lead submission network error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone input
    if (name === 'phone') {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limitedDigits = digits.slice(0, 10);
      
      // Format the phone number as (XXX) XXX-XXXX
      let formattedPhone = '';
      if (limitedDigits.length > 0) {
        formattedPhone = '(';
        formattedPhone += limitedDigits.slice(0, 3);
        if (limitedDigits.length >= 3) {
          formattedPhone += ') ';
          formattedPhone += limitedDigits.slice(3, 6);
        }
        if (limitedDigits.length >= 6) {
          formattedPhone += '-';
          formattedPhone += limitedDigits.slice(6, 10);
        }
      }
      
      setFormData({
        ...formData,
        [name]: formattedPhone
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!validatePhone(e.target.value)) {
      toast.error('Please enter a valid 10-digit US phone number');
    }
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!validateEmail(e.target.value)) {
      toast.error('Please enter a valid email address (e.g., Sales@scgvirtualsecurity.com)');
    }
  };

  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, ''); // Remove all non-digit characters
    return phoneDigits.length === 10;
  };

  const validateEmail = (email: string) => {
    if (email.trim() === '') return true; // Allow empty email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5B84A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-10 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Side - Text Content */}
          <div className="space-y-4 sm:space-y-5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-[#F5B84A]/20 text-[#F5B84A] px-3 py-1.5 rounded-full border border-[#F5B84A]/30 text-xs sm:text-sm">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Protection Beyond Presence</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold tracking-tight">
                Advanced Virtual Security for Modern Businesses
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
                24/7 remote monitoring, professional virtual guards, and state-of-the-art camera systems to protect your assets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B84A] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm mb-0.5 font-semibold">24/7 Real-Time Monitoring</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Officers watch your premises around the clock</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B84A] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm mb-0.5 font-semibold">Rapid Response</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Action on events in under 60 seconds</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B84A] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm mb-0.5 font-semibold">Cost Effective</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Save up to 60% vs on-site guards</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B84A] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm mb-0.5 font-semibold">Advanced Technology</h3>
                  <p className="text-xs sm:text-sm text-gray-400">AI-powered cameras with analytics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Lead Form */}
          <div className="bg-white text-gray-900 rounded-xl shadow-2xl p-5 sm:p-6 lg:p-7 order-1 lg:order-2">
            <div className="mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-2xl mb-1.5 sm:mb-2 font-bold">Get Your Free Security Assessment</h2>
              <p className="text-xs sm:text-sm text-gray-600">We'll contact you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm mb-1.5 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B84A] focus:border-transparent text-xs sm:text-sm"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm mb-1.5 font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                  onKeyPress={(e) => {
                    // Only allow digits
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  required
                  inputMode="numeric"
                  maxLength={14}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B84A] focus:border-transparent text-xs sm:text-sm"
                  placeholder="(800) 555-1234"
                />
                <p className="text-xs text-gray-500 mt-1">Enter 10-digit US phone number</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm mb-1.5 font-medium">
                  Email <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  inputMode="email"
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B84A] focus:border-transparent text-xs sm:text-sm"
                  placeholder="john@company.com"
                />
                <p className="text-xs text-gray-500 mt-1">Must be a valid email format</p>
              </div>

              <div>
                <label htmlFor="service" className="block text-xs sm:text-sm mb-1.5 font-medium">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B84A] focus:border-transparent appearance-none bg-white text-xs sm:text-sm"
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-xs sm:text-sm mb-1.5 font-medium">
                  Budget Range <span className="text-gray-400">(Optional)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B84A] focus:border-transparent appearance-none bg-white text-xs sm:text-sm"
                >
                  <option value="">Select your budget</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#F5B84A] text-black py-2.5 sm:py-3 rounded-lg hover:bg-[#e5a839] transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Get Your Free Assessment'}
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By submitting, you agree to our privacy policy
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Trust Bar - Stats Section at Bottom */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#F5B84A]/20 p-2 sm:p-3 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#F5B84A]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl mb-0.5 font-bold">24/7</div>
                <div className="text-xs sm:text-sm text-gray-400">Monitoring</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#F5B84A]/20 p-2 sm:p-3 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#F5B84A]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl mb-0.5 font-bold">500+</div>
                <div className="text-xs sm:text-sm text-gray-400">Sites Protected</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#F5B84A]/20 p-2 sm:p-3 rounded-lg">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#F5B84A]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl mb-0.5 font-bold">60%</div>
                <div className="text-xs sm:text-sm text-gray-400">Cost Savings</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#F5B84A]/20 p-2 sm:p-3 rounded-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#F5B84A]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl mb-0.5 font-bold">15 Years</div>
                <div className="text-xs sm:text-sm text-gray-400">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}