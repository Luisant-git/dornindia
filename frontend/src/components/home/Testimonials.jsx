import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../../data/testimonials';

const Testimonials = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-dorn-light/30 -z-10 rounded-l-full transform translate-x-1/3"></div>
      
      <div className="container-custom">
        <SectionTitle 
          title="What Our Students Say" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
