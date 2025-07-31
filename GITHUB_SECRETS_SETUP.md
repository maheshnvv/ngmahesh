# GitHub Secrets Setup Instructions

## Required Secrets for CI/CD Pipeline

To enable the automated CI/CD pipeline for publishing to npm and deploying to GitHub Pages, you need to set up the following secrets in your GitHub repository.

## 1. NPM_TOKEN (Required for npm publishing)

### Step-by-Step Setup:

1. **Create/Login to NPM Account**
   - Go to [npmjs.com](https://www.npmjs.com/)
   - Sign up for a new account or log in to existing account
   - Verify your email address

2. **Generate Access Token**
   - Click on your profile picture (top right)
   - Select "Access Tokens" from dropdown
   - Click "Generate New Token"
   - Choose "Automation" token type (required for CI/CD)
   - Give it a descriptive name like "GitHub Actions - NgMahesh Libraries"
   - Copy the generated token (it starts with `npm_`)

3. **Add Token to GitHub Secrets**
   - Go to your GitHub repository
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: Paste your NPM token
   - Click **Add secret**

## 2. Verify Secrets Setup

After adding the secrets, you can verify they're set up correctly:

1. Go to your repository's **Settings** → **Secrets and variables** → **Actions**
2. You should see:
   - ✅ `NPM_TOKEN` (Repository secret)

## 3. How the CI/CD Pipeline Works

Once secrets are configured, the pipeline will automatically:

### On Push to Main Branch:
1. **Detect Changes**: Scan for changes in library folders
2. **Build & Test**: Build changed libraries and run tests
3. **Version Bump**: Automatically increment version based on commit message
4. **Publish to NPM**: Publish scoped packages (`@ngmahesh/library-name`)
5. **Create GitHub Release**: Generate release with changelog
6. **Deploy Docs**: Deploy homepage and documentation to GitHub Pages

### On Pull Requests:
1. **Build & Test**: Ensure code quality
2. **No Publishing**: Safe testing without releases

## 4. Version Bumping Strategy

The pipeline automatically determines version bump type from commit messages:

### Major Version (Breaking Changes)
Include `[major]` or `breaking` in commit message:
```bash
git commit -m "breaking: change API interface [major]"
git commit -m "refactor: remove deprecated methods [major]"
```

### Minor Version (New Features)
Include `[minor]` or `feat` in commit message:
```bash
git commit -m "feat: add template popup support [minor]"
git commit -m "feature: new geocoding service [minor]"
```

### Patch Version (Bug Fixes)
Default for all other commits:
```bash
git commit -m "fix: resolve pin dragging issue"
git commit -m "docs: update README"
git commit -m "chore: update dependencies"
```

## 5. Publishing Workflow

### Example Workflow:
1. **Make Changes**: Update library code
2. **Commit**: Use descriptive commit message
   ```bash
   git commit -m "feat: add multi-select pin functionality [minor]"
   ```
3. **Push**: Push to main branch
   ```bash
   git push origin main
   ```
4. **Automatic Process**: GitHub Actions will:
   - Detect changes in `projects/ng-osm-map/`
   - Build and test the library
   - Bump version from `1.0.0` to `1.1.0` (minor)
   - Publish `@ngmahesh/ng-osm-map@1.1.0` to npm
   - Create GitHub release `ng-osm-map-v1.1.0`
   - Deploy updated docs to GitHub Pages

## 6. GitHub Pages Configuration

The documentation site will be automatically deployed to GitHub Pages:

1. **Repository Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` (created automatically)
4. **Folder**: `/ (root)`
5. **URL**: `https://ngmahesh.github.io/ng-libraries/`

## 7. Troubleshooting

### NPM Publishing Issues:
- Ensure NPM_TOKEN has "automation" scope
- Check if package name `@ngmahesh/ng-osm-map` is available
- Verify npm account has publishing permissions

### GitHub Pages Issues:
- Check if gh-pages branch exists
- Verify Pages settings in repository
- Check Actions logs for deployment errors

### CI/CD Pipeline Issues:
- Check GitHub Actions logs for detailed error messages
- Ensure all secrets are properly configured
- Verify workflow file syntax

## 8. Security Notes

- **Never commit secrets to code**: Use GitHub Secrets only
- **Rotate tokens regularly**: Generate new NPM tokens periodically
- **Monitor usage**: Check npm and GitHub for unauthorized access
- **Use scoped packages**: `@ngmahesh/` prevents naming conflicts

## 9. Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Token Documentation](https://docs.npmjs.com/about-access-tokens)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Library Building](https://angular.io/guide/creating-libraries)

---

After setting up these secrets, your repository will have a fully automated CI/CD pipeline that publishes to npm and deploys documentation to GitHub Pages!
