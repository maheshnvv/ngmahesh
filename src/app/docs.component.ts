import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="docs-container">
      <!-- Navigation -->
      <nav class="docs-nav">
        <a routerLink="/" class="back-link">← Back to Homepage</a>
        <h1>NgOsmMap Documentation</h1>
      </nav>

      <!-- Documentation Content -->
      <main class="docs-content">
        <div class="container">

          <!-- Overview -->
          <section class="doc-section">
            <h2 id="overview">📋 Overview</h2>
            <p>NgOsmMap is a comprehensive Angular library for OpenStreetMap integration using Leaflet. It provides a complete solution for interactive maps with advanced features.</p>

            <div class="features-grid">
              <div class="feature-item">
                <h4>🗺️ Interactive Maps</h4>
                <p>Full-featured maps with zoom, pan, and interaction support</p>
              </div>
              <div class="feature-item">
                <h4>📍 Smart Pins</h4>
                <p>Draggable pins with custom templates and popups</p>
              </div>
              <div class="feature-item">
                <h4>🔍 Search & Geocoding</h4>
                <p>Built-in search with autocomplete and address resolution</p>
              </div>
              <div class="feature-item">
                <h4>🎨 Customizable</h4>
                <p>Multiple tile layers, themes, and styling options</p>
              </div>
            </div>
          </section>

          <!-- Installation -->
          <section class="doc-section">
            <h2 id="installation">📦 Installation</h2>
            <div class="code-block">
              <pre><code>npm install &#64;ngmahesh/ng-osm-map leaflet
npm install --save-dev &#64;types/leaflet</code></pre>
              <button class="copy-btn" (click)="copyToClipboard('npm install @ngmahesh/ng-osm-map leaflet\\nnpm install --save-dev @types/leaflet')">📋</button>
            </div>
          </section>

          <!-- Quick Start -->
          <section class="doc-section">
            <h2 id="quick-start">🚀 Quick Start</h2>
            <p>Import the component and start using it in your Angular application:</p>

            <h3>1. Import the Component</h3>
            <div class="code-block">
              <pre><code>import &#123; NgOsmMapComponent &#125; from '&#64;ngmahesh/ng-osm-map';

&#64;Component(&#123;
  standalone: true,
  imports: [NgOsmMapComponent],
  // ...
&#125;)
export class MyComponent &#123; &#125;</code></pre>
            </div>

            <h3>2. Add to Template</h3>
            <div class="code-block">
              <pre><code>&lt;ng-osm-map
  [pins]="pins"
  [height]="400"
  [width]="'100%'"
  (mapClick)="onMapClick($event)"&gt;
&lt;/ng-osm-map&gt;</code></pre>
            </div>

            <h3>3. Define Pins in Component</h3>
            <div class="code-block">
              <pre><code>export class MyComponent &#123;
  pins: PinObject[] = [
    &#123;
      title: 'New York',
      coordinates: &#123; latitude: 40.7128, longitude: -74.0060 &#125;,
      color: 'red',
      draggable: true
    &#125;
  ];

  onMapClick(event: MapClickEvent) &#123;
    console.log('Map clicked:', event.location);
  &#125;
&#125;</code></pre>
            </div>
          </section>

          <!-- Examples -->
          <section class="doc-section">
            <h2 id="examples">💡 Examples</h2>
            <p><strong>Try the live examples:</strong> <a routerLink="/ng-osm-map/demo" class="demo-link">View Interactive Demo →</a></p>
          </section>

          <!-- Support -->
          <section class="doc-section">
            <h2 id="support">🆘 Support</h2>
            <p>Need help? Here are your options:</p>
            <ul class="support-list">
              <li><strong>GitHub Issues:</strong> <a href="https://github.com/maheshnvv/ngmahesh/issues" target="_blank">Report bugs or request features</a></li>
              <li><strong>Discussions:</strong> <a href="https://github.com/maheshnvv/ngmahesh/discussions" target="_blank">Community discussions</a></li>
              <li><strong>Email:</strong> support&#64;ngmahesh.dev</li>
            </ul>
          </section>

        </div>
      </main>

      <!-- Table of Contents -->
      <aside class="toc">
        <h3>Table of Contents</h3>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#installation">Installation</a></li>
          <li><a href="#quick-start">Quick Start</a></li>
          <li><a href="#examples">Examples</a></li>
          <li><a href="#support">Support</a></li>
        </ul>
      </aside>
    </div>
  `,
  styleUrl: './docs.component.scss'
})
export class DocsComponent {
  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }
}
