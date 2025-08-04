#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Setup script for ng-osm-map library consumers
 * This runs automatically during postinstall, but can also be run manually
 */

console.log('⚙️  NgOsmMap: Setting up library assets...');

// Detect if we're in a consumer project or development workspace
const isConsumerProject = !fs.existsSync(path.join(__dirname, '../../../../angular.json'));
const nodeModulesPath = isConsumerProject 
  ? path.join(__dirname, '../../../') // In consumer's node_modules
  : path.join(__dirname, '../../../..'); // In development workspace

const leafletCssSource = path.join(nodeModulesPath, 'node_modules/leaflet/dist/leaflet.css');
const assetsDir = path.join(__dirname, '../assets');
const leafletCssTarget = path.join(assetsDir, 'leaflet.css');

try {
  // Create assets directory if it doesn't exist
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
    console.log('📁 Created assets directory');
  }

  // Check if source file exists
  if (!fs.existsSync(leafletCssSource)) {
    console.error('❌ Error: Leaflet CSS not found at:', leafletCssSource);
    console.error('   This should not happen as leaflet is a dependency');
    console.error('   Please report this issue at: https://github.com/maheshnvv/ngmahesh/issues');
    
    // Try to continue without failing - consumer might have different setup
    console.log('⚠️  Continuing without Leaflet CSS - maps may not display correctly');
    return;
  }

  // Copy Leaflet CSS
  fs.copyFileSync(leafletCssSource, leafletCssTarget);
  console.log('✅ Leaflet CSS configured successfully');

  // Get version information
  const leafletPackageJson = path.join(nodeModulesPath, 'node_modules/leaflet/package.json');
  if (fs.existsSync(leafletPackageJson)) {
    const leafletPkg = JSON.parse(fs.readFileSync(leafletPackageJson, 'utf8'));
    console.log(`📦 Using Leaflet v${leafletPkg.version}`);
  }

  console.log('🎉 NgOsmMap setup completed - ready to use!');
  console.log('📖 Documentation: https://maheshnvv.github.io/ngmahesh/docs/ng-osm-map');

} catch (error) {
  console.error('❌ NgOsmMap setup failed:', error.message);
  console.error('   Please report this issue at: https://github.com/maheshnvv/ngmahesh/issues');
}
