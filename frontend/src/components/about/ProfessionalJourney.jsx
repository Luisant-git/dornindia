import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { Award } from 'lucide-react';

const ProfessionalJourney = () => {
  const milestones = [
    {
      title: "Introduction to DORN Method",
      description: "Began studying the DORN Method, recognizing its potential to complement naturopathic practices with practical structural alignment."
    },
    {
      title: "Advanced Training & Seminars",
      description: "Participated in extensive Dorn Seminars with Thomas Zudrell, deepening expertise in advanced application and self-help techniques."
    },
    {
      title: "AHHAI Affiliation",
      description: "Became the official AHHAI Affiliate Instructor for India, authorized to teach and certify practitioners in the authentic DORN Method."
    },
    {
      title: "Establishing Dorn India",
      description: "Initiated Dorn India to create a formal platform for education, training, and awareness across the country."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom max-w-5xl">
        <SectionTitle 
          title="Professional Journey" 
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-300 before:to-transparent">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-neutral-50 bg-dorn text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Award size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-neutral-100 shadow-sm">
                  <h4 className="font-heading font-semibold text-xl mb-2 text-neutral-900">{milestone.title}</h4>
                  <p className="text-neutral-600 font-light text-sm md:text-base">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalJourney;
