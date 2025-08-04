import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface LibraryInfo {
  name: string;
  version: string;
  description: string;
  npmPackage: string;
  demoPath: string;
  docsPath: string;
  status: 'stable' | 'beta' | 'alpha';
  features: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="homepage">
      <!-- Header -->
      <header class="hero-section">
        <div class="container">
          <h1 class="hero-title">🚀 NgMahesh Libraries</h1>
          <p class="hero-subtitle">
            Collection of high-quality Angular libraries for modern web development
          </p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">{{ libraries.length }}</span>
              <span class="stat-label">Libraries</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ getTotalDownloads() }}</span>
              <span class="stat-label">Downloads</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ getStableCount() }}</span>
              <span class="stat-label">Stable</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Libraries Grid -->
      <main class="main-content">
        <div class="container">
          <section class="libraries-section">
            <h2>📚 Available Libraries</h2>
            <div class="libraries-grid">
              <div
                *ngFor="let library of libraries"
                class="library-card"
                [class.library-stable]="library.status === 'stable'"
                [class.library-beta]="library.status === 'beta'"
                [class.library-alpha]="library.status === 'alpha'">

                <div class="library-header">
                  <h3 class="library-name">{{ library.name }}</h3>
                  <span class="library-status" [attr.data-status]="library.status">
                    {{ library.status }}
                  </span>
                </div>

                <p class="library-description">{{ library.description }}</p>

                <div class="library-npm">
                  <code class="npm-install">npm install {{ library.npmPackage }}</code>
                  <button
                    class="copy-btn"
                    (click)="copyToClipboard('npm install ' + library.npmPackage)"
                    title="Copy install command">
                    📋
                  </button>
                </div>

                <div class="library-features">
                  <h4>Key Features:</h4>
                  <ul class="features-list">
                    <li *ngFor="let feature of library.features">{{ feature }}</li>
                  </ul>
                </div>

                <div class="library-links">
                  <a [href]="library.demoPath" class="btn btn-demo" target="_blank">
                    🔗 Live Demo
                  </a>
                  <a [href]="library.docsPath" class="btn btn-docs" target="_blank">
                    📖 Documentation
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Getting Started -->
          <section class="getting-started">
            <h2>🚀 Getting Started</h2>
            <div class="steps-grid">
              <div class="step">
                <div class="step-number">1</div>
                <h3>Install</h3>
                <p>Choose a library and install it using npm or yarn</p>
                <code>npm install &#64;ngmahesh/[library-name]</code>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <h3>Import</h3>
                <p>Import the library modules into your Angular application</p>
                <code>import {{ '{' }} NgOsmMapModule {{ '}' }} from '&#64;ngmahesh/ng-osm-map'</code>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <h3>Use</h3>
                <p>Start using the components and services in your app</p>
                <code>&lt;ng-osm-map [pins]="pins"&gt;&lt;/ng-osm-map&gt;</code>
              </div>
            </div>
          </section>

          <!-- About -->
          <section class="about-section">
            <h2>ℹ️ About NgMahesh Libraries</h2>
            <div class="about-content">
              <p>
                NgMahesh Libraries is a collection of high-quality, well-tested Angular libraries
                designed to accelerate your development process. Each library follows Angular best
                practices and provides comprehensive documentation and examples.
              </p>
              <div class="features-grid">
                <div class="feature-item">
                  <h4>🎯 Angular 18+ Compatible</h4>
                  <p>Built with the latest Angular features and patterns</p>
                </div>
                <div class="feature-item">
                  <h4>📦 Tree-shakable</h4>
                  <p>Optimized bundle sizes with tree-shaking support</p>
                </div>
                <div class="feature-item">
                  <h4>🧪 Well Tested</h4>
                  <p>Comprehensive test coverage for reliability</p>
                </div>
                <div class="feature-item">
                  <h4>📚 Great Documentation</h4>
                  <p>Detailed docs with examples and API references</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h4>Libraries</h4>
              <ul>
                <li *ngFor="let library of libraries">
                  <a [href]="library.demoPath">{{ library.name }}</a>
                </li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://github.com/ngmahesh/ng-libraries" target="_blank">GitHub</a></li>
                <li><a href="https://www.npmjs.com/~ngmahesh" target="_blank">NPM Profile</a></li>
                <li><a href="mailto:support@ngmahesh.dev">Support</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Community</h4>
              <ul>
                <li><a href="https://github.com/ngmahesh/ng-libraries/discussions" target="_blank">Discussions</a></li>
                <li><a href="https://github.com/ngmahesh/ng-libraries/issues" target="_blank">Issues</a></li>
                <li><a href="https://twitter.com/ngmahesh" target="_blank">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 NgMahesh Libraries. Licensed under MIT.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  libraries: LibraryInfo[] = [
    {
      name: 'NgOsmMap',
      version: '1.0.0',
      description: 'A comprehensive Angular library for OpenStreetMap integration with Leaflet, featuring draggable pins, geocoding, search, and advanced selection systems.',
      npmPackage: '@ngmahesh/ng-osm-map',
      demoPath: './apps/ng-osm-map-demo/index.html',
      docsPath: './docs/ng-osm-map/index.html',
      status: 'stable',
      features: [
        'Interactive map with Leaflet integration',
        'Draggable pins with custom templates',
        'Geocoding and reverse geocoding',
        'Smart search with autocomplete',
        'Area highlighting capabilities',
        'Multiple tile layer support',
        'Advanced selection system',
        'Template-based popups'
      ]
    }
    // More libraries will be added here as they are developed
  ];

  getTotalDownloads(): string {
    // This would typically come from npm API or analytics
    return '1.2K+';
  }

  getStableCount(): number {
    return this.libraries.filter(lib => lib.status === 'stable').length;
  }

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      console.log('Copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }
}
