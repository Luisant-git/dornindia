import React from 'react';
import ContactInformation from '../components/about/ContactInformation';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-dorn-light py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto font-light">
          Have questions about our trainings or the DORN Method? Reach out to us, and we'll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="py-12 bg-white">
        <ContactInformation />
      </div>
    </div>
  );
};

export default Contact;
