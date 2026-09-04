import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TrainingCard = ({ training }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden card-hover flex flex-col h-full">
      <div className="h-48 bg-neutral-200 relative overflow-hidden">
        <img 
          src={training.image} 
          alt={training.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-bold text-dorn uppercase tracking-wider mb-2">
          {training.category}
        </div>
        <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-3">
          {training.title}
        </h3>
        <p className="text-neutral-600 mb-6 flex-grow font-light">
          {training.description}
        </p>
        <Link 
          to="/trainings" 
          className="inline-flex items-center text-dorn font-medium hover:text-dorn-dark transition-colors mt-auto group"
        >
          Learn More 
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default TrainingCard;
