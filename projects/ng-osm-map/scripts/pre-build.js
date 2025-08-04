#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Pre-build script for ng-osm-map library
 * Ensures Leaflet CSS is available before building
 */

console.log('🔨 NgOsmMap: Running pre-build script...');

// Paths (adjusted for workspace context)
const workspaceRoot = path.join(__dirname, '../../..');
const leafletCssSource = path.join(workspaceRoot, 'node_modules/leaflet/dist/leaflet.css');
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
    console.error('   Make sure leaflet is installed in the workspace');
    process.exit(1);
  }

  // Copy Leaflet CSS
  fs.copyFileSync(leafletCssSource, leafletCssTarget);
  console.log('✅ Copied Leaflet CSS to library assets for build');

  // Get Leaflet version for logging
  const leafletPackageJson = path.join(workspaceRoot, 'node_modules/leaflet/package.json');
  if (fs.existsSync(leafletPackageJson)) {
    const leafletPkg = JSON.parse(fs.readFileSync(leafletPackageJson, 'utf8'));
    console.log(`📦 Using Leaflet version: ${leafletPkg.version}`);
  }

  console.log('🎉 NgOsmMap pre-build completed successfully');

} catch (error) {
  console.error('❌ NgOsmMap pre-build failed:', error.message);
  process.exit(1);
}
