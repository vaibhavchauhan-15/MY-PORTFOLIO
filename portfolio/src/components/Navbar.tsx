'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from '../hooks/useTheme';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingDown = prevScrollPos < currentScrollPos;
      const scrollingUp = prevScrollPos > currentScrollPos;
      
      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      // Update isScrolled state for background opacity
      setIsScrolled(currentScrollPos > 10);
      
      // If we're at the top, always show the navbar
      if (currentScrollPos < 10) {
        setVisible(true);
      } 
      // Hide navbar when scrolling down beyond 300px
      else if (scrollingDown && currentScrollPos > 300 && !isOpen) {
        setVisible(false);
      } 
      // Show navbar when scrolling up
      else if (scrollingUp) {
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isOpen]);

  // Smooth scroll to anchor links
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.getAttribute('href') as string);
        if (targetElement) {
          // Close mobile menu if open
          setIsOpen(false);
          
          const navbarHeight = 80; // Account for fixed header
          const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Update URL without causing a jump
          history.pushState(null, '', target.getAttribute('href'));
        }
      }
    };
    
    document.addEventListener('click', handleSmoothScroll);
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header>
      <motion.nav 
        className="fixed w-full z-50 backdrop-blur-md bg-white/80 dark:bg-bgDark/90 transition-all duration-300 border-b border-gray-200 dark:border-gray-800"
        initial={{ y: 0 }}
        animate={{ 
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full border-2 border-primary shadow-md">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    fill
                    sizes="2.5rem"
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="text-xl font-bold text-textDark dark:text-textLight">
                  Vaibhav <span className="text-primary">Chauhan</span>
                </span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:ml-6">
              <div className="flex space-x-4">
                <NavLink href="#about">About</NavLink>
                <NavLink href="#skills">Skills</NavLink>
                <NavLink href="#detailed-projects">Projects</NavLink>
                <NavLink href="#certificates">Certificates</NavLink>
                <NavLink href="#resume">Resume</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </div>
              
              <button
                onClick={toggleTheme}
                className="ml-6 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent1 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {theme === 'dark' ? (
                    <FaSun className="h-5 w-5" />
                  ) : (
                    <FaMoon className="h-5 w-5" />
                  )}
                </motion.div>
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent1 focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent1 focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Main menu"
              >
                {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll progress indicator */}
        <div className="h-0.5 bg-gray-200 dark:bg-gray-800 w-full absolute bottom-0 left-0">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent1" 
            initial={{ width: '0%' }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden pt-20 bg-white dark:bg-bgDark"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="#skills" onClick={() => setIsOpen(false)}>Skills</MobileNavLink>
              <MobileNavLink href="#detailed-projects" onClick={() => setIsOpen(false)}>Projects</MobileNavLink>
              <MobileNavLink href="#certificates" onClick={() => setIsOpen(false)}>Certificates</MobileNavLink>
              <MobileNavLink href="#resume" onClick={() => setIsOpen(false)}>Resume</MobileNavLink>
              <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// NavLink component for desktop
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href}
      className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent1 group"
    >
      {children}
      <motion.span 
        className="absolute -bottom-0.5 left-0 h-0.5 bg-primary dark:bg-accent1 rounded-full"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </a>
  );
};

// MobileNavLink component for mobile view
const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-3 py-4 text-base font-medium text-center text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      {children}
    </a>
  );
}; 