import React from 'react';
import SectionTitle from '../common/SectionTitle';

const CodeOfEthics = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom max-w-5xl">
        <SectionTitle 
          title="Code of Ethics and Conduct" 
        />
        
        <div className="max-w-4xl mx-auto">
          <p className="text-neutral-700 mb-8 text-center text-lg">
            <strong>All Practitioners listed in the International Directory voluntarily agree to follow the Code of Ethics and Conduct:</strong><br />
            Dorn Method Practitioners agree to act in a manner that safeguards the individual client's interest, enhances the reputation of the Dorn Method and ensures the trust and confidence of the public.
          </p>

          <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm mb-12">
            <h4 className="font-heading font-semibold text-xl text-dorn mb-6">DORN Method Practitioners will:</h4>
            
            <ol className="list-decimal pl-5 space-y-4 text-neutral-700 font-light text-sm md:text-base">
              <li>Commit themselves to give the highest quality of care to their clients.</li>
              <li>Honestly present all qualifications and perform only services in which they are qualified and have competence in.</li>
              <li>Inform clients and the public about the scope and limitations of their discipline to the best of their knowledge.</li>
              <li>Acknowledge any limitations and contraindications of the Dorn Method and refer clients to appropriate health care professionals.</li>
              <li>Maintain and improve professional knowledge and competence including assessment of personal and professional abilities through continued education training in the Dorn Method and other Modalities.</li>
              <li>Provide treatment without making unjust promises and with reasonable expectation that there will be an advantage for the client.</li>
              <li>Respect all clients equally and conduct business with honesty and integrity.</li>
              <li>Not discriminate unjustly against clients, colleagues or other health care professionals.</li>
              <li>Keep all client records confident unless otherwise requested by the client or it is medically necessary or required by law for the protection of the public.</li>
              <li>Respect all rights of the client to refuse, modify or terminate treatment at any time.</li>
              <li>Provide treatment ensuring safety, comfort and privacy of the client.</li>
              <li>Not exploit a Client and whilst treating a Client not to enter into any other relationship, activity or behavior outside of the professional working relationship.</li>
              <li>Respect the client's autonomy with regard to privacy, beliefs and behavior.</li>
              <li>Refuse gifts or benefits intended to influence the treatment, a referral or decision or for personal gain and not for the good of the client.</li>
              <li>Not give a diagnosis, propose to be able to cure any disease or pretend to heal unless properly medically trained and licensed.</li>
              <li>Advertise their services in a proper and professional manner without making excessive claims of expected results, or is biased towards or critical of other Modalities, persons or associations.</li>
              <li>Give sufficient information to the client covering:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>avoidable possible causes of ill health due to poor posture and lifestyle habits</li>
                  <li>the conduct of the therapy</li>
                  <li>self help / self therapy possibilities following a Dorn Method session</li>
                </ul>
              </li>
              <li>Provide written hand out's with personalized advice and guidelines and be available for further advice and assistance.</li>
              <li>Give a full Dorn Method treatment whenever possible including leg length balancing, pelvic re-alignement and spinal rebalancing allowing sufficient treatment time of between 30 minutes and 1 hour.</li>
              <li>Use the Term Dorn Method / Dorn Therapy only if the original principles are applied without mixing different treatment modalities into one therapy session to avoid confusion to the client.</li>
              <li>Not treat beyond the clients personal pain threshold during therapy.</li>
              <li>Strive to achieve improvement of the client's condition within 3 treatment sessions and then re-assess treatment plan before attempting continuation.</li>
              <li>Emphasize the importance of self therapy to the client for a minimum of two month following a Dorn session to allow enough time for self healing.</li>
              <li>Give sufficient information about possible reactions following a Dorn Method session and encourage clients to report any unexpected reaction immediately.</li>
              <li>Cooperate with other health care professionals for the highest possible benefit of the client.</li>
            </ol>
          </div>

          <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm">
            <h3 className="font-heading font-semibold text-2xl text-neutral-900 mb-6">Dorn Method Practice Agreement</h3>
            <p className="text-neutral-700 mb-6"><strong>All Practitioners listed in the International Directory voluntarily agree to follow the Dorn Method Practice agreement:</strong></p>
            
            <ul className="space-y-4 text-neutral-700 font-light text-sm md:text-base">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Ensure that when operating from permanent premises the consulting rooms including any client reception/waiting areas shall be of a professional standard, conforming to the latest Health & Safety Regulations.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Have Certification and Credentials on display</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Keep accurate case notes which record at a minimum a client's personal details, history and therapy progress notes.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Ensure they are appropriately covered by relevant insurance, inlcuding public liability insurance and professional indemnity insurance.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Keep their Dorn Method Practitoner Directory listing up to date with any changes of particulars including address and phone numbers, additional qualifications, etc.</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 p-6 bg-dorn-light/30 border border-dorn-light rounded-xl text-center">
             <p className="text-sm md:text-base text-neutral-700 font-medium">
              » If you encounter a DORN Method Practitioner listed in the International Directory that does not act in line with this Code of Ethics and Conduct feel free to contact us and we will assess the case to ensure highest standards are kept and if necessary take their names off the directory.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CodeOfEthics;
