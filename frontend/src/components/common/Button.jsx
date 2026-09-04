import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, to, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-full transition-all duration-300";
  
  const variants = {
    primary: "border-transparent text-white bg-dorn hover:bg-dorn-dark shadow-sm hover:shadow",
    secondary: "border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50",
    outline: "border-white text-white hover:bg-white hover:text-neutral-900",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
