'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaTimes, FaAward, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

// Define the certification type to include imageUrl
interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
  imageUrl?: string;
}

// Import certifications data and cast it to the Certification type
const certificationsData = require('@/data/certifications.json') as Certification[];

const CertificatesSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCertificates, setFilteredCertificates] = useState(certificationsData);

  // Set isLoaded to true after component mounts for animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter certificates by issuer
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredCertificates(certificationsData);
    } else {
      setFilteredCertificates(
        certificationsData.filter(cert => 
          cert.issuer.toLowerCase().includes(activeFilter.toLowerCase())
        )
      );
    }
  }, [activeFilter]);

  // Get unique issuers for filter buttons
  const uniqueIssuers = Array.from(new Set(certificationsData.map(cert => cert.issuer)));
  const issuers = ['all', ...uniqueIssuers];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="certificates" className="section-container py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="heading-lg text-center mb-4">Certifications</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Professional certifications and courses I've completed to enhance my skills and knowledge in data science, programming, and analytics.
        </p>
      </motion.div>

      {/* Filter buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {issuers.map((issuer, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(issuer)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === issuer
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {issuer === 'all' ? 'All Certificates' : issuer}
          </button>
        ))}
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {filteredCertificates.map((certification, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="bg-white dark:bg-cardDark rounded-xl shadow-md border border-borderLight dark:border-borderDark overflow-hidden cursor-pointer group"
            onClick={() => setSelectedCertificate(certification)}
          >
            <div className="relative w-full h-48 overflow-hidden">
              {certification.imageUrl ? (
                <Image
                  src={certification.imageUrl}
                  alt={certification.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
                  <FaAward className="text-5xl text-primary/70" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <p className="font-medium">Click to view details</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-textDark dark:text-textLight group-hover:text-primary transition-colors duration-300">{certification.title}</h3>
              <div className="flex items-center mb-1 text-gray-600 dark:text-gray-400">
                <FaUniversity className="mr-2" />
                <p className="font-medium">{certification.issuer}</p>
              </div>
              <div className="flex items-center mb-4 text-gray-500 dark:text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <p>{certification.date}</p>
              </div>
              <p className="text-textDark dark:text-textLight mb-4 line-clamp-2">{certification.description}</p>
              {certification.url && (
                <button 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(certification.url, '_blank');
                  }}
                >
                  View Certificate <FaExternalLinkAlt />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state when no certificates match filter */}
      {filteredCertificates.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">No certificates found for this filter.</p>
          <button 
            onClick={() => setActiveFilter('all')} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Show All Certificates
          </button>
        </motion.div>
      )}

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {selectedCertificate.imageUrl && (
                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      src={selectedCertificate.imageUrl}
                      alt={selectedCertificate.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedCertificate.title}</h3>
                      </div>
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="p-6">
                {!selectedCertificate.imageUrl && (
                  <h3 className="text-2xl font-bold mb-4 text-textDark dark:text-textLight">{selectedCertificate.title}</h3>
                )}
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaUniversity className="mr-2 text-primary" />
                    <p className="font-medium">{selectedCertificate.issuer}</p>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <FaCalendarAlt className="mr-2 text-primary" />
                    <p>{selectedCertificate.date}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-textDark dark:text-textLight">Description</h4>
                  <p className="text-gray-700 dark:text-gray-300">{selectedCertificate.description}</p>
                </div>
                
                {selectedCertificate.url && (
                  <div className="flex justify-center">
                    <a 
                      href={selectedCertificate.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      View Full Certificate <FaExternalLinkAlt />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection; 