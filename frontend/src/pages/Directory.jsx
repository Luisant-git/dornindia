import React from 'react';
import { instructors, advancedTherapists, generalTherapists } from '../data/therapistsData';
import PractitionerCard from '../components/directory/PractitionerCard';
import PageHeader from '../components/common/PageHeader';

const Directory = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <PageHeader 
        title="Dorn Directory India"
        description="Find recognized Dorn Method Instructors and Therapists across India."
        breadcrumbs={[{ label: 'Directory India' }]} 
      />

      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Disclaimer / Info block */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-100 mb-12">
            <h3 className="text-xl font-heading font-bold text-navy mb-4">Directory Guidelines</h3>
            <p className="text-neutral-700 mb-4">
              <strong className="text-dorn-dark">Please note that the practitioners listed in this directory are provided for informational purposes only and do not constitute an official endorsement or recommendation.</strong>
            </p>
            <p className="text-neutral-600 mb-4">
              Inclusion in this database requires formal approval from a recognized DORN Instructor. At a minimum, practitioners must have successfully completed foundational training alongside verified advanced coursework or review sessions.
            </p>
            <div className="bg-dorn-light/30 border-l-4 border-dorn p-4 rounded-r-lg">
              <p className="text-navy text-sm font-medium">
                How to achieve Instructor Status:<br/>
                To officially teach the DORN Method, candidates must complete a specialized instructor program under the guidance of Dr. Subash (AIDHA) or Thomas Zudrell (DORN International), culminating in a mandatory examination.
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
              The individuals below are currently the only certified DORN Method Instructors operating in India who adhere strictly to the protocols set forth by AHHAI and DORN International.
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
                Should you require contact information for any of the therapists listed in our general directory, please reach out to our dedicated support team members below:
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
