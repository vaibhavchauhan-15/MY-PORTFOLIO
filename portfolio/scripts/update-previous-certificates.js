const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

// Create directory if it doesn't exist
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);

// Previous certificates data
const previousCertificates = [
  {
    title: 'Data Visualization',
    issuer: 'Certification Authority',
    date: 'February 2023',
    description: 'Advanced data visualization techniques using modern tools and libraries for creating impactful visual representations of complex datasets.',
    url: '/documents/certificates/Data Visualisation.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'data-visualization-cert.jpg'
  },
  {
    title: 'Data Analytics',
    issuer: 'Professional Institute',
    date: 'January 2023',
    description: 'Comprehensive training in data analytics methodologies, statistical analysis, and business intelligence tools for extracting actionable insights.',
    url: '/documents/certificates/vaibhav_data_analytics.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'data-analytics-cert.jpg'
  },
  {
    title: 'Tableau Workshop',
    issuer: 'Tableau',
    date: 'January 2023',
    description: 'Hands-on workshop on creating interactive dashboards and data visualizations using Tableau, focusing on best practices and advanced features.',
    url: '/documents/certificates/tableau_workshop_certificate.jpg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'tableau-workshop-cert.jpg'
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

// Main function to download thumbnails and update certifications
async function updatePreviousCertificates() {
  const certificateImagesDir = path.join(__dirname, '..', 'public', 'images', 'certificates');
  const certJsonPath = path.join(__dirname, '..', 'src', 'data', 'certifications.json');
  
  try {
    // Create certificates directory if it doesn't exist
    if (!fs.existsSync(certificateImagesDir)) {
      await mkdirAsync(certificateImagesDir, { recursive: true });
      console.log(`Created directory: ${certificateImagesDir}`);
    }

    // Download all certificate thumbnails
    console.log('Downloading certificate thumbnails...');
    for (const cert of previousCertificates) {
      const filepath = path.join(certificateImagesDir, cert.filename);
      
      // Skip if the file already exists
      if (fs.existsSync(filepath)) {
        console.log(`File already exists: ${cert.filename}`);
        continue;
      }
      
      try {
        await downloadImage(cert.thumbnailUrl, filepath);
        console.log(`Downloaded: ${cert.filename} for ${cert.title}`);
        
        // Update the image URL in the certificate data
        cert.imageUrl = `/images/certificates/${cert.filename}`;
        delete cert.thumbnailUrl; // Remove the temporary thumbnailUrl property
      } catch (error) {
        console.error(`Error downloading ${cert.filename}:`, error.message);
      }
    }

    // Read existing certifications data
    let existingCerts = [];
    if (fs.existsSync(certJsonPath)) {
      existingCerts = JSON.parse(fs.readFileSync(certJsonPath, 'utf8'));
      console.log(`Read ${existingCerts.length} existing certificates`);
    }

    // Prepare the updated certificates data
    const updatedCerts = [
      ...previousCertificates.map(cert => ({
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        description: cert.description,
        url: cert.url,
        imageUrl: cert.imageUrl
      })),
      ...existingCerts
    ];

    // Write the updated data back to the file
    fs.writeFileSync(certJsonPath, JSON.stringify(updatedCerts, null, 2), 'utf8');
    console.log(`Updated certifications.json with ${updatedCerts.length} certificates`);
    
    console.log('All previous certificates added successfully!');
    console.log('\nNext steps:');
    console.log('1. Run the development server to verify the changes: npm run dev');
    console.log('2. Check that all certificates are displayed correctly');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the update function
updatePreviousCertificates(); 