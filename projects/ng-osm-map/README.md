# NgOsmMap

An Angular 18+ library for integrating OpenStreetMap with Leaflet, providing a simple directive to convert any div into an interactive map.

## 🔗 Links

- **Demo**: [Live Demo](https://maheshnvv.github.io/ngmahesh/)
- **Documentation**: [Full Documentation](https://maheshnvv.github.io/ngmahesh/docs/ng-osm-map)
- **Repository**: [GitHub](https://github.com/maheshnvv/ngmahesh)
- **Issues**: [Report Issues](https://github.com/maheshnvv/ngmahesh/issues)

## Features

- 🗺️ **Easy Integration**: Simple directive to convert any div to a map
- 📍 **Flexible Pins**: Support for coordinates or address-based pins with custom colors and content
- 🎯 **Smart Zoom**: Zoom to specific locations automatically
- 🎨 **Area Highlighting**: Highlight areas with custom borders and colors
- 🌍 **Geocoding**: Built-in OpenStreetMap geocoding support with robust fallback ladder
- 🔍 **Advanced Search**: Built-in search with autocomplete and external search input binding
- ⚡ **Selection System**: Advanced selection system with single/multi-select modes
- 🎯 **Programmatic Selection**: Multiple approaches for programmatic location selection
- 📱 **Responsive**: Works on all screen sizes
- 🎮 **Full Control**: Access to underlying Leaflet map instance

## Installation

```bash
npm install @ngmahesh/ng-osm-map
```

**That's it!** The library automatically includes all necessary styles and dependencies. No additional configuration needed.

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { NgOsmMapDirective, PinObject, LocationObject } from '@ngmahesh/ng-osm-map';

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
      [searchLocation]="searchLocation"
      (selectionChanged)="onSelectionChanged($event)"
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

  searchLocation?: LocationObject;

  onSelectionChanged(selections: any[]) {
    console.log('Selections changed:', selections);
  }
  
  // Programmatically select a location (triggers events)
  selectLocation() {
    this.searchLocation = {
      address: '1600 Pennsylvania Ave, Washington, DC'
    };
  }
}
```

## Programmatic Selection

The library offers two approaches for programmatic location selection:

### 1. Silent Selection (preSelectedLocations)
Use for initial map state without triggering selection events:

```typescript
export class MapComponent {
  // These locations will be selected but won't trigger selectionChanged events
  preSelectedLocations: LocationObject[] = [
    { latitude: 40.7128, longitude: -74.0060 }, // NYC
    { latitude: 34.0522, longitude: -118.2437 } // LA
  ];
}
```

### 2. Interactive Selection (searchLocation / searchForLocation)
Use when you want full selection behavior including events:

```typescript
export class MapComponent {
  @ViewChild(NgOsmMapComponent) mapComponent!: NgOsmMapComponent;
  
  searchLocation?: LocationObject;

  // Method 1: Using searchLocation property
  selectUsingProperty() {
    this.searchLocation = {
      address: '1600 Pennsylvania Ave, Washington, DC'
    };
  }

  // Method 2: Using searchForLocation method
  selectUsingMethod() {
    this.mapComponent.searchForLocation({
      address: 'Times Square, New York, NY'
    });
  }

  onSelectionChanged(selections: SelectedLocation[]) {
    // This will be triggered by the above methods but NOT by preSelectedLocations
    console.log('User or programmatic selection:', selections);
  }
}
```

## Build

Run `ng build ng-osm-map` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-osm-map`, go to the dist folder `cd dist/ng-osm-map` and run `npm publish`.

## SelectedLocation Interface

When handling selection events, address information is accessed through the `addressInfo.address` structure:

```typescript
onSelectionChanged(selections: SelectedLocation[]) {
  selections.forEach(selection => {
    // Access address information via addressInfo.address
    const city = selection.addressInfo?.address?.city;
    const state = selection.addressInfo?.address?.state;
    const country = selection.addressInfo?.address?.country;
    const zipcode = selection.addressInfo?.address?.postcode;
    
    console.log(`Selected: ${city}, ${state}, ${country} ${zipcode}`);
  });
}
```

## Migration Notes

### Deprecated APIs
- **selectedLocation** (Input): Deprecated in favor of `preSelectedLocations` for silent selection or `searchLocation`/`searchForLocation()` for interactive selection

### Event Behavior Changes
- **selectionChanged** event is now triggered by: map clicks, search results, external search inputs, and `searchForLocation()`/`searchLocation` property
- **selectionChanged** event is NOT triggered by `preSelectedLocations` changes (by design for silent initialization)

## 🤝 Contributing

1. Fork the [repository](https://github.com/maheshnvv/ngmahesh)
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## License

MIT
