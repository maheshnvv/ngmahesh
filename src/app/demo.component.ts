import { Component, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOsmMapComponent, PinObject, LocationObject, HighlightArea, MapClickEvent, SearchResult, PinDragEvent, AutocompleteSuggestion, TileLayerType, SelectedLocation, PinDeleteEvent, PinPopupContext } from '../../projects/ng-osm-map/src/public-api';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [NgOsmMapComponent, CommonModule, RouterModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent implements AfterViewInit {
  @ViewChild(NgOsmMapComponent) mapComponent!: NgOsmMapComponent;
  @ViewChild('customPopupTemplate', { static: true }) customPopupTemplate!: TemplateRef<PinPopupContext>;
  @ViewChild('deleteablePopupTemplate', { static: true }) deleteablePopupTemplate!: TemplateRef<PinPopupContext>;

  title = 'ngmahesh';
  currentTileLayer: TileLayerType = 'openstreetmap';

  // Available tile layer options
  tileLayerOptions: { type: TileLayerType; name: string; description: string }[] = [
    { type: 'openstreetmap', name: 'Street Map', description: 'Standard OpenStreetMap view' },
    { type: 'satellite', name: 'Satellite', description: 'Satellite imagery view' },
    { type: 'terrain', name: 'Terrain', description: 'Topographic terrain view' },
    { type: 'dark', name: 'Dark', description: 'Dark theme map' },
    { type: 'light', name: 'Light', description: 'Light theme map' },
    { type: 'watercolor', name: 'Watercolor', description: 'Artistic watercolor style' },
    { type: 'toner', name: 'Toner', description: 'High contrast black and white' }
  ];

  pins: PinObject[] = [
    {
      location: { latitude: 40.7128, longitude: -74.0060 },
      color: '#ff0000',
      title: 'New York City',
      content: '<h3>🗽 New York City</h3><p>The Big Apple - Most populous city in the US</p>',
      draggable: true
    },
    {
      location: {
        address: '1600 Amphitheatre Parkway',
        city: 'Mountain View',
        state: 'CA',
        country: 'USA'
      },
      color: '#00ff00',
      title: 'Google HQ',
      content: '<h3>🏢 Google Headquarters</h3><p>Home of the search engine</p>',
      draggable: true
    },
    {
      location: {
        city: 'Paris',
        country: 'France'
      },
      color: '#0000ff',
      title: 'Paris',
      content: '<h3>🗼 Paris</h3><p>City of Light</p>',
      draggable: false
    },
    {
      location: {
        latitude: 35.6762,
        longitude: 139.6503
      },
      color: '#ff00ff',
      title: 'Tokyo',
      content: '<h3>🏯 Tokyo</h3><p>Capital of Japan</p>',
      draggable: true
    }
  ];

  centerLocation: LocationObject = {
    latitude: 40.7128,
    longitude: -74.0060
  };

  highlightAreas: HighlightArea[] = [
    {
      boundary: [
        { latitude: 40.7589, longitude: -73.9851 },
        { latitude: 40.7505, longitude: -73.9934 },
        { latitude: 40.7434, longitude: -73.9857 },
        { latitude: 40.7518, longitude: -73.9774 }
      ],
      borderColor: '#ff0000',
      fillColor: '#ff0000',
      fillOpacity: 0.2,
      borderWidth: 3,
      title: 'Times Square Area'
    }
  ];

  mapOptions = {
    zoom: 2,
    height: 400,
    zoomControl: true,
    scrollWheelZoom: true,
    defaultPinsDraggable: false, // Pins with draggable: true will override this
    tileLayerType: 'openstreetmap' as TileLayerType,
    enableLayerControl: true, // Enable layer switching control
    search: {
      enabled: true,
      placeholder: 'Search for locations...',
      autoZoom: true,
      searchZoom: 15,
      addPinOnResult: true,
      searchResultPin: {
        color: '#ff6b6b',
        title: 'Search Result',
        draggable: true  // Make search result pins draggable
      },
      autocomplete: {
        enabled: true,
        debounceMs: 300,
        maxResults: 5,
        minQueryLength: 2
      }
    },
    enableClickSelect: true,
    selection: {
      multiSelect: false, // Enable multi-selection
      maxSelections: 5, // Maximum 5 selections
      createPinsForSelections: true, // Create pins for selected locations
      selectionPin: {
        color: '#9c27b0',
        title: 'Selected Location',
        draggable: true
      },
      showDeleteButton: true, // Show delete button in tooltips
      allowPinDeletion: true // Allow pin deletion from tooltips
    },
    searchInput: {
      enableExternalBinding: true,
      inputElement: '#external-search-input',
      showSuggestionsDropdown: true,
      autoFocus: false
    }
  };

  // Event handlers for new features
  lastClickedLocation: MapClickEvent | null = null;
  lastSearchResult: SearchResult | null = null;
  clickHistory: MapClickEvent[] = [];
  dragHistory: PinDragEvent[] = [];
  autocompleteHistory: AutocompleteSuggestion[] = [];
  selectedLocations: SelectedLocation[] = [];
  deleteHistory: PinDeleteEvent[] = [];

  // Track special pins
  searchResultPinIndex: number = -1; // Index of the current search result pin
  selectedLocationPinIndex: number = -1; // Index of pin created from location selection

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

    // Reset special pin indices if they were the last ones
    if (this.searchResultPinIndex === this.pins.length - 1) {
      this.searchResultPinIndex = -1;
    }
    if (this.selectedLocationPinIndex === this.pins.length - 1) {
      this.selectedLocationPinIndex = -1;
    }

    this.pins = [...this.pins, randomPin];
  }

  clearPins() {
    this.pins = [];
    // Reset pin indices when clearing
    this.searchResultPinIndex = -1;
    this.selectedLocationPinIndex = -1;
  }

  zoomToNewYork() {
    this.centerLocation = { latitude: 40.7128, longitude: -74.0060 };
    this.mapOptions = { ...this.mapOptions, zoom: 12 };
  }

  zoomToWorld() {
    this.centerLocation = { latitude: 0, longitude: 0 };
    this.mapOptions = { ...this.mapOptions, zoom: 2 };
  }

  // New event handlers
  onMapClick(event: MapClickEvent) {
    console.log('Map clicked:', event);
    this.lastClickedLocation = event;
  }

  onLocationSelected(event: MapClickEvent) {
    console.log('Location selected with address info:', event);
    this.lastClickedLocation = event;
    this.clickHistory = [event, ...this.clickHistory.slice(0, 4)]; // Keep last 5 clicks

    // Note: With the new selection system, pins are automatically created
    // by the selection configuration if createPinsForSelections is true
  }

  onSearchResult(result: SearchResult) {
    console.log('Search result:', result);
    this.lastSearchResult = result;

    // Track the search result pin index (it will be the last pin added)
    if (this.mapOptions.search?.addPinOnResult) {
      // Reset selected location pin index if it was the last one
      if (this.selectedLocationPinIndex === this.pins.length - 1) {
        this.selectedLocationPinIndex = -1;
      }
      this.searchResultPinIndex = this.pins.length; // Will be the next pin added
    }
  }
  onPinDragged(event: PinDragEvent) {
    console.log('Pin dragged:', event);
    this.dragHistory = [event, ...this.dragHistory.slice(0, 4)]; // Keep last 5 drags

    // Update the pin coordinates without triggering a full re-render
    if (event.pinIndex >= 0 && event.pinIndex < this.pins.length) {
      // Update the pin's location directly (this won't trigger change detection)
      this.pins[event.pinIndex].location = {
        latitude: event.newCoordinates.latitude,
        longitude: event.newCoordinates.longitude
      };

      // Legacy tracking for backwards compatibility
      // Check if this is a search result pin and update the search result info
      if (event.pinIndex === this.searchResultPinIndex && this.lastSearchResult) {
        console.log('Updating search result info after pin drag');
        this.lastSearchResult.coordinates = {
          latitude: event.newCoordinates.latitude,
          longitude: event.newCoordinates.longitude
        };

        // Update display name with new address info or coordinates
        if (event.newAddressInfo?.display_name) {
          this.lastSearchResult.displayName = event.newAddressInfo.display_name;
          this.lastSearchResult.address = event.newAddressInfo.address;
        } else {
          this.lastSearchResult.displayName = `${event.newCoordinates.latitude.toFixed(6)}, ${event.newCoordinates.longitude.toFixed(6)}`;
        }
      }

      // Legacy: Check if this is a selected location pin and update the selected location info
      if (event.pinIndex === this.selectedLocationPinIndex && this.lastClickedLocation) {
        console.log('Updating selected location info after pin drag');
        this.lastClickedLocation.coordinates = {
          latitude: event.newCoordinates.latitude,
          longitude: event.newCoordinates.longitude
        };

        // Update address info
        if (event.newAddressInfo) {
          this.lastClickedLocation.addressInfo = event.newAddressInfo;
        } else {
          // Clear address info if not available
          this.lastClickedLocation.addressInfo = undefined;
        }
      }
    }
  }

  onAutocompleteResults(suggestions: AutocompleteSuggestion[]) {
    console.log('Autocomplete suggestions:', suggestions);
    this.autocompleteHistory = suggestions;
  }

  onPinDeleted(event: PinDeleteEvent) {
    console.log('Pin deleted:', event);
    this.deleteHistory = [event, ...this.deleteHistory.slice(0, 4)]; // Keep last 5 deletions

    // Update pin indices after deletion
    if (this.searchResultPinIndex > event.pinIndex) {
      this.searchResultPinIndex--;
    } else if (this.searchResultPinIndex === event.pinIndex) {
      this.searchResultPinIndex = -1;
    }

    if (this.selectedLocationPinIndex > event.pinIndex) {
      this.selectedLocationPinIndex--;
    } else if (this.selectedLocationPinIndex === event.pinIndex) {
      this.selectedLocationPinIndex = -1;
    }
  }

  onSelectionChanged(selections: SelectedLocation[]) {
    console.log('Selections changed:', selections);
    this.selectedLocations = selections;
  }

  getSelectedLocationInfo(): string {
    if (!this.lastClickedLocation) return 'No location selected';

    const coords = this.lastClickedLocation.coordinates;
    const address = this.lastClickedLocation.addressInfo?.display_name;

    return `Lat: ${coords.latitude.toFixed(6)}, Lng: ${coords.longitude.toFixed(6)}${address ? '\nAddress: ' + address : ''}`;
  }

  getSearchResultInfo(): string {
    if (!this.lastSearchResult) return 'No search performed';

    const coords = this.lastSearchResult.coordinates;
    return `${this.lastSearchResult.displayName}\nLat: ${coords.latitude.toFixed(6)}, Lng: ${coords.longitude.toFixed(6)}`;
  }

  getDragHistoryInfo(): string {
    if (this.dragHistory.length === 0) return 'No pins dragged yet';

    const lastDrag = this.dragHistory[0];
    const coords = lastDrag.newCoordinates;
    const pinTitle = lastDrag.originalPin.title || 'Unknown Pin';

    return `${pinTitle} moved to:\nLat: ${coords.latitude.toFixed(6)}, Lng: ${coords.longitude.toFixed(6)}${lastDrag.newAddressInfo?.display_name ? '\nAddress: ' + lastDrag.newAddressInfo.display_name : ''}`;
  }

  getAutocompleteInfo(): string {
    if (this.autocompleteHistory.length === 0) return 'No autocomplete suggestions yet';

    return `${this.autocompleteHistory.length} suggestions:\n${this.autocompleteHistory.slice(0, 3).map(s => s.displayText).join('\n')}`;
  }

  getTruncatedAddress(addressInfo: any): string {
    return addressInfo?.display_name ? addressInfo.display_name.substring(0, 50) + '...' : '';
  }

  // Tile layer management
  switchTileLayer(layerType: TileLayerType): void {
    this.currentTileLayer = layerType;
    this.mapComponent?.switchTileLayer(layerType);
  }

  getCurrentTileLayerName(): string {
    const option = this.tileLayerOptions.find(opt => opt.type === this.currentTileLayer);
    return option?.name || 'Unknown';
  }

  // Test programmatic pin update
  movePinToLondon(): void {
    if (this.pins.length > 0) {
      // Move the first pin to London
      const londonLocation: LocationObject = {
        latitude: 51.5074,
        longitude: -0.1278
      };

      this.mapComponent?.updatePinLocation(0, londonLocation);

      // Update our local pin data to match
      this.pins[0].location = londonLocation;
      this.pins[0].title = 'Moved to London';
      this.pins[0].content = '<h3>🇬🇧 London</h3><p>Pin moved programmatically!</p>';
    }
  }

  // Update external search input when search result pin is dragged
  updateExternalSearchInput(value: string): void {
    try {
      const externalSearchInput = document.querySelector('#external-search-input') as HTMLInputElement;
      if (externalSearchInput) {
        externalSearchInput.value = value;

        // Dispatch input event to notify any listeners
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        externalSearchInput.dispatchEvent(inputEvent);

        console.log('External search input updated with value:', value);
      } else {
        console.warn('External search input element not found');
      }
    } catch (error) {
      console.error('Error updating external search input:', error);
    }
  }

  // Selection management methods
  clearSelections(): void {
    this.mapComponent?.clearSelections();
  }

  toggleMultiSelect(): void {
    const currentMultiSelect = this.mapOptions.selection?.multiSelect || false;
    this.mapOptions = {
      ...this.mapOptions,
      selection: {
        ...this.mapOptions.selection,
        multiSelect: !currentMultiSelect
      }
    };
  }

  isMultiSelectEnabled(): boolean {
    return this.mapOptions.selection?.multiSelect || false;
  }

  getSelectionModeDescription(): string {
    if (this.isMultiSelectEnabled()) {
      return 'Multi-Select Mode: Map clicks allow multiple selections. Search results always create/replace a single search pin. The search pin takes priority for updating the search input.';
    } else {
      return 'Single-Select Mode: Both map clicks and search results use single selection (synced). Only one selection pin exists at a time.';
    }
  }

  getSelectedLocationsInfo(): string {
    if (this.selectedLocations.length === 0) return 'No locations selected';

    const searchSelections = this.selectedLocations.filter(sel => sel.id.startsWith('search-result_'));
    const mapSelections = this.selectedLocations.filter(sel => sel.id.startsWith('map-click_'));

    let info = `${this.selectedLocations.length} location(s) selected:\n`;

    if (searchSelections.length > 0) {
      info += `\n🔍 Search Selections (${searchSelections.length}):\n`;
      searchSelections.forEach((sel, i) => {
        info += `${i + 1}. ${sel.addressInfo?.display_name || `${sel.coordinates.latitude.toFixed(4)}, ${sel.coordinates.longitude.toFixed(4)}`}\n`;
      });
    }

    if (mapSelections.length > 0) {
      info += `\n📍 Map Click Selections (${mapSelections.length}):\n`;
      mapSelections.forEach((sel, i) => {
        info += `${i + 1}. ${sel.addressInfo?.display_name || `${sel.coordinates.latitude.toFixed(4)}, ${sel.coordinates.longitude.toFixed(4)}`}\n`;
      });
    }

    return info.trim();
  }

  getDeleteHistoryInfo(): string {
    if (this.deleteHistory.length === 0) return 'No pins deleted yet';

    const lastDelete = this.deleteHistory[0];
    return `Last deleted: ${lastDelete.deletedPin.title || 'Unknown Pin'}\nReason: ${lastDelete.reason}`;
  }

  // Test method for template popups
  testTemplatePopups(): void {
    console.log('Testing template popups...');
    console.log('Custom popup template:', this.customPopupTemplate);
    console.log('Deleteable popup template:', this.deleteablePopupTemplate);
    console.log('Current pins with templates:', this.pins.filter(p => p.popupTemplate));
  }

  ngAfterViewInit(): void {
    // Add template-based pins after view initialization
    this.addTemplatePins();
  }

  private addTemplatePins(): void {
    // Add pins with custom template popups
    const templatePins: PinObject[] = [
      {
        location: { latitude: 51.5074, longitude: -0.1278 },
        color: '#e91e63',
        title: 'London - Custom Template',
        popupTemplate: this.customPopupTemplate,
        draggable: true,
        data: {
          cityInfo: {
            population: '9 million',
            established: '43 AD',
            landmarks: ['Big Ben', 'London Eye', 'Tower Bridge']
          }
        }
      },
      {
        location: { latitude: 52.5200, longitude: 13.4050 },
        color: '#9c27b0',
        title: 'Berlin - Deleteable Template',
        popupTemplate: this.deleteablePopupTemplate,
        draggable: true,
        data: {
          cityInfo: {
            population: '3.7 million',
            established: '13th century',
            landmarks: ['Brandenburg Gate', 'Berlin Wall', 'Museum Island']
          }
        }
      }
    ];

    // Add template pins to existing pins
    this.pins = [...this.pins, ...templatePins];
  }

  /**
   * Update a specific pin's location without recreating all markers
   */
  updatePinLocation(pinIndex: number, newLocation: LocationObject): void {
    this.mapComponent?.updatePinLocation(pinIndex, newLocation);
  }

  /**
   * Clear the coordinates cache to force re-geocoding of address-based locations
   */
  clearLocationCache(): void {
    this.mapComponent?.clearLocationCache();
  }

  // Clear the cache to test geocoding performance
  clearCache(): void {
    this.mapComponent?.clearLocationCache();
    console.log('Location cache cleared');
  }

  // Add a single pin to test efficient updating
  addSinglePin(): void {
    const cities = [
      { name: 'Rome', location: { city: 'Rome', country: 'Italy' }, color: '#ff6b35' },
      { name: 'Barcelona', location: { city: 'Barcelona', country: 'Spain' }, color: '#f7931e' },
      { name: 'Amsterdam', location: { city: 'Amsterdam', country: 'Netherlands' }, color: '#6a994e' },
      { name: 'Prague', location: { city: 'Prague', country: 'Czech Republic' }, color: '#bc6c25' },
      { name: 'Vienna', location: { city: 'Vienna', country: 'Austria' }, color: '#8b5cf6' }
    ];

    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const newPin: PinObject = {
      location: randomCity.location,
      color: randomCity.color,
      title: randomCity.name,
      content: `<h3>📍 ${randomCity.name}</h3><p>Added via efficient update!</p>`,
      draggable: true
    };

    // This should trigger efficient updating (only add one marker)
    this.pins = [...this.pins, newPin];
    console.log(`Added ${randomCity.name} pin - should only create 1 new marker`);
  }
}
