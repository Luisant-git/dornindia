import React from 'react';
import { Globe, ShieldCheck, Puzzle, Map } from 'lucide-react';

const DornMethodIndia = () => {
  const pillars = [
    {
      icon: <Globe size={28} className="text-dorn" />,
      title: "Accessibility",
      description: "The DORN Method and especially its Selfhelp possibilities should be known and freely available to everybody who wants to learn it."
    },
    {
      icon: <ShieldCheck size={28} className="text-dorn" />,
      title: "Verifiable Information",
      description: "To present verifiable information in order to avoid or correct possible misconceptions about DORN."
    },
    {
      icon: <Puzzle size={28} className="text-dorn" />,
      title: "Integration",
      description: "To integrate DORN into conventional and complementary medicine for a better health benefit of mankind."
    },
    {
      icon: <Map size={28} className="text-dorn" />,
      title: "The Bigger Picture",
      description: "To have DORN Centers in many countries where students can learn DORN for selfhelp or therapeutic purposes."
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-dorn-light/10 -z-10 rounded-bl-full transform translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-neutral-100/50 -z-10 rounded-tr-full transform -translate-x-1/4"></div>
      
      <div className="container-custom max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-dorn font-bold uppercase tracking-widest text-sm mb-4 block">
            OUR MISSION
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
            Dorn India Platform
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl font-light leading-relaxed">
            Our platform serves as the central hub for the DORN Method in India. We are dedicated to spreading awareness, providing high-quality education, and building a community of skilled practitioners.
          </p>
        </div>
        
        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-dorn transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
              
              <div className="w-14 h-14 bg-neutral-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-dorn/10 transition-colors duration-300">
                {pillar.icon}
              </div>
              
              <h3 className="font-heading font-semibold text-2xl text-neutral-900 mb-4">
                {pillar.title}
              </h3>
              
              <p className="text-neutral-600 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default DornMethodIndia;
