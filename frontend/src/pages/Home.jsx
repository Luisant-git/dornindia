import React from 'react';
import Hero from '../components/home/Hero';
import IntroSection from '../components/home/IntroSection';
import TrainingSection from '../components/home/TrainingSection';
import LatestClasses from '../components/home/LatestClasses';
import LatestTutorials from '../components/home/LatestTutorials';
import Testimonials from '../components/home/Testimonials';
import InstructorPreview from '../components/home/InstructorPreview';
import HomeCTA from '../components/home/HomeCTA';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <IntroSection />
      <TrainingSection />
      <LatestClasses />
      <LatestTutorials />
      <Testimonials />
      <InstructorPreview />
      <HomeCTA />
    </div>
  );
};

export default Home;
