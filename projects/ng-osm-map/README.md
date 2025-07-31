# NgOsmMap

An Angular 18+ library for integrating OpenStreetMap with Leaflet, providing a simple directive to convert any div into an interactive map.

## Features

- 🗺️ **Easy Integration**: Simple directive to convert any div to a map
- 📍 **Flexible Pins**: Support for coordinates or address-based pins with custom colors and content
- 🎯 **Smart Zoom**: Zoom to specific locations automatically
- 🎨 **Area Highlighting**: Highlight areas with custom borders and colors
- 🌍 **Geocoding**: Built-in OpenStreetMap geocoding support
- 📱 **Responsive**: Works on all screen sizes
- 🎮 **Full Control**: Access to underlying Leaflet map instance

## Installation

```bash
npm install ng-osm-map leaflet @types/leaflet
```

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { NgOsmMapDirective, PinObject, LocationObject } from 'ng-osm-map';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgOsmMapDirective],
  template: `
    <div 
      ngOsmMap
      [pins]="pins"
      [zoomInto]="centerLocation"
      [highlightAreas]="areas"
      style="height: 400px; width: 100%;">
    </div>
  `
})
export class MapComponent {
  pins: PinObject[] = [
    {
      location: { latitude: 40.7128, longitude: -74.0060 },
      color: '#ff0000',
      title: 'New York City',
      content: '<h3>NYC</h3><p>The Big Apple</p>'
    }
  ];

  centerLocation: LocationObject = {
    latitude: 40.7128,
    longitude: -74.0060
  };
}
```

## Build

Run `ng build ng-osm-map` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-osm-map`, go to the dist folder `cd dist/ng-osm-map` and run `npm publish`.

## License

MIT
