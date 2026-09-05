import React from 'react';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';

const PractitionerCard = ({ practitioner, isGeneral = false }) => {
  // Extract initials for the avatar if no image is provided
  const getInitials = (name) => {
    let nameToUse = name;
    if (name.startsWith('Dr. ')) nameToUse = name.substring(4);
    else if (name.startsWith('Dr ')) nameToUse = name.substring(3);
    
    const parts = nameToUse.split(' ').filter(p => p.length > 0 && p !== '.');
    if (parts.length === 0) return 'D';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (isGeneral) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-10 h-10 rounded-full bg-navy text-white flex-shrink-0 flex items-center justify-center font-heading font-bold text-sm border-2 border-white shadow-sm">
          {practitioner.id}
        </div>
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-baseline md:gap-2 mb-1">
            <h4 className="font-heading font-bold text-lg text-navy">{practitioner.name}</h4>
            <span className="text-sm text-dorn font-semibold">{practitioner.title}</span>
          </div>
          <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-neutral-600">
            {practitioner.address && (
              <span className="flex items-start"><MapPin size={14} className="mr-1 mt-0.5 flex-shrink-0 text-neutral-400"/> {practitioner.address}</span>
            )}
            {practitioner.date && (
              <span className="flex items-center"><Calendar size={14} className="mr-1 flex-shrink-0 text-neutral-400"/> {practitioner.date}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-lg border border-neutral-100 h-full flex flex-col">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            {practitioner.image ? (
              <img 
                src={practitioner.image} 
                alt={practitioner.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-dorn-light"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-dorn-light text-dorn flex items-center justify-center font-heading font-bold text-xl border-2 border-white shadow-sm">
                {getInitials(practitioner.name)}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg md:text-xl text-navy leading-tight mb-1">
              {practitioner.name}
            </h4>
            <p className="text-sm font-semibold text-dorn mb-1">
              {practitioner.title}
            </p>
            {practitioner.date && (
              <p className="text-xs text-neutral-500 flex items-center mt-1">
                <Calendar size={12} className="mr-1" /> Added: {practitioner.date}
              </p>
            )}
          </div>
        </div>

        {practitioner.description && (
          <p className="text-sm text-neutral-600 mb-4 flex-grow italic">
            "{practitioner.description}"
          </p>
        )}

        {!practitioner.description && <div className="flex-grow"></div>}

        <div className="space-y-2 mt-4 pt-4 border-t border-neutral-100 text-sm">
          {practitioner.address && (
            <div className="flex items-start text-neutral-700">
              <MapPin size={16} className="text-dorn mr-2 mt-0.5 flex-shrink-0" />
              <span className="leading-snug">{practitioner.address}</span>
            </div>
          )}
          {practitioner.phone && (
            <div className="flex items-center text-neutral-700">
              <Phone size={16} className="text-dorn mr-2 flex-shrink-0" />
              <a href={`tel:${practitioner.phone.split(',')[0].trim()}`} className="hover:text-dorn transition-colors">
                {practitioner.phone}
              </a>
            </div>
          )}
          {practitioner.email && (
            <div className="flex items-center text-neutral-700">
              <Mail size={16} className="text-dorn mr-2 flex-shrink-0" />
              <a href={`mailto:${practitioner.email}`} className="hover:text-dorn transition-colors break-all">
                {practitioner.email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PractitionerCard;
