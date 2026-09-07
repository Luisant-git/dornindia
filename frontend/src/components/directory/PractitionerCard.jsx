import React from 'react';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';

const PractitionerCard = ({ practitioner, isGeneral = false, sno }) => {
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  if (isGeneral) {
    return (
      <div className="bg-white px-4 py-6 border-b border-neutral-200 flex flex-row items-start gap-3 sm:gap-6 w-full hover:bg-neutral-50/50 transition-colors">
        {/* Left: S.No */}
        {sno && (
          <div className="font-bold text-lg text-neutral-800 min-w-[30px] sm:min-w-[40px] pt-0.5">
            {sno}.
          </div>
        )}
        
        {/* Center: Details */}
        <div className="flex-grow flex flex-col gap-1.5 pr-2 sm:pr-4">
          <div className="text-[17px] sm:text-lg leading-snug">
            <span className="font-bold text-neutral-900">{practitioner.name}</span>
            {practitioner.designation && <span className="text-neutral-700">, {practitioner.designation}</span>}
          </div>
          
          {practitioner.address && (
            <div className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed break-words">
              {practitioner.address}
            </div>
          )}
          
          <div className="text-neutral-700 text-sm sm:text-[15px] mt-1 font-medium">
            {practitioner.batch && <span>{practitioner.batch} </span>}
            {practitioner.date && <span>Date : {formatDate(practitioner.date)}</span>}
          </div>
        </div>
        
        {/* Right: Image */}
        <div className="flex-shrink-0 w-24 h-32 sm:w-[110px] sm:h-[140px] bg-neutral-100 overflow-hidden border border-neutral-200 shadow-sm">
          {practitioner.image ? (
            <img src={practitioner.image} alt={practitioner.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-neutral-400 bg-neutral-100">
              {getInitials(practitioner.name)}
            </div>
          )}
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
                className="w-16 h-16 rounded-xl object-cover border-2 border-dorn-light"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-dorn-light text-dorn flex items-center justify-center font-heading font-bold text-xl border-2 border-white shadow-sm">
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
                <Calendar size={12} className="mr-1" /> Completed Date: {formatDate(practitioner.date)}
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
