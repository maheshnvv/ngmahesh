import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgOsmMapDirective, NgOsmMapComponent, PinObject, LocationObject, HighlightArea } from '../../projects/ng-osm-map/src/public-api';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [NgOsmMapDirective, NgOsmMapComponent],
  template: `
    <!-- Example 1: Basic Map with Directive -->
    <section class="example">
      <h2>Example 1: Basic Map with Directive</h2>
      <div
        #mapDirective
        ngOsmMap
        [pins]="basicPins"
        [zoomInto]="nycLocation"
        style="height: 300px; width: 100%; border: 1px solid #ccc; border-radius: 8px;">
      </div>
    </section>

    <!-- Example 2: Map Component with Controls -->
    <section class="example">
      <h2>Example 2: Map Component with Dynamic Controls</h2>
      <div class="controls">
        <button (click)="addRandomPin()">Add Random Pin</button>
        <button (click)="clearAllPins()">Clear All Pins</button>
        <button (click)="fitBounds()">Fit Bounds</button>
      </div>
      <ng-osm-map
        #mapComponent
        [pins]="dynamicPins"
        [height]="350"
        [width]="'100%'">
      </ng-osm-map>
    </section>

    <!-- Example 3: Address-based Pins -->
    <section class="example">
      <h2>Example 3: Address-based Pins with Custom Content</h2>
      <div
        ngOsmMap
        [pins]="addressPins"
        [mapOptions]="{ zoom: 6 }"
        style="height: 300px; width: 100%; border: 1px solid #ccc; border-radius: 8px;">
      </div>
    </section>

    <!-- Example 4: Area Highlighting -->
    <section class="example">
      <h2>Example 4: Area Highlighting</h2>
      <div
        ngOsmMap
        [pins]="areaPins"
        [highlightAreas]="highlightAreas"
        [zoomInto]="centralParkCenter"
        [mapOptions]="{ zoom: 15 }"
        style="height: 350px; width: 100%; border: 1px solid #ccc; border-radius: 8px;">
      </div>
    </section>

    <!-- Example 5: Custom Icons -->
    <section class="example">
      <h2>Example 5: Custom Pin Icons</h2>
      <div
        ngOsmMap
        [pins]="customIconPins"
        [mapOptions]="{ zoom: 12 }"
        style="height: 300px; width: 100%; border: 1px solid #ccc; border-radius: 8px;">
      </div>
    </section>
  `,
  styles: [`
    .example {
      margin: 2rem 0;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    .example h2 {
      margin-top: 0;
      color: #333;
    }

    .controls {
      margin-bottom: 1rem;
    }

    .controls button {
      margin-right: 0.5rem;
      padding: 0.5rem 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .controls button:hover {
      background: #0056b3;
    }
  `]
})
export class ExamplesComponent implements AfterViewInit {
  @ViewChild('mapDirective') mapDirective!: NgOsmMapDirective;
  @ViewChild('mapComponent') mapComponent!: NgOsmMapComponent;

  // Example 1: Basic pins with coordinates
  basicPins: PinObject[] = [
    {
      location: { latitude: 40.7128, longitude: -74.0060 },
      color: '#ff0000',
      title: 'New York City',
      content: '<h3>🗽 NYC</h3><p>The Big Apple</p>'
    },
    {
      location: { latitude: 40.7589, longitude: -73.9851 },
      color: '#00ff00',
      title: 'Times Square',
      content: '<h3>🎭 Times Square</h3><p>The Crossroads of the World</p>'
    }
  ];

  nycLocation: LocationObject = { latitude: 40.7128, longitude: -74.0060 };

  // Example 2: Dynamic pins
  dynamicPins: PinObject[] = [
    {
      location: { latitude: 51.5074, longitude: -0.1278 },
      color: '#0000ff',
      title: 'London',
      content: '<h3>🇬🇧 London</h3><p>Capital of England</p>'
    }
  ];

  // Example 3: Address-based pins
  addressPins: PinObject[] = [
    {
      location: {
        address: '1600 Amphitheatre Parkway',
        city: 'Mountain View',
        state: 'California',
        country: 'USA'
      },
      color: '#4285f4',
      title: 'Google HQ',
      content: '<h3>🏢 Google</h3><p>Search engine headquarters</p>'
    },
    {
      location: {
        address: '1 Microsoft Way',
        city: 'Redmond',
        state: 'Washington',
        country: 'USA'
      },
      color: '#00a1f1',
      title: 'Microsoft HQ',
      content: '<h3>🏢 Microsoft</h3><p>Software giant headquarters</p>'
    },
    {
      location: {
        address: '1 Apple Park Way',
        city: 'Cupertino',
        state: 'California',
        country: 'USA'
      },
      color: '#a2aaad',
      title: 'Apple Park',
      content: '<h3>🍎 Apple</h3><p>Technology company campus</p>'
    }
  ];

  // Example 4: Area highlighting
  areaPins: PinObject[] = [
    {
      location: { latitude: 40.7829, longitude: -73.9654 },
      color: '#228b22',
      title: 'Central Park',
      content: '<h3>🌳 Central Park</h3><p>Urban oasis in Manhattan</p>'
    }
  ];

  centralParkCenter: LocationObject = { latitude: 40.7829, longitude: -73.9654 };

  highlightAreas: HighlightArea[] = [
    {
      boundary: [
        { latitude: 40.7973, longitude: -73.9499 }, // NE corner
        { latitude: 40.7973, longitude: -73.9812 }, // NW corner
        { latitude: 40.7644, longitude: -73.9812 }, // SW corner
        { latitude: 40.7644, longitude: -73.9499 }  // SE corner
      ],
      borderColor: '#228b22',
      fillColor: '#228b22',
      fillOpacity: 0.1,
      borderWidth: 2,
      title: 'Central Park Area'
    }
  ];

  // Example 5: Custom icons
  customIconPins: PinObject[] = [
    {
      location: { latitude: 48.8566, longitude: 2.3522 },
      icon: {
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      },
      title: 'Paris',
      content: '<h3>🗼 Paris</h3><p>City of Light</p>'
    },
    {
      location: { latitude: 51.5074, longitude: -0.1278 },
      icon: {
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      },
      title: 'London',
      content: '<h3>🇬🇧 London</h3><p>Royal city</p>'
    },
    {
      location: { latitude: 52.5200, longitude: 13.4050 },
      icon: {
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      },
      title: 'Berlin',
      content: '<h3>🇩🇪 Berlin</h3><p>German capital</p>'
    }
  ];

  ngAfterViewInit() {
    // Access to the underlying Leaflet map
    setTimeout(() => {
      const leafletMap = this.mapDirective?.getMap();
      if (leafletMap) {
        leafletMap.on('click', (e: any) => {
          console.log('Map clicked at:', e.latlng);
        });
      }
    }, 1000);
  }

  addRandomPin() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const randomPin: PinObject = {
      location: {
        latitude: (Math.random() - 0.5) * 180,
        longitude: (Math.random() - 0.5) * 360
      },
      color: randomColor,
      title: 'Random Pin',
      content: `<h3>📍 Random Location</h3><p>Generated at ${new Date().toLocaleTimeString()}</p>`
    };

    this.dynamicPins = [...this.dynamicPins, randomPin];
  }

  clearAllPins() {
    this.dynamicPins = [];
  }

  fitBounds() {
    this.mapComponent?.fitBounds();
  }
}
