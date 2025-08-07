import { Component, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOsmMapComponent, PinObject, LocationObject, HighlightArea, MapClickEvent, SearchResult, PinDragEvent, AutocompleteSuggestion,
   AutocompleteSearchContext, TileLayerType, SelectedLocation, PinDeleteEvent, PinPopupContext } from '../../../../projects/ng-osm-map/src/public-api';
import { NgOsmSearchInputDirective } from '../../../../projects/ng-osm-map/src/public-api';

@Component({
  selector: 'app-ng-osm-map-demo',
  standalone: true,
  imports: [NgOsmMapComponent, NgOsmSearchInputDirective, CommonModule, RouterModule],
  templateUrl: './ng-osm-map-demo.component.html',
  styleUrl: './ng-osm-map-demo.component.scss'
})
export class NgOsmMapDemoComponent implements AfterViewInit {
  @ViewChild(NgOsmMapComponent) mapComponent!: NgOsmMapComponent;
  @ViewChild('customPopupTemplate', { static: true }) customPopupTemplate!: TemplateRef<PinPopupContext>;
  @ViewChild('deleteablePopupTemplate', { static: true }) deleteablePopupTemplate!: TemplateRef<PinPopupContext>;
  @ViewChild('customAutocompleteTemplate', { static: true }) customAutocompleteTemplate!: TemplateRef<AutocompleteSearchContext>;

  title = 'ngmahesh';
  currentTileLayer: TileLayerType = 'openstreetmap';

  // Map ID for connecting search inputs
  mapId = 'main-demo-map';

  // Event log for search input demo
  searchEventLog: Array<{type: string, message: string, timestamp: Date}> = [];

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
      allowPinDeletion: true, // Allow pin deletion from tooltips
      autoZoomToSelection: false, // Auto-zoom to selected location
      selectionZoom: 15, // Zoom level for selection
      animatedZoom: true // Use animated zoom
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

  // Pre-selected locations for demonstrating pre-selection functionality
  preSelectedLocations: LocationObject[] = [];

  // Available demo locations for pre-selection
  demoLocations: { name: string; location: LocationObject }[] = [
    { name: 'New York City', location: { latitude: 40.7128, longitude: -74.0060 } },
    { name: 'London', location: { latitude: 51.5074, longitude: -0.1278 } },
    { name: 'Tokyo', location: { latitude: 35.6762, longitude: 139.6503 } },
    { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
    { name: 'Sydney', location: { latitude: -33.8688, longitude: 151.2093 } }
  ];

  // Boundary control options
  boundaryMode: 'none' | 'world' | 'custom' = 'none';
  noWrapEnabled: boolean = false;
  customBounds = {
    northEast: { lat: 60, lng: 20 },
    southWest: { lat: 35, lng: -20 }
  };

  // Available boundary presets
  boundaryPresets = [
    { name: 'Europe', bounds: { northEast: { lat: 70, lng: 40 }, southWest: { lat: 35, lng: -20 } } },
    { name: 'North America', bounds: { northEast: { lat: 72, lng: -50 }, southWest: { lat: 15, lng: -170 } } },
    { name: 'Asia Pacific', bounds: { northEast: { lat: 60, lng: 180 }, southWest: { lat: -50, lng: 60 } } }
  ];

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

  // Pre-selection demo methods
  setPreSelectedLocation(locationName: string) {
    const demoLocation = this.demoLocations.find(loc => loc.name === locationName);
    if (demoLocation) {
      this.preSelectedLocations = [demoLocation.location];
    }
  }

  setMultiplePreSelectedLocations() {
    // Select first 3 locations for multi-select demo
    this.preSelectedLocations = this.demoLocations.slice(0, 3).map(loc => loc.location);
  }

  clearPreSelectedLocations() {
    this.preSelectedLocations = [];
  }

  getPreSelectedLocationNames(): string {
    return this.preSelectedLocations.map((loc, i) => {
      const demoLocation = this.demoLocations.find(demo =>
        demo.location.latitude === loc.latitude && demo.location.longitude === loc.longitude
      );
      return demoLocation?.name || `Location ${i+1}`;
    }).join(', ');
  }

  // Readonly mode methods
  toggleReadonlyMode(): void {
    const currentReadonly = (this.mapOptions as any).readonly || false;
    this.mapOptions = {
      ...this.mapOptions,
      readonly: !currentReadonly
    } as any;
  }

  isReadonlyMode(): boolean {
    return (this.mapOptions as any).readonly || false;
  }

  getReadonlyModeDescription(): string {
    if (this.isReadonlyMode()) {
      return 'Readonly Mode: All map interactions disabled (zoom, pan, click, drag, search)';
    } else {
      return 'Interactive Mode: Full map interactions enabled';
    }
  }

  // Event handlers
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

    // Auto-zoom is now handled by the directive itself based on mapOptions.selection.autoZoomToSelection
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

  // Auto-zoom to selection controls
  toggleAutoZoomToSelection(): void {
    const currentAutoZoom = this.mapOptions.selection?.autoZoomToSelection || false;
    this.mapOptions = {
      ...this.mapOptions,
      selection: {
        ...this.mapOptions.selection,
        autoZoomToSelection: !currentAutoZoom
      }
    };
  }

  isAutoZoomToSelectionEnabled(): boolean {
    return this.mapOptions.selection?.autoZoomToSelection || false;
  }

  updateSelectionZoomLevel(level: number): void {
    this.mapOptions = {
      ...this.mapOptions,
      selection: {
        ...this.mapOptions.selection,
        selectionZoom: level
      }
    };
  }

  getSelectionZoomLevel(): number {
    return this.mapOptions.selection?.selectionZoom || 15;
  }

  toggleAnimatedZoom(): void {
    const currentAnimated = this.mapOptions.selection?.animatedZoom !== false; // Default to true
    this.mapOptions = {
      ...this.mapOptions,
      selection: {
        ...this.mapOptions.selection,
        animatedZoom: !currentAnimated
      }
    };
  }

  isAnimatedZoomEnabled(): boolean {
    return this.mapOptions.selection?.animatedZoom !== false; // Default to true
  }

  getAutoZoomDescription(): string {
    if (this.isAutoZoomToSelectionEnabled()) {
      return `Auto-zoom enabled: Zoom to level ${this.getSelectionZoomLevel()} with ${this.isAnimatedZoomEnabled() ? 'animated' : 'instant'} transition`;
    } else {
      return 'Auto-zoom disabled: Manual zoom control only';
    }
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

  // Search Input Demo Event Handlers
  onSearchInputSearch(query: string): void {
    this.addToSearchEventLog('Search', `Searching for: "${query}"`);
  }

  onSearchInputSuggestionSelected(suggestion: AutocompleteSuggestion): void {
    this.addToSearchEventLog('Suggestion Selected', `Selected: ${suggestion.displayText}`);
  }

  onSearchInputAutocompleteResults(suggestions: AutocompleteSuggestion[]): void {
    this.addToSearchEventLog('Autocomplete', `Got ${suggestions.length} suggestions`);
  }

  private addToSearchEventLog(type: string, message: string): void {
    this.searchEventLog.unshift({
      type,
      message,
      timestamp: new Date()
    });

    // Keep only last 10 events
    if (this.searchEventLog.length > 10) {
      this.searchEventLog = this.searchEventLog.slice(0, 10);
    }
  }

  // Boundary Controls
  setBoundaryMode(mode: 'none' | 'world' | 'custom'): void {
    this.boundaryMode = mode;
    this.updateMapBoundaries();
  }

  toggleNoWrap(): void {
    this.noWrapEnabled = !this.noWrapEnabled;
    this.updateMapBoundaries();
  }

  setBoundaryPreset(preset: { name: string; bounds: { northEast: { lat: number; lng: number }; southWest: { lat: number; lng: number } } }): void {
    this.customBounds = preset.bounds;
    this.boundaryMode = 'custom';
    this.updateMapBoundaries();
  }

  updateCustomBounds(): void {
    if (this.boundaryMode === 'custom') {
      this.updateMapBoundaries();
    }
  }

  updateCustomBoundValue(property: string, value: string): void {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const parts = property.split('.');
      if (parts.length === 3) {
        (this.customBounds as any)[parts[0]][parts[1]] = numValue;
        this.updateCustomBounds();
      }
    }
  }

  onBoundInputChange(event: Event, property: string): void {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.updateCustomBoundValue(property, target.value);
    }
  }

  private updateMapBoundaries(): void {
    // Update map options with boundary settings
    (this.mapOptions as any).enableWorldBounds = this.boundaryMode === 'world';
    (this.mapOptions as any).noWrap = this.noWrapEnabled;

    if (this.boundaryMode === 'custom') {
      (this.mapOptions as any).mapBounds = {
        northEast: [this.customBounds.northEast.lat, this.customBounds.northEast.lng],
        southWest: [this.customBounds.southWest.lat, this.customBounds.southWest.lng]
      };
    } else {
      delete (this.mapOptions as any).mapBounds;
    }

    // Force map options update (creates a new object reference)
    this.mapOptions = { ...this.mapOptions };
  }

  getBoundaryDescription(): string {
    switch (this.boundaryMode) {
      case 'world':
        return 'World boundaries enabled - prevents panning outside world bounds (-85° to 85° latitude)';
      case 'custom':
        return `Custom boundaries: ${this.customBounds.southWest.lat}°,${this.customBounds.southWest.lng}° to ${this.customBounds.northEast.lat}°,${this.customBounds.northEast.lng}°`;
      default:
        return 'No boundary restrictions - unlimited panning and scrolling';
    }
  }

  getNoWrapDescription(): string {
    return this.noWrapEnabled ?
      'No world wrapping - prevents multiple copies of the world map' :
      'World wrapping enabled - shows multiple copies of the world horizontally';
  }

  // Getters for template binding
  get autoZoomToSelection(): boolean {
    return this.isAutoZoomToSelectionEnabled();
  }

  get autoZoomLevel(): number {
    return this.getSelectionZoomLevel();
  }

  onZoomLevelChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const zoomLevel = parseInt(target.value, 10);
    this.updateSelectionZoomLevel(zoomLevel);
  }

  /**
   * Zoom to the first selected location manually
   * Calls the component's zoomToSelection method
   */
  manualZoomToFirstSelection(): void {
    if (this.selectedLocations.length === 0) return;

    if (this.mapComponent) {
      // Call the component's zoomToSelection method
      this.mapComponent.zoomToSelection();
    }
  }

  /**
   * Get a description of the current selection mode
   */
  getSelectionModeDescription(): string {
    const multiSelect = this.isMultiSelectEnabled();
    const maxSelections = this.mapOptions.selection?.maxSelections || 0;

    if (multiSelect) {
      if (maxSelections > 0) {
        return `Multi-selection enabled (max ${maxSelections})`;
      } else {
        return 'Multi-selection enabled (unlimited)';
      }
    } else {
      return 'Single selection mode';
    }
  }

  /**
   * Get information about all selected locations
   */
  getSelectedLocationsInfo(): string {
    if (this.selectedLocations.length === 0) {
      return 'No locations selected';
    }

    return this.selectedLocations.map((loc, index) => {
      const coords = `${loc.coordinates.latitude.toFixed(4)}, ${loc.coordinates.longitude.toFixed(4)}`;
      const address = loc.addressInfo?.display_name || 'No address available';
      return `${index + 1}. ${coords}\n   ${address}`;
    }).join('\n');
  }

  /**
   * Get information about deleted pins
   */
  getDeleteHistoryInfo(): string {
    if (this.deleteHistory.length === 0) {
      return 'No deletions recorded';
    }

    return this.deleteHistory.slice(-5).map((event, index) => {
      const location = event.deletedPin.location;
      const coords = location.latitude && location.longitude
        ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
        : location.address || 'Unknown location';
      return `${index + 1}. ${event.deletedPin.title || 'Untitled'} (${coords}) - ${event.reason}`;
    }).join('\n');
  }
}
