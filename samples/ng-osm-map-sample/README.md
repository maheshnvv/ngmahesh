# NgOsmMap Sample Application

This is a standalone Angular application that demonstrates how consumers would use the `@ngmahesh/ng-osm-map` library in a real-world scenario.

## 🎯 Purpose

- **Real Consumer Experience**: Shows exactly how developers would install and use the library
- **Testing**: Validates that the library works correctly when installed via npm
- **Documentation**: Provides practical examples beyond the demo site
- **Development**: Helps identify integration issues before publishing

## 🚀 Quick Start

### Option 1: Install from npm (Production)
```bash
cd samples/ng-osm-map-sample
npm install
npm run install-npm    # Installs @ngmahesh/ng-osm-map from npm
npm start
```

### Option 2: Link local library (Development)
```bash
# First, build the library
cd ../../
ng build ng-osm-map

# Then link and run the sample
cd samples/ng-osm-map-sample
npm install
npm run install-local  # Links local dist/ng-osm-map
npm start
```

## 📁 What This Sample Shows

### ✅ Zero Configuration Setup
- Single `npm install` command
- No angular.json modifications needed
- No global style imports required
- Works out of the box

### ✅ Real-world Usage Examples
- **Basic Map**: Simple map with one pin
- **Multiple Pins**: Different colors and custom content
- **Interactive Features**: Click handlers, dynamic pins
- **Area Highlighting**: Custom regions
- **Zoom Controls**: Programmatic zoom functionality

### ✅ Consumer Perspective
- Shows exact import statements consumers would use
- Demonstrates TypeScript interfaces (PinObject, LocationObject)
- Includes error handling and edge cases
- Uses standalone components (modern Angular approach)

## 🧪 Testing Scenarios

This sample helps test:

1. **Installation Process**: Does `npm install @ngmahesh/ng-osm-map` work?
2. **Bundle Size**: How much does the library add to the app?
3. **Style Integration**: Are Leaflet styles properly bundled?
4. **TypeScript Support**: Do types work correctly?
5. **Build Process**: Does the app build and run without issues?
6. **Browser Compatibility**: Does it work across different browsers?

## 📊 Key Features Demonstrated

- ✨ **Zero config setup**
- 🗺️ **Interactive maps**
- 📍 **Custom pins with colors**
- 🎯 **Click event handling**
- 🌍 **Area highlighting**
- 📱 **Responsive design**
- 🎮 **Dynamic pin management**

## 🔧 Development Commands

```bash
npm start              # Start development server
npm run build          # Build for production
npm run install-npm    # Install library from npm
npm run install-local  # Link local library build
```

## 📝 Consumer Experience

This sample represents exactly what a consumer would experience:

1. **Install**: `npm install @ngmahesh/ng-osm-map`
2. **Import**: `import { NgOsmMapDirective } from '@ngmahesh/ng-osm-map'`
3. **Use**: `<div ngOsmMap [pins]="pins"></div>`

No additional configuration, no style imports, no angular.json changes needed!

## 🐛 Issues & Testing

If something doesn't work in this sample, it means there's likely an issue with:
- Library build configuration
- Dependency management
- Style bundling
- TypeScript definitions
- Export paths

This makes it an excellent testing ground for the library's consumer experience.

## 🐛 Troubleshooting

### NG0203 Injection Context Error (FIXED ✅)
If you encounter this error:
```
ERROR RuntimeError: NG0203: inject() must be called from an injection context
```

**Solution**: This has been fixed in the latest version by switching from field-level `inject()` calls to constructor-based dependency injection. 

To ensure you have the fix:

#### For Local Development:
```bash
# 1. Rebuild the library (from workspace root)
cd ../../
npm run build:lib

# 2. Copy fresh build to sample (Windows)
cd samples/ng-osm-map-sample
xcopy /E /I /Y ..\..\dist\ng-osm-map node_modules\@ngmahesh\ng-osm-map

# 3. Restart dev server
npm start
```

#### For NPM Installation:
```bash
npm run install-npm  # Get latest published version
npm start
```

### Template/Styles Separation ✅
The sample app now uses proper file separation:
- `app.component.html` - Template file
- `app.component.scss` - Styles file  
- `app.component.ts` - Component logic only

### Map Not Rendering
If the map doesn't render:
1. Check browser console for errors
2. Ensure HttpClient is provided (already configured in `main.ts`)
3. Verify network connectivity for tile loading
4. Check that Leaflet assets are properly bundled
