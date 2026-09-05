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
            <strong>All certified practitioners in the International Directory voluntarily pledge to uphold this Code of Conduct:</strong><br />
            Our practitioners commit to operating with the utmost integrity to protect their clients' well-being, uphold the prestigious reputation of the Dorn Method, and foster unwavering public confidence.
          </p>

          <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm mb-12">
            <h4 className="font-heading font-semibold text-xl text-dorn mb-6">Certified DORN Practitioners Pledge To:</h4>
            
            <ol className="list-decimal pl-5 space-y-4 text-neutral-700 font-light text-sm md:text-base">
              <li>Dedicate themselves to delivering the highest standard of client care.</li>
              <li>Transparently represent their credentials and only offer services they are fully trained and competent to perform.</li>
              <li>Clearly communicate the scope, benefits, and boundaries of their practice to all clients.</li>
              <li>Recognize situations where the Dorn Method may be unsuitable and promptly refer clients to specialized medical professionals.</li>
              <li>Continuously upgrade their skills and knowledge through ongoing professional development and advanced training.</li>
              <li>Administer care without making unrealistic guarantees, while maintaining a reasonable expectation of positive outcomes.</li>
              <li>Treat every individual with equal respect and conduct all affairs with absolute honesty.</li>
              <li>Never engage in discriminatory behavior toward clients, peers, or other healthcare providers.</li>
              <li>Strictly maintain client confidentiality, releasing records only with explicit permission or when legally mandated.</li>
              <li>Honor the client's fundamental right to decline, pause, or end treatment at any given moment.</li>
              <li>Ensure the treatment environment is always safe, comfortable, and thoroughly private.</li>
              <li>Maintain strict professional boundaries, ensuring they never exploit clients or enter into inappropriate relationships outside the clinical setting.</li>
              <li>Respect the personal beliefs, values, and autonomy of every individual they treat.</li>
              <li>Decline any gifts or incentives intended to compromise their professional judgment or influence referrals.</li>
              <li>Refrain from issuing medical diagnoses or claiming the ability to "cure" diseases unless they hold the appropriate medical licenses.</li>
              <li>Promote their services ethically, avoiding exaggerated claims or disparaging remarks about other therapeutic modalities.</li>
              <li>Educate clients thoroughly by discussing:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Lifestyle choices and postural habits that contribute to discomfort</li>
                  <li>The step-by-step nature of the therapy process</li>
                  <li>Essential self-help techniques to practice after the session</li>
                </ul>
              </li>
              <li>Supply customized written materials to guide clients and remain accessible for subsequent questions.</li>
              <li>Deliver a comprehensive session—typically spanning 30 to 60 minutes—that includes leg length assessment, pelvic alignment, and spinal balancing.</li>
              <li>Exclusively use the term "Dorn Method" when applying its pure principles, avoiding the blending of unrelated therapies that might confuse the client.</li>
              <li>Always respect the client's pain threshold, ensuring therapy remains gentle and tolerable.</li>
              <li>Aim for noticeable improvements within three sessions, re-evaluating the approach if progress stalls.</li>
              <li>Stress the critical importance of daily self-care exercises for at least two months post-treatment to facilitate lasting recovery.</li>
              <li>Properly inform clients about any potential mild reactions following a session and urge them to communicate any concerns immediately.</li>
              <li>Collaborate openly with other healthcare providers to maximize the client's overall well-being.</li>
            </ol>
          </div>

          <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm">
            <h3 className="font-heading font-semibold text-2xl text-neutral-900 mb-6">Practice Standards Agreement</h3>
            <p className="text-neutral-700 mb-6"><strong>As part of their inclusion in the International Directory, practitioners consent to the following operational standards:</strong></p>
            
            <ul className="space-y-4 text-neutral-700 font-light text-sm md:text-base">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Guarantee that their clinical workspace, including waiting areas, reflects a high professional standard and strictly adheres to current Health & Safety protocols.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Prominently display their official certifications and professional credentials.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Maintain meticulous and secure client files, documenting personal details, medical history, and detailed session notes.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Carry comprehensive and appropriate professional insurance, including public liability and professional indemnity coverage.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-dorn mt-2 mr-4 shrink-0"></div>
                <span>Proactively update their Directory profile with any changes to contact information, clinic locations, or new qualifications.</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 p-6 bg-dorn-light/30 border border-dorn-light rounded-xl text-center">
             <p className="text-sm md:text-base text-neutral-700 font-medium">
              » Should you interact with a listed practitioner whose behavior violates these ethical standards, please contact us immediately. We rigorously review all reports to preserve our high standards and will not hesitate to remove non-compliant individuals from our directory.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CodeOfEthics;
