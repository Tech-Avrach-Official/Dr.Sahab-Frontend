import React from "react";
import about from "../../../assets/about.jpg";
import { Zap, Heart, Stethoscope, Clock } from 'lucide-react';


const AboutSection = () => {

    const features = [
    {
      icon: Zap,
      title: 'Quick Response',
      description: 'Receive top-quality medical care advanced treatment',
      bgColor: 'bg-purple-100',
      iconBg: 'bg-purple-50'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Patients first personalized and compassionate care',
      bgColor: 'bg-red-100',
      iconBg: 'bg-red-50'
    },
    {
      icon: Stethoscope,
      title: '50+ Expert Doctors',
      description: 'Experience doctor providing specialized quality',
      bgColor: 'bg-yellow-100',
      iconBg: 'bg-yellow-50'
    },
    {
      icon: Clock,
      title: '24/7 Instant Support',
      description: 'Round-the-clock support for your healthcare',
      bgColor: 'bg-green-100',
      iconBg: 'bg-green-50'
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className=" mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-gray-400 px-3 py-1 rounded-full text-gray-700">
              <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
              <span className="text-lg font-medium">About Us</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Experience Excellence in Medical Care
            </h1>
            
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
              A Stress-Free Dental Experience at Dr. Sahab Clinic. We know that a visit to the dentist can be intimidating. At Dr. Sahab Clinic, Indore, we’ve redesigned the dental experience to be as comfortable and painless as possible. Our clinic is equipped with the latest dental technology to provide precise results in a relaxing environment. Whether you are looking for a complete smile makeover or gentle care for your family, Dr. Sahab and his team are here to guide you every step of the way. Your comfort is our priority, and your smile is our reward.
            </p>
          </div>

          {/* Right Image with Video Overlay */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden group">
              <img 
                src={about}
                alt="Medical professionals at work"
                className="w-full h-full object-cover "
              />
              
            </div>
          </div>

        </div>

        <div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className={`${feature.bgColor} rounded-xl p-8 md:p-6 transition-all duration-300 hover:shadow-xl hover:scale-105`}
              >
                <div className={`${feature.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-800/10`}>
                  <Icon className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;