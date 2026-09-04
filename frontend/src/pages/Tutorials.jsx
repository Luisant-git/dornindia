import React from 'react';
import PageHeader from '../components/common/PageHeader';
import TutorialCard from '../components/home/TutorialCard';
import { tutorials } from '../data/tutorials';

const Tutorials = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <PageHeader 
        title="Self-Help Tutorials" 
        description="Learn self-help exercises and techniques to maintain balance and alignment at home."
        breadcrumbs={[{ label: 'Tutorials' }]} 
      />
      
      <div className="container-custom py-12">
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
