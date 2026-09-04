import React from 'react';
import PageHeader from '../components/common/PageHeader';
import ContactInformation from '../components/about/ContactInformation';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Contact Us" 
        description="Have questions about our trainings or the DORN Method? Reach out to us, and we'll get back to you as soon as possible."
        breadcrumbs={[{ label: 'Contact Us' }]} 
      />
      
      <div className="py-12 bg-white">
        <ContactInformation />
      </div>
    </div>
  );
};

export default Contact;
