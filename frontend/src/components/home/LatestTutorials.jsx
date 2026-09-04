import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TutorialCard from './TutorialCard';
import { tutorials } from '../../data/tutorials';

const LatestTutorials = () => {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <SectionTitle 
          title="Latest Tutorials" 
        />
        
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto -mt-8 font-light text-lg">
          Explore practical DORN Method tutorials and educational videos.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTutorials;
