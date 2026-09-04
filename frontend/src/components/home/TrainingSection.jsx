import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TrainingCard from './TrainingCard';
import { trainings } from '../../data/trainings';

const TrainingSection = () => {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <SectionTitle 
          label="OUR TRAININGS" 
          title="Learn the DORN Method Step by Step" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
