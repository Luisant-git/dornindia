import React from 'react';
import AboutHero from '../components/about/AboutHero';
import InstructorProfile from '../components/about/InstructorProfile';
import ProfessionalJourney from '../components/about/ProfessionalJourney';
import DornMethodIndia from '../components/about/DornMethodIndia';
import DornHistory from '../components/about/DornHistory';
import CodeOfEthics from '../components/about/CodeOfEthics';

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <AboutHero />
      <div className="bg-white border-b border-neutral-100">
        <DornMethodIndia />
      </div>
      <div className="bg-neutral-50 border-b border-neutral-100">
        <DornHistory />
      </div>
      <div className="bg-white border-b border-neutral-100">
        <CodeOfEthics />
      </div>
      <div className="bg-neutral-50 border-b border-neutral-100">
        <InstructorProfile />
      </div>
      <div className="bg-white pb-20">
        <ProfessionalJourney />
      </div>
    </div>
  );
};

export default About;
