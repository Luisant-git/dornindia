import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-soft border border-neutral-100 flex flex-col h-full relative">
      <div className="absolute top-6 right-8 text-neutral-200">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
        </svg>
      </div>
      
      <div className="flex mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < testimonial.rating ? "text-yellow-400 fill-current" : "text-neutral-200"} 
          />
        ))}
      </div>
      
      <p className="text-neutral-700 italic mb-8 flex-grow relative z-10 leading-relaxed font-light">
        "{testimonial.feedback}"
      </p>
      
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden mr-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-neutral-900">
            {testimonial.name}
          </h4>
          <p className="text-sm text-neutral-500">
            {testimonial.profession}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
