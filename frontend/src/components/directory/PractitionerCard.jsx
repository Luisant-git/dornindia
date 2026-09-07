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
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };

  if (isGeneral) {
    return (
      <div className="group bg-white rounded-xl shadow-sm border border-neutral-100/80 p-5 sm:p-6 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#00a3e0] to-[#00729e] opacity-80 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Avatar & Name */}
        <div className="flex items-center gap-4 sm:min-w-[280px] md:min-w-[340px]">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f8fafc] text-[#00a3e0] flex-shrink-0 flex items-center justify-center font-heading font-bold text-3xl border-2 border-white shadow-sm relative z-10">
            {practitioner.image ? (
              <img src={practitioner.image} alt={practitioner.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(practitioner.name)
            )}
          </div>
          <div>
            <h4 className="font-heading font-bold text-base sm:text-lg text-navy mb-0.5 leading-tight">{practitioner.name}</h4>
            {practitioner.designation && <span className="text-xs font-semibold text-[#00a3e0] tracking-wide uppercase">{practitioner.designation}</span>}
          </div>
        </div>

        {/* Details Divider for Desktop */}
        <div className="hidden sm:block w-px h-10 bg-neutral-200"></div>

        {/* Details */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-sm text-neutral-600 flex-grow w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
          {practitioner.batch && (
            <div className="flex items-center gap-2 font-medium text-neutral-700">
              <Calendar size={15} className="text-[#00a3e0]"/> <span><span className="text-neutral-400 font-normal mr-1.5 hidden md:inline">Batch:</span>{practitioner.batch}</span>
            </div>
          )}
          {practitioner.address && (
            <div className="flex items-start gap-2 font-medium text-neutral-700 max-w-xs">
              <MapPin size={15} className="text-emerald-500 mt-0.5 flex-shrink-0"/> <span><span className="text-neutral-400 font-normal mr-1.5 hidden md:inline">Location:</span>{practitioner.address}</span>
            </div>
          )}
          {practitioner.date && (
            <div className="flex items-center gap-2 font-medium text-neutral-700">
              <Calendar size={15} className="text-purple-500"/> <span><span className="text-neutral-400 font-normal mr-1.5 hidden md:inline">Completed Date:</span>{formatDate(practitioner.date)}</span>
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
