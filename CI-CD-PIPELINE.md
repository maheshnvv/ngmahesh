# CI/CD Pipeline Documentation

This project includes an automated CI/CD pipeline that handles versioning, building, testing, and publishing of the ng-osm-map library based on commit message conventions.

## 🚀 How It Works

The CI/CD pipeline automatically:

1. **Validates commit messages** to ensure proper formatting
2. **Determines version bump type** based on commit message keywords
3. **Gets the latest version** from NPM to ensure proper versioning
4. **Builds and tests** the library
5. **Publishes to NPM** with the new version
6. **Creates GitHub releases** with detailed release notes
7. **Deploys documentation** to GitHub Pages

## 📝 Commit Message Format

All commit messages **must** include keywords in square brackets to indicate the type of change:

### Version Control Keywords

| Keyword | Version Bump | Example | Result |
|---------|-------------|---------|---------|
| `[fix]` | Patch | `1.0.0 → 1.0.1` | Bug fixes and small improvements |
| `[feat]` or `[feature]` | Minor | `1.0.0 → 1.1.0` | New features and functionality |
| `[upgrade]`, `[major]`, or `[breaking]` | Major | `1.0.0 → 2.0.0` | Breaking changes |

### Other Valid Keywords (Patch Bump)

| Keyword | Purpose |
|---------|---------|
| `[docs]` | Documentation changes |
| `[style]` | Code style changes (formatting, etc.) |
| `[refactor]` | Code refactoring without functionality changes |
| `[perf]` | Performance improvements |
| `[test]` | Adding or updating tests |
| `[chore]` | Maintenance tasks (dependencies, build, etc.) |

### ✅ Valid Examples

```bash
git commit -m "[feat] Add new map component with advanced features"
git commit -m "[fix] Resolve marker positioning issue in Safari"
git commit -m "[major] Breaking API changes for v2.0"
git commit -m "[docs] Update installation and usage instructions"
git commit -m "[feat][fix] Add feature and fix related bug"
git commit -m "[chore] Update dependencies and build scripts"
```

### ❌ Invalid Examples

```bash
git commit -m "Add new feature"           # Missing brackets
git commit -m "[added] new feature"       # Invalid keyword
git commit -m "feat: add new feature"     # Wrong format
git commit -m "[ ] empty brackets"        # Empty brackets
```

## 🔧 Setup

### 1. Install Git Hooks (Recommended)

To validate commit messages locally before pushing:

**On Windows:**
```bash
npm run install-hooks:win
```

**On Linux/Mac:**
```bash
npm run install-hooks
```

**Or manually:**
```bash
# Windows
install-git-hooks.bat

# Linux/Mac
bash install-git-hooks.sh
```

### 2. NPM Token Setup

For publishing to NPM, ensure the `NPM_TOKEN` secret is set in your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add a new repository secret named `NPM_TOKEN`
4. Set the value to your NPM authentication token

### 3. GitHub Token

The `GITHUB_TOKEN` is automatically provided by GitHub Actions for creating releases and tags.

## 🏃‍♂️ Running the Pipeline

### Automatic Triggers

The pipeline runs automatically on:

- **Push to `master` branch** - Publishes new versions
- **Push to `develop` branch** - Builds and tests only
- **Pull requests to `master`** - Validates and tests
- **Release creation** - Full deployment

### Manual Triggers

You can manually trigger the pipeline from the GitHub Actions tab:

1. Go to Actions → CI/CD Pipeline
2. Click "Run workflow"
3. Choose options:
   - **Force libraries**: Specify which libraries to build (e.g., `ng-osm-map`)
   - **Force docs**: Force documentation deployment
   - **Version bump**: Override automatic version detection
   - **Skip tests**: Skip testing phase

## 📦 Version Management

### Automatic Version Detection

The pipeline automatically:

1. **Fetches the latest version** from NPM
2. **Compares** with the current package.json version
3. **Uses the higher version** as the base
4. **Applies the version bump** based on commit message keywords

### Version Bump Logic

| Commit Keywords | Bump Type | Example |
|----------------|-----------|---------|
| `[fix]`, `[perf]`, `[docs]`, `[style]`, `[refactor]`, `[test]`, `[chore]` | **Patch** | `1.2.3 → 1.2.4` |
| `[feat]`, `[feature]` | **Minor** | `1.2.3 → 1.3.0` |
| `[upgrade]`, `[major]`, `[breaking]` | **Major** | `1.2.3 → 2.0.0` |

### Multiple Keywords

When multiple keywords are present, the highest precedence wins:

```bash
# This will trigger a MINOR bump (feat > fix)
git commit -m "[feat][fix] Add feature and fix bug"

# This will trigger a MAJOR bump (major > feat)
git commit -m "[major][feat] Breaking changes with new features"
```

## 📋 Pipeline Jobs

### 1. Validate Commit Message
- Runs on all pushes and PRs
- Validates commit message format
- Fails if format is incorrect

### 2. Detect Changes
- Determines which libraries changed
- Decides if documentation needs updating
- Sets deployment flags

### 3. Build and Test
- Builds the library
- Runs tests (when available)
- Creates build artifacts

### 4. Publish Libraries
- Determines version bump type
- Updates version in package.json
- Builds with new version
- Publishes to NPM
- Creates Git tags
- Creates GitHub releases

### 5. Deploy Documentation
- Builds documentation site
- Deploys to GitHub Pages
- Updates demo applications

### 6. Notify
- Reports success/failure status
- Provides summary of actions taken

## 🛠️ Troubleshooting

### Commit Message Validation Failed

If you see this error, your commit message doesn't follow the required format:

1. **Check the keywords**: Ensure you're using valid keywords in brackets
2. **Check the format**: Keywords must be in square brackets `[keyword]`
3. **Use the git hook**: Install the local git hook to catch issues early

### Version Conflicts

If there are version conflicts:

1. The pipeline automatically resolves by using the higher version
2. Manual intervention is rarely needed
3. Check the pipeline logs for version resolution details

### NPM Publish Failed

Common causes:

1. **NPM_TOKEN not set**: Ensure the secret is configured in GitHub
2. **Version already exists**: The pipeline should prevent this, but check NPM
3. **Package name conflicts**: Ensure the package name is unique

### Documentation Not Updating

Check if:

1. **Documentation files changed**: Only updates when docs files are modified
2. **Branch restrictions**: Only deploys from master/release branches
3. **Build failures**: Check the deploy-docs job logs

## 📊 Monitoring

### GitHub Actions

- View pipeline status in the Actions tab
- Monitor build logs and deployment status
- Check for any failed jobs

### NPM Packages

- Monitor package downloads and versions
- Check for successful publishes
- Verify package metadata

### GitHub Releases

- View automatically created releases
- Check release notes and assets
- Monitor version tags

## 🔄 Best Practices

### Commit Messages

1. **Be descriptive**: Explain what the change does
2. **Use proper keywords**: Choose the right keyword for the change type
3. **Group related changes**: Use multiple keywords when appropriate
4. **Keep it concise**: Aim for clear, brief messages

### Development Workflow

1. **Feature branches**: Develop features in separate branches
2. **Pull requests**: Use PRs for code review before merging
3. **Test locally**: Use the git hooks to catch issues early
4. **Semantic changes**: Ensure your keyword matches the actual change

### Release Management

1. **Review changes**: Check what will be released before merging
2. **Test thoroughly**: Ensure features work before publishing
3. **Monitor releases**: Watch for any issues after publishing
4. **Document breaking changes**: Clearly communicate major version changes

---

This automated CI/CD system ensures consistent, reliable releases while maintaining semantic versioning based on the nature of your changes.
