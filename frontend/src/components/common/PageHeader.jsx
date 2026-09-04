import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const PageHeader = ({ title, description, breadcrumbs }) => {
  return (
    <div className="bg-dorn py-10 px-4 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full border-[40px] border-white"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full border-[20px] border-white"></div>
      </div>
      
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
          {title}
        </h1>
        
        {description && (
          <p className="text-dorn-light text-base max-w-2xl mx-auto mb-6 font-light">
            {description}
          </p>
        )}
        
        <nav className="flex items-center justify-center space-x-2 text-sm font-medium text-white/80">
          <Link to="/" className="flex items-center hover:text-white transition-colors">
            <Home size={16} className="mr-1" />
            Home
          </Link>
          
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <ChevronRight size={16} className="text-white/50" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-white">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PageHeader;
