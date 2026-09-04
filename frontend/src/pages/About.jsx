import React from 'react';
import PageHeader from '../components/common/PageHeader';
import InstructorProfile from '../components/about/InstructorProfile';
import ProfessionalJourney from '../components/about/ProfessionalJourney';
import DornMethodIndia from '../components/about/DornMethodIndia';
import DornHistory from '../components/about/DornHistory';
import CodeOfEthics from '../components/about/CodeOfEthics';

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <PageHeader 
        title="Dorn Mission & History" 
        description="Since the late 1970s, DORN has helped people around the globe achieve better structural balance and manage back- and joint pain. The DORN Method and its self-help approach is unique and easy to learn."
        breadcrumbs={[{ label: 'About DORN' }]} 
      />
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
