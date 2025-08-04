#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Post-install script for ng-osm-map library
 * Copies Leaflet CSS to library assets for bundling
 */

console.log('🗺️  NgOsmMap: Running post-install script...');

// Paths
const leafletCssSource = path.join(__dirname, '../../../node_modules/leaflet/dist/leaflet.css');
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
    console.error('   Make sure leaflet is installed as a dependency');
    process.exit(1);
  }

  // Copy Leaflet CSS
  fs.copyFileSync(leafletCssSource, leafletCssTarget);
  console.log('✅ Copied Leaflet CSS to library assets');

  // Get Leaflet version for logging
  const leafletPackageJson = path.join(__dirname, '../../../node_modules/leaflet/package.json');
  if (fs.existsSync(leafletPackageJson)) {
    const leafletPkg = JSON.parse(fs.readFileSync(leafletPackageJson, 'utf8'));
    console.log(`📦 Leaflet version: ${leafletPkg.version}`);
  }

  console.log('🎉 NgOsmMap post-install completed successfully');

} catch (error) {
  console.error('❌ NgOsmMap post-install failed:', error.message);
  process.exit(1);
}
