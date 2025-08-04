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
              <div *ngFor="let library of libraries" class="library-card">
                <div class="library-header">
                  <h3 class="library-name">{{ library.name }}</h3>
                  <span class="library-version" [class]="'status-' + library.status">
                    v{{ library.version }}
                  </span>
                  <span class="library-status" [class]="'status-' + library.status">
                    {{ library.status }}
                  </span>
                </div>

                <p class="library-description">{{ library.description }}</p>

                <div class="library-features">
                  <span *ngFor="let feature of library.features" class="feature-tag">
                    {{ feature }}
                  </span>
                </div>

                <div class="library-npm">
                  <code class="npm-install">npm install {{ library.npmPackage }}</code>
                </div>

                <div class="library-actions">
                  <a [routerLink]="library.demoPath" class="btn btn-primary">
                    🎮 Live Demo
                  </a>
                  <a [routerLink]="library.docsPath" class="btn btn-secondary">
                    📖 Documentation
                  </a>
                  <a [href]="'https://www.npmjs.com/package/' + library.npmPackage"
                     target="_blank" class="btn btn-outline">
                    📦 NPM
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
                <p>Choose and install the library you need</p>
                <code>npm install &#64;ngmahesh/[library-name]</code>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <h3>Import</h3>
                <p>Import the module in your Angular app</p>
                <code>import {{ '{' }} LibraryModule {{ '}' }} from '&#64;ngmahesh/[library-name]'</code>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <h3>Use</h3>
                <p>Follow the documentation to implement</p>
                <code>&lt;lib-component&gt;&lt;/lib-component&gt;</code>
              </div>
            </div>
          </section>

          <!-- Features -->
          <section class="features-section">
            <h2>✨ Why Choose NgMahesh Libraries?</h2>
            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">🎯</div>
                <h3>Production Ready</h3>
                <p>Battle-tested libraries used in production applications</p>
              </div>
              <div class="feature">
                <div class="feature-icon">📱</div>
                <h3>Modern Angular</h3>
                <p>Built with latest Angular features and best practices</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔧</div>
                <h3>TypeScript First</h3>
                <p>Full TypeScript support with comprehensive type definitions</p>
              </div>
              <div class="feature">
                <div class="feature-icon">📚</div>
                <h3>Well Documented</h3>
                <p>Comprehensive documentation with live examples</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🚀</div>
                <h3>Performance</h3>
                <p>Optimized for performance with minimal bundle size</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <h3>Regular Updates</h3>
                <p>Actively maintained with regular updates and bug fixes</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <p>&copy; 2025 NgMahesh Libraries - Open Source Angular Libraries</p>
          <div class="footer-links">
            <a href="https://github.com/ngmahesh/ng-libraries" target="_blank">GitHub</a>
            <a href="https://www.npmjs.com/~ngmahesh" target="_blank">NPM</a>
            <a href="mailto:contact@ngmahesh.dev">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .homepage {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .hero-title {
      font-size: 3.5rem;
      margin: 0 0 1rem 0;
      font-weight: 300;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin: 0 0 2rem 0;
      opacity: 0.9;
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 600;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      padding: 4rem 0;
    }

    .libraries-section {
      margin-bottom: 4rem;
    }

    .libraries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .library-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .library-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .library-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .library-name {
      margin: 0;
      color: #1f2937;
      flex: 1;
    }

    .library-version {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .library-status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-stable {
      background: #dcfce7;
      color: #166534;
    }

    .status-beta {
      background: #fef3c7;
      color: #92400e;
    }

    .status-alpha {
      background: #fee2e2;
      color: #991b1b;
    }

    .library-description {
      color: #6b7280;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .library-features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .feature-tag {
      background: #f3f4f6;
      color: #374151;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .library-npm {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 0.75rem;
      margin-bottom: 1rem;
    }

    .npm-install {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: #1f2937;
    }

    .library-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
      border: 1px solid transparent;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-secondary:hover {
      background: #4b5563;
    }

    .btn-outline {
      background: transparent;
      color: #374151;
      border-color: #d1d5db;
    }

    .btn-outline:hover {
      background: #f9fafb;
    }

    /* Getting Started */
    .getting-started {
      margin-bottom: 4rem;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .step {
      text-align: center;
      padding: 2rem;
      background: #f9fafb;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .step-number {
      width: 3rem;
      height: 3rem;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin: 0 auto 1rem auto;
      font-size: 1.25rem;
    }

    .step h3 {
      margin: 0 0 0.5rem 0;
      color: #1f2937;
    }

    .step p {
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .step code {
      background: white;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #d1d5db;
      font-size: 0.875rem;
      display: block;
    }

    /* Features */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature {
      text-align: center;
      padding: 2rem;
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature h3 {
      margin: 0 0 0.5rem 0;
      color: #1f2937;
    }

    .feature p {
      color: #6b7280;
      line-height: 1.6;
    }

    /* Footer */
    .footer {
      background: #1f2937;
      color: white;
      padding: 2rem 0;
      text-align: center;
    }

    .footer-links {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      gap: 2rem;
    }

    .footer-links a {
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: white;
    }

    /* Section Headers */
    section h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #1f2937;
      font-size: 2rem;
      font-weight: 600;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-stats {
        flex-direction: column;
        gap: 1rem;
      }

      .library-actions {
        flex-direction: column;
      }

      .footer-links {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class AppComponent {
  libraries: LibraryInfo[] = [
    {
      name: 'NgOsmMap',
      version: '1.0.0',
      description: 'Angular library for OpenStreetMap integration with Leaflet. Create interactive maps with pins, areas, search, and much more.',
      npmPackage: '@ngmahesh/ng-osm-map',
      demoPath: '/ng-osm-map/demo',
      docsPath: '/ng-osm-map/docs',
      status: 'stable',
      features: ['Interactive Maps', 'Custom Pins', 'Search & Geocoding', 'Template Popups', 'Area Highlighting', 'Multiple Tile Layers']
    }
    // More libraries will be added here as they are developed
  ];

  getTotalDownloads(): string {
    // This would typically come from NPM API
    return '1.2K+';
  }

  getStableCount(): number {
    return this.libraries.filter(lib => lib.status === 'stable').length;
  }
}
