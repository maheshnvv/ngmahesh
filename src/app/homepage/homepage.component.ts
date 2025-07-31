import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LibraryInfo {
  name: string;
  version: string;
  description: string;
  npmPackage: string;
  demoPath: string;
  docsPath: string;
  status: 'stable' | 'beta' | 'alpha';
  features: string[];
  npmStats?: {
    downloads: string;
    version: string;
  };
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  libraries: LibraryInfo[] = [
    {
      name: 'NgOsmMap',
      version: '1.0.0',
      description: 'A comprehensive Angular library for OpenStreetMap integration with Leaflet, featuring draggable pins, geocoding, search, and advanced selection systems.',
      npmPackage: '@ngmahesh/ng-osm-map',
      demoPath: '/demo/ng-osm-map',
      docsPath: '/docs/ng-osm-map',
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
      ],
      npmStats: {
        downloads: '1.2K+',
        version: '1.0.0'
      }
    }
    // More libraries will be added here as they are developed
  ];

  getTotalDownloads(): string {
    return this.libraries.reduce((total, lib) => {
      if (lib.npmStats?.downloads) {
        const downloads = lib.npmStats.downloads.replace(/[^\d]/g, '');
        return total + parseInt(downloads || '0');
      }
      return total;
    }, 0) + 'K+';
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
