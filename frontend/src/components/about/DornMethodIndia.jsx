import React from 'react';
import { BookOpen, Users, Video, Target } from 'lucide-react';

const DornMethodIndia = () => {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "DORN Method Education",
      description: "Providing authentic, standardized education on the principles and application of the DORN Method."
    },
    {
      icon: <Users size={24} />,
      title: "Professional Training",
      description: "Comprehensive certification programs for aspiring practitioners and healthcare professionals."
    },
    {
      icon: <Target size={24} />,
      title: "Practical Workshops",
      description: "Hands-on workshops focused on specific techniques, alignment strategies, and self-help."
    },
    {
      icon: <Video size={24} />,
      title: "Educational Resources",
      description: "A growing library of tutorials, articles, and guides to support continuous learning and practice."
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-dorn-light/40 -z-10 rounded-tr-full transform -translate-x-1/3"></div>
      
      <div className="container-custom max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-6">
              Dorn India Platform
            </h2>
            <p className="text-neutral-600 mb-8 text-lg font-light leading-relaxed">
              Our platform serves as the central hub for the DORN Method in India. We are dedicated to spreading awareness, providing high-quality education, and building a community of skilled practitioners.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                <h4 className="font-heading font-semibold text-lg text-neutral-900 mb-2">Accessibility</h4>
                <p className="text-sm text-neutral-600 font-light">The DORN Method and especially its Selfhelp possibilities should be known and freely available to everybody who wants to learn it.</p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                <h4 className="font-heading font-semibold text-lg text-neutral-900 mb-2">Verifiable Information</h4>
                <p className="text-sm text-neutral-600 font-light">To present verifiable information in order to avoid or correct possible misconceptions about DORN.</p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                <h4 className="font-heading font-semibold text-lg text-neutral-900 mb-2">Integration</h4>
                <p className="text-sm text-neutral-600 font-light">To integrate DORN into conventional and complementary medicine for a better health benefit of mankind.</p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                <h4 className="font-heading font-semibold text-lg text-neutral-900 mb-2">The Bigger Picture</h4>
                <p className="text-sm text-neutral-600 font-light">To have DORN Centers in many countries where students can learn DORN for selfhelp or therapeutic purposes.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <img 
              src="https://images.unsplash.com/photo-1519824145371-2968942e6b23?auto=format&fit=crop&q=80&w=1000" 
              alt="DORN Method Education" 
              className="w-full h-[500px] object-cover rounded-xl shadow-lg bg-neutral-200"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DornMethodIndia;
