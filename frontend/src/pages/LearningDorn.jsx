import React from 'react';
import InternationalTraining from '../components/about/InternationalTraining';

const LearningDorn = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <div className="bg-white border-b border-neutral-100 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
          Learning DORN
        </h1>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto font-light">
          Discover why the DORN Method is one of the most effective holistic therapies you can learn.
        </p>
      </div>
      <InternationalTraining />
    </div>
  );
};

export default LearningDorn;
