import React from 'react';
import PageHeader from '../components/common/PageHeader';
import InternationalTraining from '../components/about/InternationalTraining';

const LearningDorn = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <PageHeader 
        title="Learning DORN" 
        description="Discover why the DORN Method is one of the most effective holistic therapies you can learn."
        breadcrumbs={[{ label: 'Learning DORN' }]} 
      />
      <InternationalTraining />
    </div>
  );
};

export default LearningDorn;
