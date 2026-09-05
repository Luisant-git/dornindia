import React from 'react';
import { instructors, advancedTherapists, generalTherapists } from '../data/therapistsData';
import PractitionerCard from '../components/directory/PractitionerCard';
import PageHeader from '../components/common/PageHeader';

const Directory = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <PageHeader 
        title={<>Dorn Directory <span className="text-dorn">India</span></>}
        description="Find recognized Dorn Method Instructors and Therapists across India."
        breadcrumbs={[{ label: 'Directory' }]} 
      />

      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Disclaimer / Info block */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-100 mb-12">
            <h3 className="text-xl font-heading font-bold text-navy mb-4">Important Information</h3>
            <p className="text-neutral-700 mb-4">
              <strong className="text-dorn-dark">This Directory is not a recommendation about a Therapist; it is only intended as General Information.</strong>
            </p>
            <p className="text-neutral-600 mb-4">
              To be listed in this Directory requires a recommendation (approval) of an authorized DORN Instructor (Minimum a Basic Training plus a review or advanced training must be confirmed).
            </p>
            <div className="bg-dorn-light/30 border-l-4 border-dorn p-4 rounded-r-lg">
              <p className="text-navy text-sm font-medium">
                The path to become a DORN Instructor (tutor):<br/>
                Special Instructor training completed with Dr Subash (AIDHA) or Thomas Zudrell (Head of DORN International), and examination is required to teach DORN!
              </p>
            </div>
          </div>

          {/* Authorized Instructors */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-neutral-200 flex-grow"></div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy text-center">
                Authorized Instructors
              </h2>
              <div className="h-px bg-neutral-200 flex-grow"></div>
            </div>
            
            <p className="text-center text-neutral-600 mb-8 max-w-3xl mx-auto">
              These are presently the only recognized and authorized Dorn Method Instructors in India following all Guidelines established by AHHAI and the Dorn International Department.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {instructors.map((practitioner) => (
                <PractitionerCard key={practitioner.id} practitioner={practitioner} />
              ))}
            </div>
          </div>

          {/* Advanced Therapists */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-neutral-200 flex-grow"></div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy text-center">
                Advanced Therapists
              </h2>
              <div className="h-px bg-neutral-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedTherapists.map((practitioner) => (
                <PractitionerCard key={practitioner.id} practitioner={practitioner} />
              ))}
            </div>
          </div>

          {/* General Directory */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-neutral-200 flex-grow"></div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy text-center">
                Therapist Directory
              </h2>
              <div className="h-px bg-neutral-200 flex-grow"></div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 mb-8 text-center">
              <p className="text-neutral-700 font-medium">
                For the inquiry of any contact details regarding the therapists below, you can contact the following members:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-dorn-dark">
                <span>Dr. K.Subash mani - 9841055297</span>
                <span className="hidden md:inline">•</span>
                <span>Dr. S. Yusuf Moulana - 9994921435</span>
                <span className="hidden md:inline">•</span>
                <span>Dr. K. Sethu Subramanian - 8903216987</span>
              </div>
            </div>
            
            <h3 className="text-xl font-heading font-bold text-navy mb-6">
              Below: Therapist Directory 1 to 970 (2012 --- 2018)
            </h3>
            
            <div className="flex flex-col gap-3">
              {generalTherapists.map((practitioner) => (
                <PractitionerCard key={practitioner.id} practitioner={practitioner} isGeneral={true} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Directory;
