import React from 'react';
import Button from '../common/Button';
import { CheckCircle } from 'lucide-react';
import heroImg from '../../assets/dornmethodlogo.png';

const IntroSection = () => {
  const features = [
    "Practical Learning",
    "Professional Training",
    "Self-Help Techniques",
    "Practitioner Education"
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-dorn transform translate-x-4 translate-y-4 rounded-xl -z-10 opacity-20"></div>
              <img 
                src={heroImg} 
                alt="DORN Method practice" 
                className="w-full h-[500px] object-cover rounded-xl shadow-lg bg-neutral-200"
              />
              <div className="hidden absolute inset-0 bg-neutral-200 rounded-xl shadow-lg items-center justify-center text-neutral-500">
                Image Placeholder
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <span className="text-dorn font-bold uppercase tracking-widest text-sm mb-4 block">
              ABOUT THE DORN METHOD
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-neutral-900 mb-6 leading-tight">
              A Practical Approach to Understanding Movement, Balance and Alignment
            </h2>
            <p className="text-neutral-600 mb-8 text-lg leading-relaxed font-light">
              The DORN Method is a holistic manual therapy and true self-help method that focuses on the gentle alignment of the spine and joints. It emphasizes the connection between structure, movement, and overall well-being, providing practical tools for both practitioners and individuals seeking balance.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-dorn mr-3" size={20} />
                  <span className="font-medium text-neutral-800">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button to="/about" variant="primary">
              Learn More About DORN Method
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
