import React from 'react';
import TutorialCard from '../components/home/TutorialCard';
import { tutorials } from '../data/tutorials';

const Tutorials = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
            Video Tutorials
          </h1>
          <p className="text-lg text-neutral-600 font-light">
            Explore our library of practical DORN Method tutorials, structural alignment guides, and self-help exercises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
