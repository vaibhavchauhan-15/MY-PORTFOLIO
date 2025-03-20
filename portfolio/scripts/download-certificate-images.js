const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

// Create directory if it doesn't exist
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

// Certificate images to download
const certificateImages = [
  {
    url: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'python-data-science.jpg',
    title: 'Python for Data Science'
  },
  {
    url: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'machine-learning-intro.jpg',
    title: 'Introduction to Machine Learning'
  },
  {
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    filename: 'data-structures-algorithms.jpg',
    title: 'Data Structure and Algorithm'
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

// Main function to download all certificate images
async function downloadAllCertificateImages() {
  const certificateImagesDir = path.join(__dirname, '..', 'public', 'images', 'certificates');
  
  try {
    // Create certificates directory if it doesn't exist
    if (!fs.existsSync(certificateImagesDir)) {
      await mkdirAsync(certificateImagesDir, { recursive: true });
      console.log(`Created directory: ${certificateImagesDir}`);
    }

    // Download all certificate images
    console.log('Downloading certificate images...');
    for (const image of certificateImages) {
      const filepath = path.join(certificateImagesDir, image.filename);
      
      // Skip if the file already exists
      if (fs.existsSync(filepath)) {
        console.log(`File already exists: ${image.filename}`);
        continue;
      }
      
      try {
        await downloadImage(image.url, filepath);
        console.log(`Downloaded: ${image.filename} for ${image.title}`);
      } catch (error) {
        console.error(`Error downloading ${image.filename}:`, error.message);
      }
    }

    // Update the certifications.json file with image paths
    await updateCertificationsJson();

    console.log('All certificate images downloaded successfully!');
    console.log('\nNext steps:');
    console.log('1. Update the CertificatesSection component to display the images');
    console.log('2. Run the development server to verify the changes: npm run dev');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to update the certifications.json file with image paths
async function updateCertificationsJson() {
  const certJsonPath = path.join(__dirname, '..', 'src', 'data', 'certifications.json');
  
  try {
    // Check if the file exists
    if (!fs.existsSync(certJsonPath)) {
      console.log('Certifications JSON file not found. Creating a new one...');
      return;
    }
    
    // Read the existing certifications data
    const certData = JSON.parse(fs.readFileSync(certJsonPath, 'utf8'));
    
    // Update the image paths
    const updatedCertData = certData.map(cert => {
      const matchingImage = certificateImages.find(img => img.title === cert.title);
      if (matchingImage) {
        return {
          ...cert,
          imageUrl: `/images/certificates/${matchingImage.filename}`
        };
      }
      return cert;
    });
    
    // Write the updated data back to the file
    fs.writeFileSync(certJsonPath, JSON.stringify(updatedCertData, null, 2), 'utf8');
    console.log('Updated certifications.json with image paths');
    
  } catch (error) {
    console.error('Error updating certifications.json:', error.message);
  }
}

// Run the download function
downloadAllCertificateImages(); 