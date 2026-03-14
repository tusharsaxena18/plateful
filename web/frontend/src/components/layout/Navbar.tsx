import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ChefHat, Heart, Home, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const location = useLocation();

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

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
  }`;

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'About', path: '/about', icon: <Users size={20} /> },
      ];
    }

    const commonLinks = [
      { name: 'Home', path: '/', icon: <Home size={20} /> },
      { name: 'Map', path: '/map', icon: <Heart size={20} /> },
    ];

    if (currentUser?.role === 'giver') {
      return [
        ...commonLinks,
        { name: 'My Listings', path: '/giver/listings', icon: <ChefHat size={20} /> },
      ];
    } else if (currentUser?.role === 'sharer') {
      return [
        ...commonLinks,
        { name: 'Impact', path: '/sharer/impact', icon: <Heart size={20} /> },
      ];
    } else {
      return [
        ...commonLinks,
        { name: 'My Donations', path: '/donor/dashboard', icon: <Heart size={20} /> },
      ];
    }
  };

  const links = getNavLinks();

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-primary-500"
              >
                Plateful
              </motion.div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition duration-200 flex items-center space-x-1 ${
                  location.pathname === link.path
                    ? 'text-primary-500'
                    : 'text-gray-700 hover:text-primary-500'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition duration-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login" className="btn btn-outline">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-500 transition duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium py-2 flex items-center space-x-2 ${
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : 'text-gray-700'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 py-2 text-gray-700"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" className="btn btn-outline">
                    Log in
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;