import React from 'react';
import SectionTitle from '../common/SectionTitle';
import instructorImg from '../../assets/dr.subashmani.webp';

const InstructorProfile = () => {
  return (
    <section className="py-16 md:py-24 border-b border-neutral-100">
      <div className="container-custom max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute inset-0 bg-dorn transform -translate-x-4 translate-y-4 rounded-xl -z-10 opacity-20"></div>
                <img 
                  src={instructorImg} 
                  alt="Dr. K. Subash Mani" 
                  className="w-full aspect-[3/4] object-cover rounded-xl shadow-lg bg-neutral-200"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <SectionTitle 
              label="PROFILE" 
              title="Dr. K. Subash Mani" 
              center={false}
              className="mb-8"
            />
            
            <h3 className="text-2xl text-dorn font-semibold mb-8 font-heading">Naturopath</h3>
            
            <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-100 mb-10">
              <ul className="space-y-4 text-neutral-800 font-medium">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                  <span>DORN Method Head Instructor</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                  <span>AHHAI Affiliate Instructor for India</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                  <span>Representative of the German Dorn Association</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                  <span>Initiator of Dorn India</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                  <span>Dorn Seminars with Thomas Zudrell</span>
                </li>
              </ul>
            </div>
            
            <div className="prose prose-lg text-neutral-600 font-light max-w-none">
              <p className="mb-6">
                Dr. K. Subash Mani is a dedicated Naturopath and the leading authority on the DORN Method in India. His approach integrates traditional naturopathic principles with the practical, structural alignment techniques of the DORN Method.
              </p>
              <p className="mb-6">
                As the Head Instructor and AHHAI Affiliate for India, he has been instrumental in bringing authentic DORN Method education to practitioners and individuals seeking holistic wellness across the country.
              </p>
              <p>
                Working closely with international figures like Thomas Zudrell and representing the German Dorn Association, Dr. Subash Mani ensures that the training provided in India maintains the highest global standards of practice and ethics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorProfile;
