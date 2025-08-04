const fs = require('fs');
const path = require('path');

/**
 * Copy Leaflet assets (CSS and images) to the library
 * This ensures all dependencies are bundled with the library
 */

function copyLeafletAssets() {
  console.log('🌿 Copying Leaflet assets...');

  // Define paths
  const rootDir = process.cwd();
  const leafletSrc = path.join(rootDir, 'node_modules', 'leaflet', 'dist');
  const assetsDest = path.join(rootDir, 'projects', 'ng-osm-map', 'src', 'assets', 'leaflet');

  // Check if leaflet is installed
  if (!fs.existsSync(leafletSrc)) {
    console.error('❌ Leaflet not found in node_modules. Please run npm install first.');
    process.exit(1);
  }

  // Create destination directories
  const imagesDest = path.join(assetsDest, 'images');
  if (!fs.existsSync(assetsDest)) {
    fs.mkdirSync(assetsDest, { recursive: true });
  }
  if (!fs.existsSync(imagesDest)) {
    fs.mkdirSync(imagesDest, { recursive: true });
  }

  try {
    // Copy CSS file
    const cssSource = path.join(leafletSrc, 'leaflet.css');
    const cssDest = path.join(assetsDest, 'leaflet.css');
    fs.copyFileSync(cssSource, cssDest);
    console.log('✅ Copied leaflet.css');

    // Copy image files
    const imagesSource = path.join(leafletSrc, 'images');
    if (fs.existsSync(imagesSource)) {
      const imageFiles = fs.readdirSync(imagesSource);
      imageFiles.forEach(file => {
        const srcFile = path.join(imagesSource, file);
        const destFile = path.join(imagesDest, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`✅ Copied ${file}`);
      });
    }

    console.log('🎉 Leaflet assets copied successfully!');
    
    // Verify the structure
    console.log('\n📁 Asset structure:');
    console.log(`${assetsDest}/`);
    console.log(`├── leaflet.css`);
    console.log(`└── images/`);
    
    const copiedImages = fs.readdirSync(imagesDest);
    copiedImages.forEach(img => {
      console.log(`    ├── ${img}`);
    });

  } catch (error) {
    console.error('❌ Error copying Leaflet assets:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  copyLeafletAssets();
}

module.exports = copyLeafletAssets;
