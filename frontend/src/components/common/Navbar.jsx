import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Learning DORN', path: '/learning-dorn' },
    { name: 'Directory', path: '/directory' },
    { name: 'Contact', path: '/contact' },
  ];

  const getNavStyle = () => {
    if (!isHome) return 'bg-navy shadow-sm text-white';
    return scrolled ? 'bg-navy shadow-md text-white' : 'bg-transparent text-white';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${getNavStyle()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-heading font-bold text-xl md:text-2xl tracking-wider flex items-center">
              <img src={logoImg} alt="Dorn India Logo" className="h-12 w-auto mr-3 object-contain bg-white rounded-full p-1 shadow-sm" />
              DORN INDIA
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium text-sm tracking-wide transition-all duration-200 ${location.pathname === link.path ? 'text-white underline decoration-dorn decoration-2 underline-offset-8 font-semibold' : 'text-white/90 hover:text-white hover:underline hover:decoration-dorn hover:decoration-2 hover:underline-offset-8'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-20 text-neutral-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 font-medium text-base hover:bg-neutral-50 hover:text-dorn rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
