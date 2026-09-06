import React, { useState, useEffect } from 'react';
import SectionTitle from '../common/SectionTitle';
import TestimonialCard from './TestimonialCard';
import { homeApi } from '../../api/homeApi';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeApi.getTestimonials(3)
      .then((data) => {
        setTestimonials(data);
      })
      .catch((error) => console.error('Failed to load testimonials:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-dorn-light/30 -z-10 rounded-l-full transform translate-x-1/3"></div>
      
      <div className="container-custom">
        <SectionTitle 
          title="What Our Students Say" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center text-neutral-500 col-span-full">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-neutral-500 col-span-full">No testimonials available yet.</p>
          ) : (
            testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
