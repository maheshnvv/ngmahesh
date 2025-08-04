import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Using directive approach for testing - this is known to work
import { NgOsmMapDirective, PinObject, LocationObject, HighlightArea } from '../../../../projects/ng-osm-map/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOsmMapDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Main map data
  mapPins: PinObject[] = [
    {
      location: { latitude: 48.8566, longitude: 2.3522 },
      color: '#ff1744',
      title: 'Paris',
      content: '<h3>🇫🇷 Paris</h3><p>City of Light</p>',
      draggable: true
    },
    {
      location: { latitude: 51.5074, longitude: -0.1278 },
      color: '#3f51b5',
      title: 'London',
      content: '<h3>🇬🇧 London</h3><p>Royal Capital</p>',
      draggable: true
    },
    {
      location: { latitude: 52.5200, longitude: 13.4050 },
      color: '#ff9800',
      title: 'Berlin',
      content: '<h3>🇩🇪 Berlin</h3><p>Historic Capital</p>',
      draggable: true
    }
  ];

  lastClickedLocation?: LocationObject;

  mapOptions = {
    zoom: 5,
    enableClickSelect: true,
    search: {
      enabled: true,
      placeholder: 'Search European cities...',
      autoZoom: true,
      addPinOnResult: true,
      searchResultPin: {
        color: '#4caf50',
        title: 'Search Result'
      }
    },
    searchInput: {
      enableExternalBinding: true,
      inputElement: '#external-search-input',
      showSuggestionsDropdown: true
    }
  };

  onMapClick(event: any) {
    console.log('Map clicked:', event);
    this.lastClickedLocation = event;
  }

  onLocationSelected(event: any) {
    console.log('Location selected:', event);
    this.lastClickedLocation = event;
  }
}
