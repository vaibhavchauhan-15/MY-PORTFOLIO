const fs = require('fs');
const path = require('path');

// Path to the page.tsx file
const pageFilePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');

// Personal information updates
const personalInfoUpdates = {
  // Update name if needed (though it's already correct)
  name: 'Vaibhav Chauhan',
  
  // Update title/description
  title: 'Aspiring Data Scientist',
  description: 'An aspiring data scientist with a strong foundation in computer science, programming, and analytical problem-solving. Proficient in Python, MySQL, and basic machine learning. Experienced in developing interactive dashboards and data-driven solutions.',
  
  // Update education
  education: {
    university: 'Parul University, Vadodara',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2022 - Present'
  },
  
  // Update contact information
  contact: {
    email: 'vaibhavchauhan.contactme@gmail.com',
    phone: '9867732204',
    linkedin: 'https://www.linkedin.com/in/vaibhavchauhan15/',
    github: 'https://github.com/vaibhavchauhan-15'
  },
  
  // Update skills
  skills: [
    { name: 'Python', category: 'Programming' },
    { name: 'C++', category: 'Programming' },
    { name: 'C', category: 'Programming' },
    { name: 'Pandas', category: 'Data Analysis' },
    { name: 'NumPy', category: 'Data Analysis' },
    { name: 'Matplotlib', category: 'Data Analysis' },
    { name: 'Seaborn', category: 'Data Analysis' },
    { name: 'Scikit-learn', category: 'Data Analysis' },
    { name: 'Power BI', category: 'Tools' },
    { name: 'Git', category: 'Tools' },
    { name: 'Excel', category: 'Tools' },
    { name: 'MySQL', category: 'Database' },
    { name: 'Data Structures', category: 'Programming' },
    { name: 'Algorithms', category: 'Programming' },
    { name: 'Tableau', category: 'Tools' },
    { name: 'Data Visualization', category: 'Data Analysis' }
  ],
  
  // Update work experience
  workExperience: {
    title: 'Student Analytics Dashboard Developer',
    company: 'Parul University',
    period: 'March 2024',
    description: [
      'Designed and developed an interactive student analytics dashboard using Power BI and SQL.',
      'Provided actionable insights on student performance, attendance, and engagement patterns.',
      'Utilized SQL queries to aggregate and analyze MySQL database data for reporting.',
      'Implemented data cleaning and preprocessing techniques to ensure accuracy in visualization and reporting.'
    ]
  },
  
  // Update projects
  projects: [
    {
      title: 'Student Analytics Dashboard',
      description: 'A dynamic Power BI dashboard to analyze student grades and attendance trends. Improved student performance tracking through interactive visualizations.',
      imageUrl: '/images/projects/student-analytics.jpg',
      demoUrl: '#',
      githubUrl: 'https://github.com/vaibhavchauhan-15'
    }
  ],
  
  // Update certifications
  certifications: [
    {
      title: 'Python for Data Science',
      issuer: 'Coursera',
      date: 'May 2023'
    },
    {
      title: 'Introduction to Machine Learning',
      issuer: 'Udemy',
      date: 'April 2024'
    },
    {
      title: 'Data Structure and Algorithm',
      issuer: 'Codehelp (Love Babbar)',
      date: 'October 2023'
    }
  ],
  
  // Update workshops & seminars
  workshops: [
    {
      title: 'Tableau Workshop',
      organizer: 'Parul University',
      date: 'December 2024'
    },
    {
      title: 'Machine Learning Workshop',
      organizer: 'Parul University',
      date: 'March 2024'
    },
    {
      title: 'Cybersecurity Seminar',
      organizer: 'Parul University',
      date: 'February 2023'
    }
  ],
  
  // Update languages
  languages: [
    { name: 'English', proficiency: 'Fluent' },
    { name: 'Hindi', proficiency: 'Fluent' }
  ]
};

// Function to update personal information in the page.tsx file
function updatePersonalInfo() {
  try {
    // Read the page.tsx file
    let content = fs.readFileSync(pageFilePath, 'utf8');
    
    // Create a backup of the original file
    const backupFilePath = `${pageFilePath}.personal-info.backup`;
    fs.writeFileSync(backupFilePath, content, 'utf8');
    console.log(`Created backup of page.tsx at: ${backupFilePath}`);
    
    // Update the title and description
    content = updateTitleAndDescription(content);
    
    // Update the skills section
    content = updateSkills(content);
    
    // Write the updated content back to the file
    fs.writeFileSync(pageFilePath, content, 'utf8');
    console.log(`\nSuccessfully updated personal information in page.tsx`);
    
    // Create a JSON file with all the personal information for future reference
    const personalInfoJsonPath = path.join(__dirname, '..', 'src', 'data', 'personal-info.json');
    
    // Ensure the data directory exists
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(personalInfoJsonPath, JSON.stringify(personalInfoUpdates, null, 2), 'utf8');
    console.log(`Created personal information JSON file at: ${personalInfoJsonPath}`);
    
    console.log('\nNext steps:');
    console.log('1. Run the development server to verify the changes: npm run dev');
    console.log('2. Check that all personal information is updated correctly');
    console.log('3. Update the components to use the data from personal-info.json');
    
  } catch (error) {
    console.error('Error updating personal information:', error.message);
  }
}

// Function to update title and description
function updateTitleAndDescription(content) {
  // Update the title
  const titleRegex = /(Hi, I'm <span className="text-primary">)([^<]+)(<\/span>)/;
  content = content.replace(titleRegex, `$1${personalInfoUpdates.name}$3`);
  
  // Update the description
  const descriptionRegex = /(text-xl mb-8 text-textDark dark:text-textLight">)([^<]+)(<\/p>)/;
  content = content.replace(descriptionRegex, `$1${personalInfoUpdates.description}$3`);
  
  // Update the about section
  const aboutRegex = /(mb-4 text-textDark dark:text-textLight">)([^<]+)(<\/p>)/g;
  let aboutReplaced = false;
  content = content.replace(aboutRegex, (match, p1, p2, p3) => {
    if (!aboutReplaced) {
      aboutReplaced = true;
      return `${p1}I'm a ${personalInfoUpdates.education.degree} student at ${personalInfoUpdates.education.university} with a strong foundation in data analysis and visualization. I specialize in creating insightful dashboards using Power BI and SQL, with experience in Python, data structures, and algorithms.${p3}`;
    }
    return match;
  });
  
  return content;
}

// Function to update skills
function updateSkills(content) {
  // Find the skills array in the content
  const skillsStartRegex = /const skills = \[/;
  const skillsEndRegex = /\];/;
  
  const skillsStartMatch = content.match(skillsStartRegex);
  if (!skillsStartMatch) {
    console.log('Skills array not found in the file.');
    return content;
  }
  
  const skillsStartIndex = skillsStartMatch.index;
  const skillsEndIndex = content.indexOf('];', skillsStartIndex) + 2;
  
  // Generate the new skills array
  const newSkillsArray = `const skills = [
  ${personalInfoUpdates.skills.map(skill => `{ name: '${skill.name}', category: '${skill.category}' }`).join(',\n  ')}
];`;
  
  // Replace the old skills array with the new one
  return content.substring(0, skillsStartIndex) + newSkillsArray + content.substring(skillsEndIndex);
}

// Run the update function
updatePersonalInfo(); 