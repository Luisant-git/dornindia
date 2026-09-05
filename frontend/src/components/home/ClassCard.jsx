import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClassCard = ({ classItem }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl border border-neutral-100 overflow-hidden card-hover">
      <div className="md:w-2/5 h-64 md:h-auto bg-neutral-200 relative">
        <img 
          src={classItem.image} 
          alt={classItem.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-dorn uppercase tracking-wider">
          {classItem.category}
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex flex-col justify-center md:w-3/5">
        <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
          {classItem.title}
        </h3>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-neutral-500 text-sm">
            <Calendar size={16} className="mr-2 text-dorn" />
            {classItem.date}
          </div>
          <div className="flex items-center text-neutral-500 text-sm">
            <Clock size={16} className="mr-2 text-dorn" />
            {classItem.duration}
          </div>
        </div>
        
        <p className="text-neutral-600 mb-6 font-light">
          {classItem.description}
        </p>
        
        <div>
          <Link 
            to="/contact" 
            className="inline-flex items-center px-5 py-2.5 border border-dorn text-dorn bg-white hover:bg-dorn hover:text-white rounded-full font-medium transition-colors group"
          >
            Register Class
            <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
