import React from 'react';
import Button from '../common/Button';
import instructorImg from '../../assets/dr.subashmani.webp';

const InstructorPreview = () => {
  return (
    <section className="section-padding bg-neutral-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-dorn rounded-full mix-blend-screen filter blur-[100px]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <span className="text-dorn uppercase tracking-widest text-sm font-bold mb-4 block">
              Meet Your Instructor
            </span>
            <h2 className="text-4xl md:text-5xl font-heading mb-2 text-white">
              Dr. K. Subash Mani
            </h2>
            <div className="text-xl text-neutral-400 mb-8 font-light">
              Naturopath <span className="mx-2">•</span> DORN Method Head Instructor
            </div>
            
            <p className="text-neutral-300 mb-8 text-lg leading-relaxed font-light">
              Dr. K. Subash Mani is a dedicated practitioner and the primary representative of the DORN Method in India. With extensive experience in naturopathy and manual therapy, he brings a deep understanding of structural alignment and holistic wellness to his teaching.
            </p>
            
            <Button to="/about" variant="primary">
              Know More About Dr. Subash Mani
            </Button>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-dorn transform -translate-x-4 translate-y-4 rounded-xl -z-10"></div>
              <img 
                src={instructorImg} 
                alt="Dr. K. Subash Mani" 
                className="w-full aspect-[4/5] object-cover rounded-xl shadow-2xl border-4 border-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorPreview;
