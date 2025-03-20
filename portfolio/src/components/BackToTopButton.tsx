'use client';

import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate__animated animate__fadeIn"
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default BackToTopButton; 