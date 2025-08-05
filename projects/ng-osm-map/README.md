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
- 🌍 **Geocoding**: Built-in OpenStreetMap geocoding support
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

## 🤝 Contributing

1. Fork the [repository](https://github.com/maheshnvv/ngmahesh)
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## License

MIT
