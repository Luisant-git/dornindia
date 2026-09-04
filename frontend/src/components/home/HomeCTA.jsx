import React from 'react';
import Button from '../common/Button';

const HomeCTA = () => {
  return (
    <section className="py-24 bg-dorn text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519824145371-2968942e6b23?auto=format&fit=crop&q=80&w=1000')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div className="container-custom relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
          Begin Your DORN Method Journey
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 font-light text-white/90">
          Explore professional training programs, practical tutorials and educational resources.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button to="/trainings" variant="secondary" className="px-8 text-dorn font-bold shadow-lg">
            Explore Trainings
          </Button>
          <Button to="/contact" variant="outline" className="px-8">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
