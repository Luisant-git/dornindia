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
      <div className="group bg-white rounded-xl shadow-sm border border-neutral-100/80 p-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden h-full flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00a3e0] to-[#00729e] opacity-80 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-full bg-[#f8fafc] text-[#00a3e0] flex-shrink-0 flex items-center justify-center font-heading font-bold text-xl border-2 border-white shadow-sm relative z-10 mt-1">
            {practitioner.image ? (
              <img src={practitioner.image} alt={practitioner.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(practitioner.name)
            )}
          </div>
          <div className="flex-grow flex flex-col justify-center">
            <h4 className="font-heading font-bold text-lg text-navy mb-0.5 leading-tight">{practitioner.name}</h4>
            {practitioner.designation && <span className="text-xs font-semibold text-[#00a3e0] tracking-wide uppercase">{practitioner.designation}</span>}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3.5 text-xs text-neutral-600 flex-grow border-t border-neutral-100 pt-4">
          {practitioner.batch && (
            <div className="flex flex-col gap-1 text-left">
              <span className="font-semibold text-neutral-400 text-[10px] uppercase tracking-wider">Batch</span>
              <div className="flex items-center gap-2 font-medium text-neutral-700">
                <Calendar size={14} className="text-[#00a3e0]"/> {practitioner.batch}
              </div>
            </div>
          )}
          {practitioner.address && (
            <div className="flex flex-col gap-1 text-left">
              <span className="font-semibold text-neutral-400 text-[10px] uppercase tracking-wider">Location</span>
              <div className="flex items-start gap-2 font-medium text-neutral-700">
                <MapPin size={14} className="text-emerald-500 mt-0.5 flex-shrink-0"/> <span className="leading-snug">{practitioner.address}</span>
              </div>
            </div>
          )}
          {practitioner.date && (
            <div className="flex flex-col gap-1 text-left">
              <span className="font-semibold text-neutral-400 text-[10px] uppercase tracking-wider">Date Added</span>
              <div className="flex items-center gap-2 font-medium text-neutral-700">
                <Calendar size={14} className="text-purple-500"/> {practitioner.date}
              </div>
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
