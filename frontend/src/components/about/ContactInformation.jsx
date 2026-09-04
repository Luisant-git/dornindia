import React from 'react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInformation = () => {
  return (
    <section className="section-padding bg-neutral-900 text-white">
      <div className="container-custom">
        <SectionTitle 
          label="GET IN TOUCH" 
          title="Contact Information" 
          className="text-white"
        />
        
        <div className="max-w-4xl mx-auto bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-heading font-semibold mb-8">Dr. K. Subash Mani</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-dorn mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-neutral-300 mb-1">Address</h4>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    MD(AM) 104-5, T.H. Road,<br />
                    TVT, Chennai 600019,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-dorn mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-neutral-300 mb-1">Phone</h4>
                  <p className="text-neutral-400 font-light space-y-1">
                    <span className="block">+91-7401016329</span>
                    <span className="block">+91-9841055297</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-dorn mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-neutral-300 mb-1">Email</h4>
                  <a href="mailto:gksubash6@rediffmail.com" className="text-neutral-400 hover:text-white transition-colors font-light">
                    gksubash6@rediffmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-neutral-800 p-10 md:p-12 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-neutral-700">
            <div className="w-full space-y-4">
              <Button 
                onClick={() => window.location.href = 'tel:+917401016329'} 
                variant="primary" 
                className="w-full flex justify-center py-4"
              >
                <Phone size={18} className="mr-2" /> Call Now
              </Button>
              
              <Button 
                onClick={() => window.location.href = 'mailto:gksubash6@rediffmail.com'} 
                variant="secondary" 
                className="w-full flex justify-center py-4 bg-neutral-700 text-white border-neutral-600 hover:bg-neutral-600"
              >
                <Mail size={18} className="mr-2" /> Send Email
              </Button>
              
              <Button 
                onClick={() => window.open('https://maps.google.com/?q=Chennai+600019+India', '_blank')} 
                variant="outline" 
                className="w-full flex justify-center py-4 border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white"
              >
                <MapPin size={18} className="mr-2" /> View Location
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
