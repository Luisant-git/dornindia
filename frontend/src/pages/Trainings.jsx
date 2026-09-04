import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import TrainingCard from '../components/home/TrainingCard';
import { trainings } from '../data/trainings';

const Trainings = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
            DORN Method Trainings
          </h1>
          <p className="text-lg text-neutral-600 font-light">
            Comprehensive education programs for practitioners and individuals seeking to master the DORN Method.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainings;
