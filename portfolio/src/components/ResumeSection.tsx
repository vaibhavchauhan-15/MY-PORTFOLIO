'use client';

import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCertificate, FaCode, FaLanguage, FaUsers } from 'react-icons/fa';

export default function ResumeSection() {
  return (
    <section id="resume" className="section-container bg-gray-50 dark:bg-gray-900">
      <h2 className="heading-lg text-center mb-12">Resume</h2>
      
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-circuit-pattern opacity-5" />

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="heading-md mb-1">Vaibhav Chauhan</h3>
              <p className="text-primary dark:text-accent1 font-medium">Aspiring Data Scientist</p>
            </div>
            <motion.a 
              href="/documents/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 btn-primary mt-4 md:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download Resume
            </motion.a>
          </div>
          
          <div className="mb-8 relative z-10">
            <h4 className="text-xl font-semibold mb-2 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaCode className="text-primary" /></span>
              Summary
            </h4>
            <p className="text-gray-700 dark:text-gray-300 ml-10">
              Creative and aspiring data scientist with a strong foundation in computer science, programming,
              and analytical problem-solving. Proficient in Python, MySQL, and basic machine learning.
              Experienced in developing interactive dashboards and data-driven solutions to support decision-making processes.
            </p>
          </div>
          
          <div className="mb-8 relative z-10">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaBriefcase className="text-primary" /></span>
              Work Experience
            </h4>
            <div className="ml-10 border-l-2 border-primary/20 pl-6 relative">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
              <div className="mb-6">
                <h5 className="text-lg font-medium">Student Analytics Dashboard Developer</h5>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Parul University | March 2024</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
                  <li>Designed and developed an interactive student analytics dashboard using Power BI and SQL.</li>
                  <li>Provided actionable insights on student performance, attendance, and engagement patterns.</li>
                  <li>Utilized SQL queries to aggregate and analyze MySQL database data for reporting.</li>
                  <li>Implemented data cleaning and preprocessing techniques to ensure accuracy in visualization
                  and reporting.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-8 relative z-10">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaGraduationCap className="text-primary" /></span>
              Education
            </h4>
            <div className="ml-10 border-l-2 border-primary/20 pl-6 relative">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
              <div className="mb-4">
                <h5 className="text-lg font-medium">B.Tech in Computer Science</h5>
                <p className="text-gray-600 dark:text-gray-400">Parul University, Vadodara | 2022 – Present</p>
              </div>
              
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1/3"></div>
              <div className="mb-4">
                <h5 className="text-lg font-medium">12th Grade (Science)</h5>
                <p className="text-gray-600 dark:text-gray-400">VAANI Vidyalaya | 2020 – 2022</p>
              </div>
              
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-2/3"></div>
              <div>
                <h5 className="text-lg font-medium">10th Grade</h5>
                <p className="text-gray-600 dark:text-gray-400">IDEA English High School | 2019 – 2020</p>
              </div>
            </div>
          </div>

          <div className="mb-8 relative z-10">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaCode className="text-primary" /></span>
              Core Skills
            </h4>
            <div className="ml-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h5 className="font-medium mb-2 text-primary">Programming</h5>
                <p className="text-gray-700 dark:text-gray-300">Python, C++, C</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h5 className="font-medium mb-2 text-primary">Data Analysis</h5>
                <p className="text-gray-700 dark:text-gray-300">Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h5 className="font-medium mb-2 text-primary">Tools & Technologies</h5>
                <p className="text-gray-700 dark:text-gray-300">Power BI, Git, Excel, MySQL</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8 relative z-10">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaCertificate className="text-primary" /></span>
              Certifications
            </h4>
            <div className="ml-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h5 className="font-medium">Python for Data Science</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Coursera | May 2023</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h5 className="font-medium">Introduction to Machine Learning</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Udemy | April 2024</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h5 className="font-medium">Data Structure and Algorithm</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Codehelp (Love Babbar) | October 2023</p>
              </motion.div>
            </div>
          </div>
          
          <div className="mb-8 relative z-10">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaLanguage className="text-primary" /></span>
              Languages
            </h4>
            <div className="ml-10 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm font-medium">English (Fluent)</span>
              <span className="px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm font-medium">Hindi (Fluent)</span>
            </div>
          </div>
          
          <div className="mb-8 relative z-10">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaUsers className="text-primary" /></span>
              Workshops & Seminars
            </h4>
            <div className="ml-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h5 className="font-medium">Tableau Workshop</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Parul University | Dec 2024</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h5 className="font-medium">Machine Learning Workshop</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Parul University | March 2024</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h5 className="font-medium">Cybersecurity Seminar</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Parul University | February 2023</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-2 rounded-full mr-2"><FaCode className="text-primary" /></span>
              Projects
            </h4>
            <div className="ml-10">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h5 className="text-lg font-medium">Student Analytics Dashboard</h5>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Developed a dynamic Power BI dashboard to analyze student grades and attendance trends.
                  Improved student performance tracking through interactive visualizations.
                </p>
              </div>
              
              <div>
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h5 className="text-lg font-medium">General Election (2024) Dashboard</h5>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Created a comprehensive dashboard visualizing election results, voting patterns, and demographic trends.
                  Implemented interactive filters for constituency-level data exploration.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            For a more detailed version of my resume, please download the PDF.
          </p>
        </div>
      </div>
    </section>
  );
} 