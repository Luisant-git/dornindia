import React from 'react';

const SectionTitle = ({ label, title, center = true, className = '' }) => {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''} ${className}`}>
      {label && (
        <span className="text-dorn font-bold uppercase tracking-widest text-sm mb-4 block">
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading leading-tight ${className.includes('text-white') ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
