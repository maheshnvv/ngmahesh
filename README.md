# NgMahesh Angular Libraries

A collection of high-quality Angular libraries for modern web development.

## 🚀 Quick Start

Visit our [documentation site](https://maheshnvv.github.io/ngmahesh) to explore all available libraries with live demos and comprehensive guides.

## 📚 Available Libraries

### NgOsmMap
- **Package**: `@ngmahesh/ng-osm-map`
- **Description**: Angular library for OpenStreetMap integration with Leaflet
- **Status**: ✅ Stable
- **Demo**: [Live Demo](https://maheshnvv.github.io/ngmahesh/demo/ng-osm-map)
- **Docs**: [Documentation](https://maheshnvv.github.io/ngmahesh/docs/ng-osm-map)

## 🔧 Development

### Prerequisites
- Node.js 20.x or higher
- npm 9.x or higher
- Angular CLI 18.x or higher

### Setup
```bash
git clone https://github.com/ngmahesh/ng-libraries.git
cd ng-libraries
npm install

# Install git hooks for commit message validation (recommended)
npm run install-hooks        # Linux/Mac
npm run install-hooks:win    # Windows
```

### Building Libraries
```bash
# Build specific library
npm run build ng-osm-map

# Build all libraries
npm run build:all
```

### Running Demos
```bash
# Run main homepage
npm start

# Run specific library demo
npm run demo:ng-osm-map
```

## 🚀 CI/CD & Contributing

This project uses an automated CI/CD pipeline with commit message-based versioning. 

### Commit Message Format
All commits must include keywords in brackets to determine version bumps:

- `[fix]` - Bug fixes (patch: 1.0.0 → 1.0.1)
- `[feat]` - New features (minor: 1.0.0 → 1.1.0)
- `[major]` - Breaking changes (major: 1.0.0 → 2.0.0)
- `[docs]`, `[chore]`, `[style]`, etc. - Other changes (patch)

**Examples:**
```bash
git commit -m "[feat] Add new map component feature"
git commit -m "[fix] Resolve marker positioning issue"
git commit -m "[major] Breaking API changes for v2.0"
```

For complete CI/CD documentation, see [CI-CD-PIPELINE.md](./CI-CD-PIPELINE.md)

## 🚀 Publishing Libraries

### NPM Organization Setup
1. Create an account on [npmjs.com](https://www.npmjs.com) if you don't have one.
2. Log in and create an organization (if needed) for scoping packages.

### Required GitHub Secrets

You need to set up the following secrets in your GitHub repository:

#### 1. NPM_TOKEN
For publishing packages to npm:

**Steps to create NPM token:**
1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Click on your profile → "Access Tokens"
3. Click "Generate New Token" → "Granular Access Token"
4. Configure the token:
   - **Name**: `NgLibrariesCI`
   - **Expiration**: 1 year (or as needed)
   - **Packages and scopes**: Select your scope (`@ngmahesh`)
   - **Permissions**: 
     - Packages: `Read and write`
     - Organizations: `Read` (for @ngmahesh scope)
5. Copy the generated token

**Add to GitHub:**
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your NPM token
6. Click "Add secret"

#### 2. GITHUB_TOKEN (Automatically provided)
This is automatically provided by GitHub Actions for repository operations like creating releases and pushing to GitHub Pages.

### Branch Protection Rules

Set up branch protection for `main` and `release/*` branches:

1. Go to Settings → Branches
2. Add rule for `main`:
   - Require pull request reviews
   - Require status checks to pass before merging
   - Require up-to-date branches
   - Include administrators
3. Add rule for `release/*`:
   - Same as main branch rules

### Workflow Triggers

The CI/CD pipeline triggers on:
- **Push to main**: Builds, tests, and publishes libraries + deploys docs
- **Push to release/***: Same as main, with version bumping
- **Pull requests**: Builds and tests only (no publishing)

### Version Management

Version bumping is automatic based on:
- **Commit messages**:
  - `feat:` or `feature:` → Minor version bump
  - `BREAKING CHANGE` or `major:` → Major version bump
  - Other commits → Patch version bump
- **Branch names**:
  - `release/major-*` → Major version bump
  - `release/minor-*` → Minor version bump
  - `release/*` → Patch version bump

### Publishing Process

1. **Development**: Work on feature branches
2. **Pull Request**: Create PR to `main` or `release/*`
3. **Review**: Code review and approval
4. **Merge**: Merge to target branch
5. **Automatic**: CI/CD detects changes and:
   - Builds affected libraries
   - Bumps versions
   - Publishes to NPM
   - Creates GitHub releases
   - Deploys documentation

### Manual Release

To manually trigger a release:

```bash
# Create a release branch
git checkout -b release/minor-ng-osm-map
git push origin release/minor-ng-osm-map

# Or tag the commit
git tag ng-osm-map-v1.1.0
git push origin ng-osm-map-v1.1.0
```

## 📖 Documentation Structure

```
docs/
├── ng-osm-map/
│   ├── getting-started.md
│   ├── api-reference.md
│   ├── examples/
│   └── changelog.md
└── shared/
    ├── contributing.md
    └── code-of-conduct.md
```

## 🏗️ Project Structure

```
ngmahesh/
├── .github/workflows/          # GitHub Actions CI/CD
├── projects/                   # Angular libraries
│   └── ng-osm-map/            # NgOsmMap library source
├── src/app/                   # Main app with routing
│   ├── homepage.component.ts  # Homepage (library list)
│   ├── demo.component.ts      # NgOsmMap demo
│   ├── docs.component.ts      # NgOsmMap documentation
│   └── app.routes.ts          # Routing configuration
├── apps/                      # Legacy demo apps (for reference)
├── docs/                      # Static documentation files
└── dist/                      # Built output
    ├── ngmahesh/              # Main app (homepage + demos + docs)
    └── ng-osm-map/            # Built library for npm
```

### App Routing Structure:
- `/` - Homepage with library listing
- `/ng-osm-map/demo` - Interactive demo for NgOsmMap
- `/ng-osm-map/docs` - Documentation for NgOsmMap
- Future libraries will follow: `/library-name/demo` and `/library-name/docs`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [NPM Organization](https://www.npmjs.com/~ngmahesh)
- [GitHub Repository](https://github.com/ngmahesh/ng-libraries)
- [Documentation Site](https://ngmahesh.github.io/ng-libraries)
- [Issue Tracker](https://github.com/ngmahesh/ng-libraries/issues)

---

**Maintained by**: [NgMahesh](https://github.com/ngmahesh)  
**Last Updated**: July 2025
