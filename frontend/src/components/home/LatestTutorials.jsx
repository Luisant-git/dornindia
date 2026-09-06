import React, { useState, useEffect } from 'react';
import SectionTitle from '../common/SectionTitle';
import TutorialCard from './TutorialCard';
import { homeApi } from '../../api/homeApi';

const LatestTutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeApi.getLatestTutorials(4)
      .then((data) => {
        const mapped = data.map(t => ({
          id: t.id,
          title: t.title,
          category: t.category,
          uploadDate: t.category || 'Tutorial',
          duration: 'Video',
          description: t.description,
          thumbnail: t.thumbnail,
          videoUrl: t.videoUrl,
        }));
        setTutorials(mapped);
      })
      .catch((error) => console.error('Failed to load tutorials:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <SectionTitle 
          title="Latest Tutorials" 
        />
        
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto -mt-8 font-light text-lg">
          Explore practical DORN Method tutorials and educational videos.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center text-neutral-500 col-span-full">Loading tutorials...</p>
          ) : tutorials.length === 0 ? (
            <p className="text-center text-neutral-500 col-span-full">No tutorials available yet.</p>
          ) : (
            tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestTutorials;
