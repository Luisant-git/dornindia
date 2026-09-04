import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { 
  Heart, 
  Banknote, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  Award, 
  CheckCircle, 
  UserPlus, 
  FileCheck, 
  Headset 
} from 'lucide-react';

const InternationalTraining = () => {
  const reasons = [
    {
      icon: <Heart size={28} />,
      title: "The Dorn Method is a very valuable skill",
      desc: "It helps to free people from Back Pain. Back Pain is likely the single most reason for time missing from work and it costs the economy astronomical amounts of money."
    },
    {
      icon: <Banknote size={28} />,
      title: "Easy & inexpensive to learn",
      desc: "As Dieter Dorn himself once said: The one who does not learn it in a few days will never really understand it. Affordable and short seminars allow the student to successfully apply the newly learned skills."
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Adds to your reputation and career prospects",
      desc: "As a professional health-coach helping people with Back Pain, you will fast gain the respect of your clients. It is common to soon have many word-of-mouth recommendations."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Safe, gentle and Non-manipulative",
      desc: "No cracking of joints. The Dorn Method works in perfect harmony with human nature, being a dynamic cooperation between client and therapist."
    },
    {
      icon: <Briefcase size={28} />,
      title: "Offers a great income possibility",
      desc: "The fast and good results using the Dorn Method will generate better business and increased long-term income potential."
    },
    {
      icon: <Award size={28} />,
      title: "Can make you stand out",
      desc: "Although successfully used for over 35 years in Germany, it is relatively new in other parts of the world. This offers enormous opportunity to establish yourself free from competition."
    },
    {
      icon: <CheckCircle size={28} />,
      title: "The Dorn Method simply works",
      desc: "The constantly growing numbers of Dorn Therapists and successfully treated patients speaks for itself. Many get clients from far places just to experience the Dorn Therapy."
    },
    {
      icon: <UserPlus size={28} />,
      title: "Makes you a true Health-Coach",
      desc: "Together with Prevention and Maintenance you teach your clients how they can manage their condition. You teach others and learn yourself with every person you treat."
    },
    {
      icon: <FileCheck size={28} />,
      title: "Likely to be accredited",
      desc: "In most places around the world the Dorn Method gained accreditation by existing Associations and is accepted by insurances."
    },
    {
      icon: <Headset size={28} />,
      title: "Ongoing help & support",
      desc: "Our goal is not just to offer professional training, but to give on-going support that help Therapists gain more confidence and promote their newly learned therapy."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom max-w-5xl">
        <SectionTitle 
          label="Education"
          title="International Training" 
        />
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-xl text-dorn font-medium mb-4 italic">
            "A Yes to Self Responsibility and a No to Back Pain"
          </p>
          <p className="text-neutral-600 font-light leading-relaxed">
            Thinking about my own experiences I had with the Dorn Method from being a Back Pain Patient until now being an international Dorn Method Instructor I must say that my whole life has changed completely to the better. The gift to help other people in Pain and guide them through an adjustment process that often transformes their life is wonderful and a true blessing.
          </p>
        </div>

        <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-8 text-center">
          10 Reasons to Learn the DORN Method
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 flex items-start group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-dorn shadow-sm border border-neutral-100 shrink-0 mr-4 group-hover:scale-110 transition-transform">
                {reason.icon}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-neutral-900 mb-2">
                  {reason.title}
                </h4>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InternationalTraining;
