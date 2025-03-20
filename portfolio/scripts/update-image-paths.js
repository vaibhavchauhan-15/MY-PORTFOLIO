const fs = require('fs');
const path = require('path');

// Path to the page.tsx file
const pageFilePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');

// Image URL mappings (old Unsplash URL to new local path)
const imageUrlMappings = [
  {
    oldUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
    newUrl: '/images/projects/ecommerce-platform.jpg'
  },
  {
    oldUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    newUrl: '/images/projects/task-management.jpg'
  },
  {
    oldUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1765&q=80',
    newUrl: '/images/projects/weather-dashboard.jpg'
  },
  {
    oldUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1755&q=80',
    newUrl: '/images/projects/portfolio-website.jpg'
  },
  {
    oldUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
    newUrl: '/images/projects/recipe-finder.jpg'
  },
  {
    oldUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    newUrl: '/images/projects/chat-application.jpg'
  }
];

// Function to update the image paths in the page.tsx file
function updateImagePaths() {
  try {
    // Read the page.tsx file
    let content = fs.readFileSync(pageFilePath, 'utf8');
    
    // Create a backup of the original file
    const backupFilePath = `${pageFilePath}.backup`;
    fs.writeFileSync(backupFilePath, content, 'utf8');
    console.log(`Created backup of page.tsx at: ${backupFilePath}`);
    
    // Replace each Unsplash URL with the local path
    let replacementCount = 0;
    for (const mapping of imageUrlMappings) {
      const regex = new RegExp(mapping.oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const beforeCount = (content.match(regex) || []).length;
      content = content.replace(regex, mapping.newUrl);
      const afterCount = (content.match(new RegExp(mapping.newUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      replacementCount += beforeCount;
      console.log(`Replaced ${beforeCount} occurrences of ${mapping.oldUrl.substring(0, 30)}... with ${mapping.newUrl}`);
    }
    
    // Write the updated content back to the file
    fs.writeFileSync(pageFilePath, content, 'utf8');
    console.log(`\nSuccessfully updated ${replacementCount} image paths in page.tsx`);
    console.log('\nNext steps:');
    console.log('1. Run the development server to verify the changes: npm run dev');
    console.log('2. Check that all project images are loading correctly');
    
  } catch (error) {
    console.error('Error updating image paths:', error.message);
  }
}

// Run the update function
updateImagePaths(); 