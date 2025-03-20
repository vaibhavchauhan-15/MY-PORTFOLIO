'use client';

import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowDown, FaChartLine, FaBrain, FaCode, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import DetailedProjectsSection from '@/components/DetailedProjectsSection';
import CertificatesSection from '@/components/CertificatesSection';
import ResumeSection from '@/components/ResumeSection';
import DataVisualization, { NeuralNetworkAnimation, MatrixAnimation } from '@/components/DataVisualization';
import { AIBrain, AIButton, AICard, AISectionHeading, DataStatCard } from '@/components/AIElements';
import DataDashboardSection from '@/components/DataDashboardSection';
import ThreeDBackground, { GradientOrbs, ParticleBackground, CircuitPattern } from '@/components/3DBackground';
import LoopingHeadline from '@/components/LoopingHeadline';

// Project data for the original projects section
const projects = [
  {
    title: 'Student Analytics Dashboard',
    description: 'A dynamic Power BI dashboard to analyze student grades and attendance trends. Improved student performance tracking through interactive visualizations.',
    imageUrl: '/images/projects/student-analytics.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
  },
  {
    title: 'Data Visualization Portfolio',
    description: 'A collection of data visualization projects using Python libraries like Matplotlib, Seaborn, and Pandas for analyzing and presenting complex datasets.',
    imageUrl: '/images/projects/data-visualization.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
  },
  {
    title: 'Machine Learning Models',
    description: 'Implementation of various machine learning algorithms using Scikit-learn for classification, regression, and clustering problems.',
    imageUrl: '/images/projects/machine-learning.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
  },
  {
    title: 'SQL Database Project',
    description: 'Designed and implemented a relational database system with MySQL for efficient data storage and retrieval with optimized queries.',
    imageUrl: '/images/projects/sql-database.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
  },
  {
    title: 'Python Data Analysis',
    description: 'Data analysis projects using Python to clean, transform, and analyze datasets to extract meaningful insights and patterns.',
    imageUrl: '/images/projects/python-analysis.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js, TypeScript, and TailwindCSS featuring dark mode and smooth animations.',
    imageUrl: '/images/projects/portfolio-website.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/vaibhavchauhan-15',
  }
];

// Define icon components map for skills
const iconComponents: Record<string, JSX.Element> = {
  'database': <FaDatabase />,
  'chart-line': <FaChartLine />,
  'brain': <FaBrain />,
  'code': <FaCode />,
  // Add other icons as needed
};

// Skills data with additional description field
const skills = [
  {
    name: 'Python',
    category: 'Programming',
    level: 90,
    icon: 'code',
    description: 'Proficient in Python programming with focus on data analysis and machine learning'
  },
  {
    name: 'SQL',
    category: 'Data Science',
    level: 85,
    icon: 'database',
    description: 'Expert in SQL queries, database management, and data manipulation'
  },
  {
    name: 'Power BI',
    category: 'Data Science',
    level: 80,
    icon: 'chart-line',
    description: 'Creating interactive dashboards and visualizations for data analysis'
  },
  {
    name: 'Machine Learning',
    category: 'Machine Learning',
    level: 75,
    icon: 'brain',
    description: 'Experience with classification, regression, and clustering algorithms'
  },
  {
    name: 'Neural Networks',
    category: 'Machine Learning',
    level: 70,
    icon: 'brain',
    description: 'Building and training neural networks for complex pattern recognition'
  },
  {
    name: 'Data Visualization',
    category: 'Data Science',
    level: 85,
    icon: 'chart-line',
    description: 'Creating effective visual representations of complex data sets'
  },
  {
    name: 'Statistical Analysis',
    category: 'Data Science',
    level: 80,
    icon: 'chart-line',
    description: 'Applying statistical methods to extract insights from data'
  },
  {
    name: 'Web Development',
    category: 'Programming',
    level: 75,
    icon: 'code',
    description: 'Creating responsive web applications with modern frameworks'
  },
  // Python & Libraries
  {
    name: 'NumPy',
    category: 'Python & Libraries',
    level: 90,
    icon: 'code',
    description: 'Efficient numerical computations and array operations for data science'
  },
  {
    name: 'Pandas',
    category: 'Python & Libraries',
    level: 88,
    icon: 'database',
    description: 'Data manipulation and analysis for structured datasets'
  },
  {
    name: 'Matplotlib',
    category: 'Python & Libraries',
    level: 85,
    icon: 'chart-line',
    description: 'Creating static, interactive, and publication-quality visualizations'
  },
  {
    name: 'Scikit-learn',
    category: 'Python & Libraries',
    level: 82,
    icon: 'brain',
    description: 'Implementing machine learning models and pipelines for predictive analytics'
  },
  {
    name: 'TensorFlow',
    category: 'Python & Libraries',
    level: 75,
    icon: 'brain',
    description: 'Building and training deep learning models for computer vision and NLP'
  },
  {
    name: 'PyTorch',
    category: 'Python & Libraries',
    level: 72,
    icon: 'brain',
    description: 'Developing research-oriented deep learning solutions with dynamic computation'
  },
  // Database & Big Data
  {
    name: 'MySQL',
    category: 'Database & Big Data',
    level: 88,
    icon: 'database',
    description: 'Designing and optimizing relational database schemas and queries'
  },
  {
    name: 'PostgreSQL',
    category: 'Database & Big Data',
    level: 82,
    icon: 'database',
    description: 'Advanced database management with focus on data integrity and performance'
  },
  {
    name: 'MongoDB',
    category: 'Database & Big Data',
    level: 78,
    icon: 'database',
    description: 'Working with NoSQL databases for flexible schema design and scalability'
  },
  {
    name: 'Apache Spark',
    category: 'Database & Big Data',
    level: 75,
    icon: 'database',
    description: 'Processing large-scale data using distributed computing frameworks'
  },
  {
    name: 'Hadoop',
    category: 'Database & Big Data',
    level: 70,
    icon: 'database',
    description: 'Managing and analyzing big data with distributed storage and processing'
  },
  // Tools & Technologies
  {
    name: 'Tableau',
    category: 'Tools & Technologies',
    level: 85,
    icon: 'chart-line',
    description: 'Creating interactive data visualizations and business intelligence dashboards'
  },
  {
    name: 'Git',
    category: 'Tools & Technologies',
    level: 88,
    icon: 'code',
    description: 'Version control and collaborative development workflow management'
  },
  {
    name: 'Docker',
    category: 'Tools & Technologies',
    level: 77,
    icon: 'code',
    description: 'Containerizing applications for consistent deployment across environments'
  },
  {
    name: 'AWS',
    category: 'Tools & Technologies',
    level: 75,
    icon: 'database',
    description: 'Cloud computing services for data storage, processing, and deployment'
  },
  {
    name: 'Jupyter Notebooks',
    category: 'Tools & Technologies',
    level: 90,
    icon: 'code',
    description: 'Interactive computing environment for data exploration and documentation'
  },
  // Programming & Algorithms
  {
    name: 'Data Structures',
    category: 'Programming & Algorithms',
    level: 85,
    icon: 'code',
    description: 'Implementing efficient data organizations for optimal algorithmic solutions'
  },
  {
    name: 'Algorithms',
    category: 'Programming & Algorithms',
    level: 83,
    icon: 'code',
    description: 'Designing and optimizing computational procedures for problem-solving'
  },
  {
    name: 'Object-Oriented Programming',
    category: 'Programming & Algorithms',
    level: 87,
    icon: 'code',
    description: 'Building modular, maintainable, and extensible software systems'
  },
  {
    name: 'Time Complexity Analysis',
    category: 'Programming & Algorithms',
    level: 80,
    icon: 'code',
    description: 'Evaluating and optimizing algorithm efficiency and performance'
  }
];

export default function Home() {
  return (
    <div className="bg-bgLight dark:bg-bgDark">
      {/* Hero Section with data science and AI theme */}
      <section className="section-container min-h-[90vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* 3D Background */}
        <ThreeDBackground variant="combined" />
        
        {/* Neural network animation in background */}
        <NeuralNetworkAnimation />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <motion.div 
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AIBrain className="text-7xl mb-2" />
          </motion.div>
          
          <motion.h1 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-data pb-2">
              Vaibhav Chauhan
            </span>
            <motion.div
              className="mt-2 text-lg sm:text-xl text-textDark dark:text-textLight font-mono overflow-hidden w-full inline-block"
            >
              <LoopingHeadline 
                titles={["Data Scientist", "ML Engineer", "AI Developer"]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={1500}
                className="font-medium"
              />
            </motion.div>
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-10 text-textDark dark:text-textLight leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Transforming <span className="font-semibold gradient-text">complex data</span> into <span className="font-semibold gradient-text">actionable insights</span> through <span className="font-semibold gradient-text">machine learning</span> and <span className="font-semibold gradient-text">AI solutions</span>. Proficient in <span className="font-semibold gradient-text">Python</span>, <span className="font-semibold gradient-text">data visualization</span>, and <span className="font-semibold gradient-text">statistical analysis</span>.
          </motion.p>
          
          {/* AI-themed stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <DataStatCard 
              value={10} 
              label="Projects" 
              icon={<FaChartLine className="text-primary dark:text-accent1 text-xl" />} 
            />
            <DataStatCard 
              value={5} 
              label="ML Models" 
              icon={<FaBrain className="text-primary dark:text-accent1 text-xl" />} 
            />
            <DataStatCard 
              value={8} 
              label="Datasets Analyzed" 
              icon={<FaDatabase className="text-primary dark:text-accent1 text-xl" />} 
            />
            <DataStatCard 
              value={12} 
              label="Technologies" 
              icon={<FaCode className="text-primary dark:text-accent1 text-xl" />} 
            />
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <AIButton icon="brain" onClick={() => document.getElementById('detailed-projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Projects
            </AIButton>
            <AIButton icon="robot" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Connect With Me
            </AIButton>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 z-10"
        >
          <motion.a 
            href="#about" 
            className="flex flex-col items-center text-textDark dark:text-textLight hover:text-primary dark:hover:text-primary transition-colors"
            whileHover={{ y: -3 }}
          >
            <span className="mb-2 font-mono text-sm">Explore More</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaArrowDown className="text-xl" />
            </motion.div>
          </motion.a>
        </motion.div>
      </section>

      {/* About Section with data science context */}
      <section id="about" className="section-container bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* 3D Background */}
        <ThreeDBackground variant="shapes" />
        
        {/* Background data matrix animation */}
        <MatrixAnimation />
        
        {/* 3D background elements */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-circuit-pattern opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-circuit-pattern opacity-5"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-primary/5 to-accent1/5 rounded-full filter blur-[100px] animate-pulse-slow opacity-60"></div>
        
        <AISectionHeading className="mb-16">
          About Me
        </AISectionHeading>
        
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AICard className="p-8">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Data Science Journey</h3>
              <p className="mb-4 text-textDark dark:text-textLight">I'm a B.Tech in Computer Science and Engineering student at Parul University, Vadodara with a strong foundation in data analysis and visualization. I specialize in creating insightful dashboards using Power BI and SQL, with experience in Python, data structures, and algorithms.</p>
            <p className="mb-4 text-textDark dark:text-textLight">
              My passion lies in transforming complex data into meaningful insights that drive decision-making. I've worked on various projects including real estate management systems, content analysis dashboards, and election data visualizations.
            </p>
            <p className="mb-6 text-textDark dark:text-textLight">
                I'm constantly learning and expanding my skills in data science and machine learning, seeking opportunities to apply my analytical abilities to solve real-world problems using AI and ML solutions.
            </p>
            <div className="flex gap-4 mb-6">
                <motion.a 
                  href="https://github.com/vaibhavchauhan-15" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl text-textDark dark:text-textLight hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                <FaGithub />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/vaibhavchauhan15/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl text-textDark dark:text-textLight hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                <FaLinkedin />
                </motion.a>
                <motion.a 
                  href="https://x.com/VaibhavCh_15" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl text-textDark dark:text-textLight hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                <FaTwitter />
                </motion.a>
                <motion.a 
                  href="mailto:vaibhavchauhan.contactme@gmail.com" 
                  className="text-2xl text-textDark dark:text-textLight hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                <FaEnvelope />
                </motion.a>
            </div>
              <AIButton icon="chart" onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Resume
              </AIButton>
            </AICard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="perspective-1000">
              <motion.div 
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Circuit board pattern overlay */}
                <div className="absolute inset-0 bg-circuit-pattern opacity-10 z-10"></div>
                
              <Image
                src="/images/profile.jpg"
                alt="Vaibhav Chauhan"
                fill
                  sizes="(max-width: 768px) 18rem, (max-width: 1024px) 20rem, 24rem"
                  className="object-cover object-center transition-transform duration-500 hover:scale-110"
                priority
                  quality={90}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full ring-4 ring-primary ring-opacity-50 shadow-neural"
                  animate={{ 
                    boxShadow: ['0 0 15px rgba(37, 99, 235, 0.3)', '0 0 20px rgba(139, 92, 246, 0.5)', '0 0 15px rgba(37, 99, 235, 0.3)'] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Data visualization overlay effect */}
                <motion.div 
                  className="absolute inset-0 z-20 bg-gradient-to-r from-primary/20 to-accent1/20 mix-blend-soft-light"
                  animate={{
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                ></motion.div>
                
                {/* 3D decorative elements */}
                <motion.div 
                  className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent1/20 rounded-full filter blur-md"
                  style={{ transform: 'translateZ(30px)' }}
                  animate={{ 
                    opacity: [0.6, 0.8, 0.6],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent2/20 to-accent3/20 rounded-full filter blur-md"
                  style={{ transform: 'translateZ(20px)' }}
                  animate={{ 
                    opacity: [0.5, 0.7, 0.5],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ duration: 4, delay: 1, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section with data science focus */}
      <section id="skills" className="section-container py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* 3D Background */}
        <ThreeDBackground variant="orbs" />
        
        {/* 3D background elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent1/5 rounded-full filter blur-[150px] animate-pulse-slow opacity-70 z-0"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-accent2/5 to-accent3/5 rounded-full filter blur-[120px] animate-float opacity-70 z-0"></div>
        
        <AISectionHeading
          subtext="Comprehensive technical skills in data science, machine learning, and AI that I've developed through education, projects, and continuous learning."
        >
          Technical Expertise
        </AISectionHeading>

        {/* Skill Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
          {Array.from(new Set(skills.map(skill => skill.category))).map((category, index) => (
            <motion.button
              key={category}
                initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to right, #2563eb, #8b5cf6)'
              }}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300 shadow-sm"
              onClick={() => {
                document.getElementById(category.replace(/\s+/g, '-').toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Data Science Skills */}
        <div id="data-science" className="mb-20 relative z-10">
          <motion.div 
            className="relative mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mr-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent1 flex items-center justify-center shadow-neural">
                <FaChartLine className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-textDark dark:text-textLight">Data Science</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Statistical analysis, data visualization, and predictive modeling</p>
            </div>
            
            {/* Decorative data science element */}
            <motion.div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 opacity-10 hidden md:block"
              animate={{
                opacity: [0.05, 0.15, 0.05],
                rotate: [0, 360],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                  <rect x="10" y="40" width="15" height="40" />
                  <rect x="30" y="30" width="15" height="50" />
                  <rect x="50" y="20" width="15" height="60" />
                  <rect x="70" y="10" width="15" height="70" />
                  <path d="M10,40 L85,10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="10" cy="40" r="3" />
                  <circle cx="30" cy="30" r="3" />
                  <circle cx="50" cy="20" r="3" />
                  <circle cx="70" cy="10" r="3" />
                  <circle cx="85" cy="10" r="3" />
                </g>
              </svg>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.filter(skill => skill.category === 'Data Science').map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
                
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent1/10 flex items-center justify-center">
                      <div className="text-primary dark:text-accent1 text-xl">
                        {iconComponents[skill.icon] || <FaCode />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-textDark dark:text-textLight">{skill.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                    <span className="text-xs font-medium text-primary dark:text-accent1">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-accent1"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Machine Learning Skills */}
        <div id="machine-learning" className="mb-20 relative z-10">
          <motion.div 
            className="relative mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mr-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent1 to-accent2 flex items-center justify-center shadow-neural">
                <FaBrain className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-textDark dark:text-textLight">Machine Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Creating AI models for pattern recognition and prediction</p>
            </div>
            
            {/* Decorative ML network element */}
            <motion.div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 opacity-10 hidden md:block"
              animate={{
                opacity: [0.05, 0.15, 0.05],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                  {/* Input layer */}
                  <circle cx="10" cy="30" r="5" />
                  <circle cx="10" cy="50" r="5" />
                  <circle cx="10" cy="70" r="5" />
                  
                  {/* Hidden layer */}
                  <circle cx="50" cy="20" r="5" />
                  <circle cx="50" cy="40" r="5" />
                  <circle cx="50" cy="60" r="5" />
                  <circle cx="50" cy="80" r="5" />
                  
                  {/* Output layer */}
                  <circle cx="90" cy="40" r="5" />
                  <circle cx="90" cy="60" r="5" />
                  
                  {/* Connections */}
                  <path d="M15,30 L45,20 M15,30 L45,40 M15,30 L45,60 M15,30 L45,80" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M15,50 L45,20 M15,50 L45,40 M15,50 L45,60 M15,50 L45,80" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M15,70 L45,20 M15,70 L45,40 M15,70 L45,60 M15,70 L45,80" stroke="currentColor" strokeWidth="1" fill="none" />
                  
                  <path d="M55,20 L85,40 M55,20 L85,60" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M55,40 L85,40 M55,40 L85,60" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M55,60 L85,40 M55,60 L85,60" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M55,80 L85,40 M55,80 L85,60" stroke="currentColor" strokeWidth="1" fill="none" />
                </g>
              </svg>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.filter(skill => skill.category === 'Machine Learning').map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
                
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-accent1/5 to-accent2/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      'linear-gradient(to right, rgba(139, 92, 246, 0.05), rgba(244, 114, 182, 0.05))',
                      'linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(244, 114, 182, 0.1))',
                      'linear-gradient(to right, rgba(139, 92, 246, 0.05), rgba(244, 114, 182, 0.05))'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <div className="flex items-start mb-4 relative z-10">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent1/10 to-accent2/10 flex items-center justify-center">
                      <div className="text-accent1 dark:text-accent2 text-xl">
                        {iconComponents[skill.icon] || <FaCode />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-textDark dark:text-textLight">{skill.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 relative z-10">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                    <span className="text-xs font-medium text-accent1 dark:text-accent2">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent1 to-accent2"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Python & Libraries Skills */}
        <div id="python-&-libraries" className="mb-20 relative z-10">
          <motion.div 
            className="relative mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mr-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent2 flex items-center justify-center shadow-neural">
                <FaCode className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-textDark dark:text-textLight">Python & Libraries</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Essential tools and frameworks for data science and machine learning</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.filter(skill => skill.category === 'Python & Libraries').map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
                
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent2/10 flex items-center justify-center">
                      <div className="text-primary dark:text-accent2 text-xl">
                        {iconComponents[skill.icon] || <FaCode />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-textDark dark:text-textLight">{skill.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                    <span className="text-xs font-medium text-primary dark:text-accent2">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-accent2"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Database & Big Data Skills */}
        <div id="database-&-big-data" className="mb-20 relative z-10">
          <motion.div 
            className="relative mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mr-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent2 to-accent3 flex items-center justify-center shadow-neural">
                <FaDatabase className="text-white text-xl" />
              </div>
            </div>
          <div>
              <h3 className="text-2xl font-bold text-textDark dark:text-textLight">Database & Big Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Storage, retrieval, and processing of large-scale data</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.filter(skill => skill.category === 'Database & Big Data').map((skill, index) => (
                <motion.div
                  key={skill.name}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
                
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent2/10 to-accent3/10 flex items-center justify-center">
                      <div className="text-accent2 dark:text-accent3 text-xl">
                        {iconComponents[skill.icon] || <FaDatabase />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-textDark dark:text-textLight">{skill.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                    <span className="text-xs font-medium text-accent2 dark:text-accent3">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent2 to-accent3"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div id="tools-&-technologies" className="mb-20 relative z-10">
          <motion.div 
            className="relative mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mr-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent3 to-primary flex items-center justify-center shadow-neural">
                <FaCode className="text-white text-xl" />
            </div>
          </div>
          <div>
              <h3 className="text-2xl font-bold text-textDark dark:text-textLight">Tools & Technologies</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Software and platforms for development and deployment</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.filter(skill => skill.category === 'Tools & Technologies').map((skill, index) => (
                <motion.div
                  key={skill.name}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
                
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent3/10 to-primary/10 flex items-center justify-center">
                      <div className="text-accent3 dark:text-primary text-xl">
                        {iconComponents[skill.icon] || <FaCode />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-textDark dark:text-textLight">{skill.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                    <span className="text-xs font-medium text-accent3 dark:text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent3 to-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Programming & Algorithms */}
        <div id="programming-&-algorithms" className="mb-20 relative z-10">
          <motion.div 
            className="relative mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mr-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent1 flex items-center justify-center shadow-neural">
                <FaCode className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-textDark dark:text-textLight">Programming & Algorithms</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Foundational coding skills and computational problem-solving</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.filter(skill => skill.category === 'Programming & Algorithms').map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
                
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent1/10 flex items-center justify-center">
                      <div className="text-primary dark:text-accent1 text-xl">
                        {iconComponents[skill.icon] || <FaCode />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-textDark dark:text-textLight">{skill.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                    <span className="text-xs font-medium text-primary dark:text-accent1">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-accent1"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <DetailedProjectsSection />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Data Dashboard Section */}
      <DataDashboardSection />

      {/* Resume Section */}
      <ResumeSection />
    </div>
  );
} 