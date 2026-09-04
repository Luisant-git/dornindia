import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden card-hover group cursor-pointer border border-neutral-100 flex flex-col h-full">
      <div className="relative h-56 bg-neutral-200 overflow-hidden">
        <img 
          src={tutorial.thumbnail} 
          alt={tutorial.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <PlayCircle size={64} className="text-white/90 transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {tutorial.duration}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-dorn uppercase tracking-wider">
            {tutorial.category}
          </span>
          <span className="text-xs text-neutral-500">
            {tutorial.uploadDate}
          </span>
        </div>
        
        <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-2 line-clamp-2">
          {tutorial.title}
        </h3>
        
        <p className="text-neutral-600 text-sm font-light line-clamp-3">
          {tutorial.description}
        </p>
      </div>
    </div>
  );
};

export default TutorialCard;
