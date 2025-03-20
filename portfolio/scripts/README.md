# Resource Download Scripts

This directory contains scripts to download external resources and update references in the codebase to use local resources instead of external URLs.

## Available Scripts

### 1. `download-resources.js`

This script downloads project images from Unsplash and saves them to the `public/images/projects` directory.

**Usage:**
```bash
node scripts/download-resources.js
```

**What it does:**
- Creates a `projects` directory inside `public/images` if it doesn't exist
- Downloads all project images from Unsplash
- Saves them with descriptive filenames

### 2. `update-image-paths.js`

This script updates the image paths in `src/app/page.tsx` to use the local images instead of Unsplash URLs.

**Usage:**
```bash
node scripts/update-image-paths.js
```

**What it does:**
- Creates a backup of the original `page.tsx` file
- Replaces all Unsplash URLs with local image paths
- Provides a summary of the changes made

## Complete Workflow

To download all external resources and update references:

1. Download the resources:
   ```bash
   node scripts/download-resources.js
   ```

2. Update the image paths:
   ```bash
   node scripts/update-image-paths.js
   ```

3. Verify the changes by running the development server:
   ```bash
   npm run dev
   ```

4. Check that all images are loading correctly in the browser

## Benefits of Using Local Resources

- **Improved Performance**: Reduces external dependencies and network requests
- **Reliability**: Your site won't break if external resources become unavailable
- **Control**: You have full control over image optimization and quality
- **Privacy**: No tracking from third-party services

## Troubleshooting

If you encounter any issues:

1. Check that all images were downloaded successfully
2. Verify that the image paths in `page.tsx` were updated correctly
3. Make sure the image filenames match the paths in the code
4. Check the browser console for any 404 errors 