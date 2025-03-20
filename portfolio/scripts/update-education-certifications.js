const fs = require('fs');
const path = require('path');

// Path to the components directory
const componentsDir = path.join(__dirname, '..', 'src', 'components');

// Education data from the resume
const educationData = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Parul University, Vadodara',
    period: '2022 - Present',
    description: 'Studying computer science fundamentals, data structures, algorithms, and specialized courses in data science and analytics.'
  },
  {
    degree: '12th Grade (Science)',
    institution: 'VAANI Vidyalaya',
    period: '2020 - 2022',
    description: 'Completed higher secondary education with focus on science subjects including mathematics, physics, and computer science.'
  },
  {
    degree: '10th Grade',
    institution: 'IDEA English High School',
    period: '2019 - 2020',
    description: 'Completed secondary education with distinction in mathematics and science.'
  }
];

// Certification data from the resume
const certificationData = [
  {
    title: 'Python for Data Science',
    issuer: 'Coursera',
    date: 'May 2023',
    description: 'Comprehensive course covering Python libraries for data analysis including Pandas, NumPy, and data visualization tools.',
    url: '#'
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'Udemy',
    date: 'April 2024',
    description: 'Fundamentals of machine learning algorithms, model training, evaluation, and implementation using Scikit-learn.',
    url: '#'
  },
  {
    title: 'Data Structure and Algorithm',
    issuer: 'Codehelp (Love Babbar)',
    date: 'October 2023',
    description: 'In-depth study of data structures and algorithms with practical implementation in C++ and problem-solving techniques.',
    url: '#'
  }
];

// Workshop data from the resume
const workshopData = [
  {
    title: 'Tableau Workshop',
    organizer: 'Parul University',
    date: 'December 2024',
    description: 'Hands-on workshop on creating interactive dashboards and data visualizations using Tableau.'
  },
  {
    title: 'Machine Learning Workshop',
    organizer: 'Parul University',
    date: 'March 2024',
    description: 'Practical workshop on implementing machine learning models for real-world problems.'
  },
  {
    title: 'Cybersecurity Seminar',
    organizer: 'Parul University',
    date: 'February 2023',
    description: 'Seminar on cybersecurity fundamentals, threats, and best practices for secure software development.'
  }
];

// Function to create or update the education component
function updateEducationComponent() {
  try {
    // Create the data directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Save the education data to a JSON file
    const educationJsonPath = path.join(dataDir, 'education.json');
    fs.writeFileSync(educationJsonPath, JSON.stringify(educationData, null, 2), 'utf8');
    console.log(`Created education data JSON file at: ${educationJsonPath}`);
    
    // Save the certification data to a JSON file
    const certificationJsonPath = path.join(dataDir, 'certifications.json');
    fs.writeFileSync(certificationJsonPath, JSON.stringify(certificationData, null, 2), 'utf8');
    console.log(`Created certification data JSON file at: ${certificationJsonPath}`);
    
    // Save the workshop data to a JSON file
    const workshopJsonPath = path.join(dataDir, 'workshops.json');
    fs.writeFileSync(workshopJsonPath, JSON.stringify(workshopData, null, 2), 'utf8');
    console.log(`Created workshop data JSON file at: ${workshopJsonPath}`);
    
    // Check if the ResumeSection component exists
    const resumeSectionPath = path.join(componentsDir, 'ResumeSection.tsx');
    if (fs.existsSync(resumeSectionPath)) {
      // Update the ResumeSection component to use the JSON data
      updateResumeSection(resumeSectionPath);
    } else {
      console.log('ResumeSection component not found. Creating a new one...');
      createResumeSection();
    }
    
    // Check if the CertificatesSection component exists
    const certificatesSectionPath = path.join(componentsDir, 'CertificatesSection.tsx');
    if (fs.existsSync(certificatesSectionPath)) {
      // Update the CertificatesSection component to use the JSON data
      updateCertificatesSection(certificatesSectionPath);
    } else {
      console.log('CertificatesSection component not found. Creating a new one...');
      createCertificatesSection();
    }
    
    console.log('\nNext steps:');
    console.log('1. Run the development server to verify the changes: npm run dev');
    console.log('2. Check that the education and certification sections are updated correctly');
    
  } catch (error) {
    console.error('Error updating education and certifications:', error.message);
  }
}

// Function to update the ResumeSection component
function updateResumeSection(filePath) {
  console.log('Updating ResumeSection component...');
  // This would be implemented to modify the existing component
  // For now, we'll just note that this would be done
  console.log('Note: To fully implement this, we would need to analyze and modify the existing ResumeSection component');
}

// Function to create a new ResumeSection component
function createResumeSection() {
  const resumeSectionPath = path.join(componentsDir, 'ResumeSection.tsx');
  
  const resumeSectionContent = `'use client';

import { motion } from 'framer-motion';
import educationData from '@/data/education.json';
import workshopData from '@/data/workshops.json';

const ResumeSection = () => {
  return (
    <section id="resume" className="section-container bg-gray-50 dark:bg-gray-900">
      <h2 className="heading-lg text-center mb-12">Resume</h2>
      
      {/* Education Section */}
      <div className="mb-16">
        <h3 className="heading-md mb-8 text-center">Education</h3>
        <div className="space-y-8">
          {educationData.map((education, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-cardDark p-6 rounded-lg shadow-md border border-borderLight dark:border-borderDark"
            >
              <h4 className="text-xl font-semibold mb-2 text-textDark dark:text-textLight">{education.degree}</h4>
              <p className="text-primary font-medium mb-2">{education.institution}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{education.period}</p>
              <p className="text-textDark dark:text-textLight">{education.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Workshops & Seminars Section */}
      <div>
        <h3 className="heading-md mb-8 text-center">Workshops & Seminars</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopData.map((workshop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-cardDark p-6 rounded-lg shadow-md border border-borderLight dark:border-borderDark"
            >
              <h4 className="text-xl font-semibold mb-2 text-textDark dark:text-textLight">{workshop.title}</h4>
              <p className="text-primary font-medium mb-2">{workshop.organizer}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{workshop.date}</p>
              <p className="text-textDark dark:text-textLight">{workshop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
`;

  fs.writeFileSync(resumeSectionPath, resumeSectionContent, 'utf8');
  console.log(`Created ResumeSection component at: ${resumeSectionPath}`);
}

// Function to update the CertificatesSection component
function updateCertificatesSection(filePath) {
  console.log('Updating CertificatesSection component...');
  // This would be implemented to modify the existing component
  // For now, we'll just note that this would be done
  console.log('Note: To fully implement this, we would need to analyze and modify the existing CertificatesSection component');
}

// Function to create a new CertificatesSection component
function createCertificatesSection() {
  const certificatesSectionPath = path.join(componentsDir, 'CertificatesSection.tsx');
  
  const certificatesSectionContent = `'use client';

import { motion } from 'framer-motion';
import certificationsData from '@/data/certifications.json';

const CertificatesSection = () => {
  return (
    <section id="certificates" className="section-container">
      <h2 className="heading-lg text-center mb-12">Certifications</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificationsData.map((certification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-cardDark p-6 rounded-lg shadow-md border border-borderLight dark:border-borderDark"
          >
            <h3 className="text-xl font-semibold mb-2 text-textDark dark:text-textLight">{certification.title}</h3>
            <p className="text-primary font-medium mb-1">{certification.issuer}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{certification.date}</p>
            <p className="text-textDark dark:text-textLight mb-4">{certification.description}</p>
            {certification.url && (
              <a 
                href={certification.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Certificate
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;
`;

  fs.writeFileSync(certificatesSectionPath, certificatesSectionContent, 'utf8');
  console.log(`Created CertificatesSection component at: ${certificatesSectionPath}`);
}

// Run the update function
updateEducationComponent(); 