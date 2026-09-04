import React from 'react';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neutral-900/70 z-10"></div>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center object-cover opacity-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000')", backgroundColor: "#1F1F1F" }}
        />
      </div>

      <div className="container-custom relative z-20 w-full py-20 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white uppercase tracking-wider leading-tight mb-8">
            Intl. Dorn Practitioner<br />
            <span className="text-dorn">- Directory & Training</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed font-light italic">
            Professional DORN Method training, educational resources and practical tutorials for practitioners and learners in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/about" className="rounded-full tracking-wide text-sm px-8" variant="primary">
              Learn More
            </Button>
            <Button to="/trainings" className="rounded-full tracking-wide text-sm px-8" variant="outline">
              Explore Trainings
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
