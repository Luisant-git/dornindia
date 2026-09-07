import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/Logo.png';
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
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 fade-in-soft"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col drawer-slide-in">
            <div className="flex items-center justify-between px-5 h-20 border-b border-neutral-100">
              <Link to="/" onClick={() => setIsOpen(false)} className="font-heading font-bold text-lg text-navy tracking-wide flex items-center">
                <img src={logoImg} alt="Dorn India Logo" className="h-9 w-auto mr-3 object-contain bg-white rounded-full p-0.5 shadow-sm" />
                DORN INDIA
              </Link>
              <button onClick={() => setIsOpen(false)} className="focus:outline-none text-neutral-500 hover:text-navy" aria-label="Close menu">
                <X size={26} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl font-medium text-base transition-colors ${location.pathname === link.path ? 'bg-dorn-light text-dorn-dark font-semibold' : 'text-neutral-700 hover:bg-neutral-50 hover:text-dorn'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-neutral-100">
              <p className="text-xs text-neutral-500 font-light">
                &copy; {new Date().getFullYear()} Dorn India
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
