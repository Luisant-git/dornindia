import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInformation = () => {
  return (
    <section className="pt-8 pb-16 bg-white text-neutral-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-dorn-light/40 -z-10 rounded-r-full -translate-x-1/3"></div>

      <div className="container-custom">
        <SectionTitle

          title="GET IN TOUCH"
        />


        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* India Office */}
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-dorn-light/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-full bg-dorn-light flex items-center justify-center">
                <MapPin size={22} className="text-dorn" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-dorn">India Office</h3>
            </div>
            <h4 className="text-lg font-heading font-medium mb-6 text-neutral-900">Dr. K. Subash Mani</h4>

            <div className="divide-y divide-neutral-100">
              <div className="flex items-start py-4 first:pt-0">
                <MapPin className="text-dorn mt-1 mr-4 shrink-0" size={22} />
                <div>
                  <h5 className="font-semibold text-neutral-900 mb-1">Address</h5>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    MD(AM) 104-5, T.H. Road,<br />
                    TVT, Chennai 600019,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start py-4">
                <Phone className="text-dorn mt-1 mr-4 shrink-0" size={22} />
                <div>
                  <h5 className="font-semibold text-neutral-900 mb-1">Phone</h5>
                  <p className="text-neutral-600 font-light space-y-1">
                    <a href="tel:+917401016329" className="block hover:text-dorn transition-colors">+91-7401016329</a>
                    <a href="tel:+919841055297" className="block hover:text-dorn transition-colors">+91-9841055297</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start pt-4">
                <Mail className="text-dorn mt-1 mr-4 shrink-0" size={22} />
                <div>
                  <h5 className="font-semibold text-neutral-900 mb-1">Email</h5>
                  <a href="mailto:gksubash6@rediffmail.com" className="text-neutral-600 hover:text-dorn transition-colors font-light break-all">
                    gksubash6@rediffmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* International Office */}
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-dorn-light/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-full bg-dorn-light flex items-center justify-center">
                <Phone size={22} className="text-dorn" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-dorn">International Office</h3>
            </div>
            <h4 className="text-lg font-heading font-medium mb-6 text-neutral-900">Thomas Zudrell</h4>

            <div className="divide-y divide-neutral-100">
              <div className="flex items-start py-4 first:pt-0">
                <MapPin className="text-dorn mt-1 mr-4 shrink-0" size={22} />
                <div>
                  <h5 className="font-semibold text-neutral-900 mb-1">Address</h5>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    Wiesenweg 4/1<br />
                    88353 Kisslegg<br />
                    Germany
                  </p>
                </div>
              </div>

              <div className="flex items-start py-4">
                <Phone className="text-dorn mt-1 mr-4 shrink-0" size={22} />
                <div>
                  <h5 className="font-semibold text-neutral-900 mb-1">Phone</h5>
                  <p className="text-neutral-600 font-light space-y-1">
                    <a href="tel:+49015155634171" className="block hover:text-dorn transition-colors">+49-015155634171</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start pt-4">
                <Mail className="text-dorn mt-1 mr-4 shrink-0" size={22} />
                <div>
                  <h5 className="font-semibold text-neutral-900 mb-1">Email</h5>
                  <a href="mailto:info@dorn-method.com" className="text-neutral-600 hover:text-dorn transition-colors font-light break-all">
                    info@dorn-method.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">


          <div className="bg-dorn-light/30 border border-dorn-light rounded-xl p-6 text-sm text-neutral-700 font-light leading-relaxed shadow-soft">
            <h4 className="font-semibold text-dorn-dark mb-2">Important Disclaimer</h4>
            <span className="font-bold">NOTE:</span> Never try to use the DORN Method on other people without proper training best conducted by an authorized DORN Method Instructor. Although the DORN Method and the Self Help Exercises are very safe if done correctly, the DORN practitioner is not responsible for any consequences resulting from the application during the manual session and Selfhelp exercises. In any case it is advised to consult your doctor first because health problems and back pains may have other causes than misaligned joints and vertebrae and should be checked by a trained medical doctor or other healthcare professional. The DORN Method has certain Limitations that must be cleared prior to any practical application! <span className="font-bold">Remember:</span> The DORN Method is NO Replacement for any other form of medical or non-medical treatment but it can be a very effective complement in an integrative medical system.
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactInformation;
