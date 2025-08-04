#!/bin/bash

# NgOsmMap Sample Testing Script
# This script helps test both local and npm installations

echo "🗺️  NgOsmMap Sample Testing Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the ng-osm-map-sample directory"
    exit 1
fi

echo "📦 Installing base dependencies..."
npm install

echo ""
echo "Choose testing mode:"
echo "1) Test with local build (development)"
echo "2) Test with npm package (production)"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "🔗 Testing with local build..."
        echo "Building library first..."
        cd ../../
        ng build ng-osm-map
        cd samples/ng-osm-map-sample
        
        echo "Linking local build..."
        npm run install-local
        
        echo "✅ Local build linked! Starting development server..."
        npm start
        ;;
    2)
        echo "📦 Testing with npm package..."
        npm run install-npm
        
        echo "✅ NPM package installed! Starting development server..."
        npm start
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
