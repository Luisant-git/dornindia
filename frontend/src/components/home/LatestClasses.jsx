import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ClassCard from './ClassCard';
import { classes } from '../../data/classes';

const LatestClasses = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle 
          title="Latest Training Classes" 
        />
        
        <div className="space-y-6">
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestClasses;
