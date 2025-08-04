# NgMahesh Libraries - Sample Applications

This folder contains standalone Angular applications that demonstrate how consumers would use the NgMahesh libraries in real-world scenarios.

## 🎯 Purpose

The samples folder serves multiple important purposes:

- **👥 Consumer Testing**: Test the actual consumer experience of installing and using libraries
- **📚 Real-world Examples**: Show practical usage beyond demos and documentation
- **🧪 Integration Testing**: Validate that libraries work correctly when installed via npm
- **🐛 Issue Detection**: Identify problems before publishing to npm
- **📖 Reference Implementation**: Provide copy-paste examples for developers

## 📁 Structure

```
samples/
├── README.md                    # This file
├── ng-osm-map-sample/          # Sample for @ngmahesh/ng-osm-map
│   ├── src/app/app.component.ts # Complete usage examples
│   ├── package.json            # Consumer-like dependencies
│   └── README.md               # Sample-specific documentation
└── [future-library-samples]/   # Additional samples as libraries grow
```

## 🚀 Quick Start

Each sample is a complete, independent Angular application:

```bash
# Navigate to any sample
cd samples/ng-osm-map-sample

# Install dependencies
npm install

# Option A: Install from npm (production testing)
npm run install-npm

# Option B: Link local build (development testing)
npm run install-local

# Run the sample
npm start
```

## 💡 Key Differences from Demo/Docs

| Aspect | Demo/Docs | Samples |
|--------|-----------|---------|
| **Purpose** | Showcase features | Test consumer experience |
| **Installation** | Workspace library | Real npm install |
| **Dependencies** | Shared workspace | Independent package.json |
| **Imports** | Relative paths | npm package imports |
| **Configuration** | Pre-configured | Consumer-like setup |
| **Audience** | End users | Library developers |

## 🧪 Testing Workflows

### 1. Pre-publish Testing
```bash
# Build library
ng build ng-osm-map

# Test with local build
cd samples/ng-osm-map-sample
npm run install-local
npm start
```

### 2. Post-publish Validation
```bash
# Test with published version
cd samples/ng-osm-map-sample
npm run install-npm
npm start
```

### 3. Consumer Experience Audit
- Does installation work with one command?
- Are all TypeScript types available?
- Do styles load correctly?
- Are there any console errors?
- Is the bundle size reasonable?

## 📊 Current Samples

### 🗺️ ng-osm-map-sample
**Status**: ✅ Complete  
**Library**: `@ngmahesh/ng-osm-map`  
**Features Tested**:
- Zero-config installation
- Basic map rendering
- Custom pins and colors
- Interactive features
- Area highlighting
- Event handling
- Dynamic pin management

**Key Validations**:
- ✅ Single npm install command
- ✅ No angular.json modifications needed
- ✅ Leaflet styles automatically included
- ✅ TypeScript interfaces work correctly
- ✅ All core features functional

## 🔮 Future Samples

As new libraries are developed, additional samples will be added:

```
samples/
├── ng-osm-map-sample/          # ✅ Complete
├── ng-data-table-sample/       # 🔄 Coming soon
├── ng-form-builder-sample/     # 🔄 Coming soon
└── ng-chart-components-sample/ # 🔄 Coming soon
```

## 🛠️ Development Guidelines

When creating new samples:

1. **Independent Setup**: Each sample should be a standalone Angular app
2. **Consumer Perspective**: Use exact imports/commands consumers would use
3. **Comprehensive Testing**: Cover all major library features
4. **Clear Documentation**: Include usage examples and explanations
5. **Real-world Scenarios**: Show practical, not just theoretical usage
6. **Error Handling**: Include error states and edge cases

## 📝 Sample Template

Use this structure for new samples:

```
new-sample/
├── src/
│   ├── app/
│   │   └── app.component.ts    # Main examples
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── package.json                # Consumer-like dependencies
├── angular.json                # Standard Angular config
├── tsconfig.json
├── tsconfig.app.json
└── README.md                   # Sample documentation
```

## 🤝 Contributing

When adding new samples:

1. Create a new folder for each library
2. Set up a complete Angular application
3. Test both npm install and local linking
4. Document all features and usage patterns
5. Include error handling examples
6. Add to this README's sample list

## ⚠️ Known Issues

### npm Linking Issue with NgOsmSearchInputDirective

There is currently an issue with the npm build/linking process where the `NgOsmSearchInputDirective` is not being properly bundled into the final library package. The directive compiles correctly and works fine when imported directly from the source files, but gets excluded from the fesm2022 bundle during the Angular library build process.

**Working:**
- Direct imports from source: `import { NgOsmSearchInputDirective } from '../../../../projects/ng-osm-map/src/lib/directives/ng-osm-search-input.directive'`
- All other library components work correctly via npm

**Not Working:**
- npm package imports: `import { NgOsmSearchInputDirective } from '@ngmahesh/ng-osm-map'`

### Temporary Workaround

The sample apps currently use direct imports from the source files to demonstrate the full functionality. For production usage, you would need to either:

1. Use direct imports from the source (if using in the same workspace)
2. Wait for the bundling issue to be resolved
3. Manually copy the directive files to your project

### Next Steps to Resolve

1. Investigate Angular library build configuration
2. Check for dependency injection issues in the bundling process
3. Ensure all directive dependencies are properly exported
4. Test with different Angular CLI versions if Node.js version allows

---

**Remember**: These samples represent the real consumer experience. If something doesn't work here, it won't work for your users! 🎯
