const fs = require('fs');
const path = require('path');

// Path to the page.tsx file
const pageFilePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');

// Updated project data based on the resume
const updatedProjects = [
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
  },
];

// Function to update the projects in the page.tsx file
function updateProjects() {
  try {
    // Read the page.tsx file
    let content = fs.readFileSync(pageFilePath, 'utf8');
    
    // Create a backup of the original file
    const backupFilePath = `${pageFilePath}.projects.backup`;
    fs.writeFileSync(backupFilePath, content, 'utf8');
    console.log(`Created backup of page.tsx at: ${backupFilePath}`);
    
    // Find the projects array in the content
    const projectsStartRegex = /const projects = \[/;
    const projectsStartMatch = content.match(projectsStartRegex);
    
    if (!projectsStartMatch) {
      console.log('Projects array not found in the file.');
      return;
    }
    
    const projectsStartIndex = projectsStartMatch.index;
    const projectsEndIndex = content.indexOf('];', projectsStartIndex) + 2;
    
    // Generate the new projects array
    const newProjectsArray = `const projects = [
  ${updatedProjects.map(project => `{
    title: '${project.title}',
    description: '${project.description}',
    imageUrl: '${project.imageUrl}',
    demoUrl: '${project.demoUrl}',
    githubUrl: '${project.githubUrl}',
  }`).join(',\n  ')}
];`;
    
    // Replace the old projects array with the new one
    const updatedContent = content.substring(0, projectsStartIndex) + newProjectsArray + content.substring(projectsEndIndex);
    
    // Write the updated content back to the file
    fs.writeFileSync(pageFilePath, updatedContent, 'utf8');
    console.log(`\nSuccessfully updated projects in page.tsx`);
    
    // Create a JSON file with the updated projects for future reference
    const projectsJsonPath = path.join(__dirname, '..', 'src', 'data', 'projects.json');
    
    // Ensure the data directory exists
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(projectsJsonPath, JSON.stringify(updatedProjects, null, 2), 'utf8');
    console.log(`Created projects JSON file at: ${projectsJsonPath}`);
    
    console.log('\nNext steps:');
    console.log('1. Download placeholder images for the new projects');
    console.log('2. Run the development server to verify the changes: npm run dev');
    console.log('3. Check that all projects are displayed correctly');
    
  } catch (error) {
    console.error('Error updating projects:', error.message);
  }
}

// Run the update function
updateProjects(); 