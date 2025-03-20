'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

// Project data based on your actual projects
const projects = [
  {
    id: 1,
    title: 'Real Estate Management Website',
    description: 'A comprehensive real estate platform for property listings, management, and transactions.',
    longDescription: 'This real estate management website provides a complete solution for property listings, management, and transactions. Features include property search with advanced filtering, user accounts for buyers and sellers, property listing management, appointment scheduling, and transaction tracking. The platform is designed to be user-friendly and efficient for both property seekers and real estate professionals.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Maps API', 'JWT Authentication', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
    documentationUrl: '/documents/projects/REAL STATE MANAGENMENT WEBSITE SCREENSHOTS',
  },
  {
    id: 2,
    title: 'Netflix Data Analysis',
    description: 'A data analysis project exploring Netflix content trends and viewer preferences using Tableau.',
    longDescription: 'This data analysis project explores Netflix content trends and viewer preferences using Tableau. The analysis includes content distribution by country, genre popularity over time, viewer demographics, and content rating distribution. The insights from this analysis can help content creators and marketers understand what types of content perform well on streaming platforms and how viewer preferences vary across different demographics.',
    technologies: ['Tableau', 'Data Analysis', 'Data Visualization', 'SQL', 'Excel'],
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
    documentationUrl: '/documents/projects/Netflix.twb',
  },
  {
    id: 3,
    title: 'General Election Analysis',
    description: 'A data visualization project analyzing election results and voting patterns using Power BI.',
    longDescription: 'This data visualization project analyzes election results and voting patterns using Power BI. The analysis includes voter turnout by region, party performance comparison, demographic voting trends, and historical election data comparison. The interactive dashboards allow users to explore the data and gain insights into voting behavior and election outcomes.',
    technologies: ['Power BI', 'Data Analysis', 'Data Visualization', 'SQL', 'Excel'],
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
    documentationUrl: '/documents/projects/GENERAL ELECTION-1.pbix',
  },
  {
    id: 4,
    title: 'Sales Dashboard',
    description: 'A business intelligence dashboard for sales data analysis and performance tracking using Power BI.',
    longDescription: 'This business intelligence dashboard provides comprehensive sales data analysis and performance tracking using Power BI. The dashboard includes sales trends over time, product performance analysis, regional sales comparison, customer segmentation, and sales team performance metrics. The interactive visualizations allow business users to gain actionable insights and make data-driven decisions to improve sales performance.',
    technologies: ['Power BI', 'Business Intelligence', 'Data Analysis', 'Data Visualization', 'SQL'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
    documentationUrl: '/documents/projects/BI SALE DASHBOARD.pbix',
  },
];

// Enhanced 3D Card component with more realistic tilt physics
const Tilt3DCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.1, 0.9]);
  const shadow = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["0 20px 40px rgba(0,0,0,0.3)", "0 5px 15px rgba(0,0,0,0.1)"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Get position of mouse relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate the position in normalized coordinates (-0.5 to 0.5)
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: shadow,
        filter: `brightness(${brightness})`,
      }}
      className="card overflow-hidden transition-all duration-300 backdrop-blur-sm"
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-full relative overflow-hidden">
        {/* Reflective highlight overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 z-10 pointer-events-none"
          style={{ 
            rotateX: useTransform(mouseYSpring, [-0.5, 0.5], ["-5deg", "5deg"]),
            rotateY: useTransform(mouseXSpring, [-0.5, 0.5], ["5deg", "-5deg"]),
            translateZ: "2px"
          }}
        />

        {/* Main content - pushed forward in 3D space */}
        <div style={{ transform: "translateZ(75px)" }} className="h-full relative z-20">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default function DetailedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="detailed-projects" className="section-container bg-pattern py-24 relative overflow-hidden">
      {/* Background 3D elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent1/5 rounded-full filter blur-[100px] animate-float opacity-70 z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-accent2/5 to-accent3/5 rounded-full filter blur-[120px] animate-float opacity-70 z-0" style={{ animationDelay: '2s' }}></div>
      
      <motion.h2 
        className="heading-lg-center mb-16 text-center relative z-10" 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>
      
      <div className="space-y-24 relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="perspective-1000"
          >
            <Tilt3DCard>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority={index === 0}
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:hidden">
                    <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
                <div className="p-8 relative group">
                  {/* 3D Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent1/10 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-accent2/10 to-accent3/10 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <h3 className="heading-md mb-4 text-textDark dark:text-textLight gradient-text">{project.title}</h3>
                  <p className="text-textDark dark:text-textLight mb-6">
                    {project.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-textDark dark:text-textLight">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md rounded-full text-sm text-textDark dark:text-textLight transition-all duration-300 hover:-translate-y-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <motion.a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Live Demo
                    </motion.a>
                    <motion.a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 border border-borderLight dark:border-borderDark rounded-md bg-white dark:bg-cardDark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm text-textDark dark:text-textLight"
                    >
                      <FaGithub /> GitHub
                    </motion.a>
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-primary hover:text-accent1 transition-colors duration-300"
                    >
                      View Details <FaExternalLinkAlt size={14} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </motion.div>
        ))}
      </div>
      
      {/* Project Modal with enhanced 3D effect */}
      {selectedProject && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, rotateX: 5 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="bg-white dark:bg-cardDark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            style={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)", 
              transformStyle: "preserve-3d", 
              perspective: "1000px" 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-borderLight dark:border-borderDark flex justify-between items-center">
              <h3 className="text-xl font-semibold gradient-text">{selectedProject.title}</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6 relative h-64 sm:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden group">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-textDark dark:text-textLight">Project Overview</h4>
                <p className="text-textDark dark:text-textLight">
                  {selectedProject.longDescription}
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-textDark dark:text-textLight">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md rounded-full text-sm text-textDark dark:text-textLight transition-all duration-300 hover:-translate-y-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href={selectedProject.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Live Demo
                </motion.a>
                <motion.a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 border border-borderLight dark:border-borderDark rounded-md bg-white dark:bg-cardDark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm text-textDark dark:text-textLight"
                >
                  <FaGithub /> GitHub
                </motion.a>
                <motion.a 
                  href={selectedProject.documentationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 border border-borderLight dark:border-borderDark rounded-md bg-white dark:bg-cardDark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm text-textDark dark:text-textLight"
                >
                  Documentation
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}