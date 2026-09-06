import React, { useState, useEffect } from 'react';
import SectionTitle from '../common/SectionTitle';
import ClassCard from './ClassCard';
import { homeApi } from '../../api/homeApi';

const LatestClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeApi.getLatestClasses(3)
      .then((data) => {
        const mapped = data.map(c => ({
          id: c.id,
          title: c.title,
          category: c.category,
          duration: c.duration ? `${c.duration} Days` : '',
          date: c.startDate || c.endDate || '',
          description: c.description,
          image: c.image,
        }));
        setClasses(mapped);
      })
      .catch((error) => console.error('Failed to load classes:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle 
          title="Latest Training Classes" 
        />
        
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-neutral-500">Loading classes...</p>
          ) : classes.length === 0 ? (
            <p className="text-center text-neutral-500">No classes available yet.</p>
          ) : (
            classes.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestClasses;
