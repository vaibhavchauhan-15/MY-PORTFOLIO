const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

// Create directory if it doesn't exist
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

// Project images from Unsplash
const projectImages = [
  {
    url: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
    filename: 'ecommerce-platform.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    filename: 'task-management.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1765&q=80',
    filename: 'weather-dashboard.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1755&q=80',
    filename: 'portfolio-website.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
    filename: 'recipe-finder.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    filename: 'chat-application.jpg'
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
      try {
        await downloadImage(image.url, filepath);
        console.log(`Downloaded: ${image.filename}`);
      } catch (error) {
        console.error(`Error downloading ${image.filename}:`, error.message);
      }
    }

    console.log('All images downloaded successfully!');
    console.log('\nNext steps:');
    console.log('1. Update the project data in src/app/page.tsx to use local images');
    console.log('2. Replace the imageUrl paths with: /images/projects/[filename]');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the download function
downloadAllImages(); 