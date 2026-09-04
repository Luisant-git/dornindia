import React from 'react';
import PageHeader from '../components/common/PageHeader';
import TrainingCard from '../components/home/TrainingCard';
import { trainings } from '../data/trainings';

const Trainings = () => {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="DORN Trainings" 
        description="Join our professional training programs to master the DORN Method."
        breadcrumbs={[{ label: 'Trainings' }]} 
      />

      <div className="container-custom pb-20">
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
