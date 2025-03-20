const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

// Create directory if it doesn't exist
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

// Project images to download
const projectImages = [
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'student-analytics.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'data-visualization.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'machine-learning.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    filename: 'sql-database.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    filename: 'python-analysis.jpg'
  }
];

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFile(filepath, buffer, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(filepath);
        });
      });
      response.on('error', (err) => reject(err));
    }).on('error', (err) => reject(err));
  });
}

// Main function to download all images
async function downloadAllImages() {
  const projectImagesDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  
  try {
    // Create projects directory if it doesn't exist
    if (!fs.existsSync(projectImagesDir)) {
      await mkdirAsync(projectImagesDir, { recursive: true });
      console.log(`Created directory: ${projectImagesDir}`);
    }

    // Download all project images
    console.log('Downloading project images...');
    for (const image of projectImages) {
      const filepath = path.join(projectImagesDir, image.filename);
      
      // Skip if the file already exists
      if (fs.existsSync(filepath)) {
        console.log(`File already exists: ${image.filename}`);
        continue;
      }
      
      try {
        await downloadImage(image.url, filepath);
        console.log(`Downloaded: ${image.filename}`);
      } catch (error) {
        console.error(`Error downloading ${image.filename}:`, error.message);
      }
    }

    console.log('All images downloaded successfully!');
    console.log('\nNext steps:');
    console.log('1. Run the personal info update script: node scripts/update-personal-info.js');
    console.log('2. Run the projects update script: node scripts/update-projects.js');
    console.log('3. Run the development server to verify the changes: npm run dev');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the download function
downloadAllImages(); 