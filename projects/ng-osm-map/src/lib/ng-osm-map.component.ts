import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { NgOsmMapDirective } from './directives/ng-osm-map.directive';
import { LocationObject, PinObject, HighlightArea, MapOptions, MapClickEvent, SearchResult, PinDragEvent, AutocompleteSuggestion, TileLayerType, SelectedLocation, PinDeleteEvent } from './models/map-interfaces';

/**
 * NgOsmMapComponent - Angular component wrapper for OpenStreetMap integration
 *
 * This component provides a clean Angular interface for the NgOsmMapDirective.
 *
 * Key Features:
 * - Height/width property binding with automatic conversion to CSS styles
 * - All directive functionality exposed through component interface
 * - Comprehensive event handling and forwarding
 * - Public methods for programmatic control
 *
 * Programmatic Selection:
 * - Use preSelectedLocations for silent initial selection
 * - Use searchLocation property or searchForLocation() method for interactive selection with events
 */
@Component({
  selector: 'ng-osm-map',
  standalone: true,
  imports: [NgOsmMapDirective],
  template: `
    <div
      #mapContainer
      ngOsmMap
      [pins]="pins"
      [zoomInto]="zoomInto"
      [highlightAreas]="highlightAreas"
      [mapOptions]="mapOptions"
      [preSelectedLocations]="preSelectedLocations"
      [searchLocation]="searchLocation"
      [mapId]="mapId"
      (mapClick)="onMapClick($event)"
      (locationSelected)="onLocationSelected($event)"
      (searchResult)="onSearchResult($event)"
      (pinDragged)="onPinDragged($event)"
      (autocompleteResults)="onAutocompleteResults($event)"
      (pinDeleted)="onPinDeleted($event)"
      (selectionChanged)="onSelectionChanged($event)"
      [style.height]="mapHeight"
      [style.width]="mapWidth">
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    div {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class NgOsmMapComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(NgOsmMapDirective, { static: true }) mapDirective!: NgOsmMapDirective;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  /** Array of pins to display on the map */
  @Input() pins: PinObject[] = [];

  /** Location to center and zoom the map to */
  @Input() zoomInto?: LocationObject;

  /** Areas to highlight on the map with custom styling */
  @Input() highlightAreas: HighlightArea[] = [];

  /** Map configuration and behavior options */
  @Input() mapOptions: MapOptions = {};

  /** Unique identifier for connecting external search inputs to this map instance */
  @Input() mapId?: string;

  /**
   * Locations to pre-select without triggering selectionChanged events.
   * Use this for initial map state or when you need to set selections programmatically
   * without triggering event handlers. For programmatic selection that should trigger
   * events, use the searchForLocation() method or searchLocation property instead.
   */
  @Input() preSelectedLocations: LocationObject[] = [];

  /**
   * Location to search for and select programmatically. Setting this property will
   * trigger the selection process including geocoding, pin creation, and selectionChanged
   * event emission. This is the recommended approach for programmatic selection when
   * you want to trigger the same behavior as user interaction.
   */
  @Input() searchLocation?: LocationObject | null;

  /** Map height in pixels or CSS value */
  @Input() height: number | string = 400;

  /** Map width in pixels or CSS value */
  @Input() width: number | string = '100%';

  // Backward compatibility for single selectedLocation
  @Input() set selectedLocation(location: LocationObject | undefined) {
    if (location) {
      this.preSelectedLocations = [location];
    } else {
      this.preSelectedLocations = [];
    }
  }

  /** Fired when the map is clicked */
  @Output() mapClick = new EventEmitter<MapClickEvent>();

  /** Fired when a location is selected via click (deprecated - use selectionChanged instead) */
  @Output() locationSelected = new EventEmitter<MapClickEvent>();

  /** Fired when a search produces results */
  @Output() searchResult = new EventEmitter<SearchResult>();

  /** Fired when a pin is dragged to a new location */
  @Output() pinDragged = new EventEmitter<PinDragEvent>();

  /** Fired when autocomplete search returns suggestions */
  @Output() autocompleteResults = new EventEmitter<AutocompleteSuggestion[]>();

  /** Fired when a pin is deleted */
  @Output() pinDeleted = new EventEmitter<PinDeleteEvent>();

  /**
   * Fired when locations are selected or deselected on the map.
   * This includes selections from: map clicks, search results, external search inputs,
   * and programmatic selection via searchForLocation() method or searchLocation property.
   * Note: This event is NOT triggered by preSelectedLocations changes.
   */
  @Output() selectionChanged = new EventEmitter<SelectedLocation[]>();

  get mapHeight(): string {
    return typeof this.height === 'number' ? `${this.height}px` : this.height;
  }

  get mapWidth(): string {
    return typeof this.width === 'number' ? `${this.width}px` : this.width;
  }

  ngOnInit(): void {
    // Map initialization is handled by the directive
  }

  ngOnDestroy(): void {
    // Cleanup is handled by the directive
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Changes are handled by the directive
  }

  // Event handlers
  onMapClick(event: MapClickEvent): void {
    this.mapClick.emit(event);
  }

  onLocationSelected(event: MapClickEvent): void {
    this.locationSelected.emit(event);
  }

  onSearchResult(result: SearchResult): void {
    this.searchResult.emit(result);
  }

  onPinDragged(event: PinDragEvent): void {
    this.pinDragged.emit(event);
  }

  onAutocompleteResults(suggestions: AutocompleteSuggestion[]): void {
    this.autocompleteResults.emit(suggestions);
  }

  onPinDeleted(event: PinDeleteEvent): void {
    this.pinDeleted.emit(event);
  }

  onSelectionChanged(selections: SelectedLocation[]): void {
    this.selectionChanged.emit(selections);
  }

  /**
   * Get the Leaflet map instance
   */
  getMap() {
    return this.mapDirective?.getMap();
  }

  /**
   * Get the underlying NgOsmMapDirective instance
   * This can be used for direct access to directive methods like zoomToSelection
   */
  getDirective(): NgOsmMapDirective | undefined {
    return this.mapDirective;
  }

  /**
   * Fit map bounds to show all pins and areas
   */
  fitBounds(): void {
    this.mapDirective?.fitBounds();
  }

  /**
   * Add a new pin to the map
   */
  addPin(pin: PinObject): void {
    this.mapDirective?.addPin(pin);
  }

  /**
   * Remove a pin from the map
   */
  removePin(index: number): void {
    this.mapDirective?.removePin(index);
  }

  /**
   * Clear all pins from the map
   */
  clearPins(): void {
    this.mapDirective?.clearPins();
  }

  /**
   * Perform search programmatically
   */
  search(query: string): void {
    this.mapDirective?.search(query);
  }

  /**
   * Toggle click-to-select functionality
   */
  toggleClickSelect(enabled: boolean): void {
    this.mapDirective?.toggleClickSelect(enabled);
  }

  /**
   * Check if search is enabled
   */
  isSearchEnabled(): boolean {
    return this.mapDirective?.isSearchEnabled() || false;
  }

  /**
   * Check if click-select is enabled
   */
  isClickSelectEnabled(): boolean {
    return this.mapDirective?.isClickSelectEnabled() || false;
  }

  /**
   * Switch to a different tile layer
   */
  switchTileLayer(layerType: TileLayerType): void {
    this.mapDirective?.switchTileLayer(layerType);
  }

  /**
   * Get available tile layer types
   */
  getAvailableTileLayerTypes(): TileLayerType[] {
    return this.mapDirective?.getAvailableTileLayerTypes() || [];
  }

  /**
   * Get current tile layer type
   */
  getCurrentTileLayerType(): TileLayerType | undefined {
    return this.mapDirective?.getCurrentTileLayerType();
  }

  /**
   * Update a specific pin's location without recreating all markers
   */
  updatePinLocation(pinIndex: number, newLocation: LocationObject): void {
    this.mapDirective?.updatePinLocation(pinIndex, newLocation);
  }

  /**
   * Clear the coordinates cache to force re-geocoding of address-based locations
   */
  clearLocationCache(): void {
    this.mapDirective?.clearLocationCache();
  }

  /**
   * Get current selections
   */
  getSelectedLocations(): SelectedLocation[] {
    return this.mapDirective?.getSelectedLocations() || [];
  }

  /**
   * Clear all selections
   */
  clearSelections(): void {
    this.mapDirective?.clearSelections();
  }

  /**
   * Add a selection programmatically
   */
  addSelection(coordinates: { latitude: number; longitude: number }, addressInfo?: any): void {
    this.mapDirective?.addSelection(coordinates, addressInfo);
  }

  /**
   * Delete a pin by index
   */
  deletePin(pinIndex: number): void {
    if (this.mapDirective) {
      (this.mapDirective as any).deletePinByIndex(pinIndex, 'user-action');
    }
  }

  /**
   * Set pre-selected locations programmatically without triggering selection events
   */
  setPreSelectedLocations(locations: LocationObject[]): void {
    this.preSelectedLocations = locations;
  }

  /**
   * Zoom to the primary selection location
   * Provides a convenient way to access the directive's zoom function
   */
  zoomToSelection(): void {
    this.mapDirective?.zoomToSelection();
  }

  /**
   * Public method to programmatically search for and select a location.
   * This method provides the same behavior as user interaction - it will:
   * - Perform geocoding if needed to resolve the location
   * - Create pins for the selection (if configured)
   * - Emit selectionChanged events
   * - Handle single/multi-select logic based on map options
   * - Provide visual feedback
   *
   * Use this method instead of preSelectedLocations when you want to trigger
   * the full selection workflow programmatically.
   *
   * @param locationObject The location to search for and select
   */
  searchForLocation(locationObject: LocationObject): void {
    if (this.mapDirective) {
      this.mapDirective.searchForLocation(locationObject);
    }
  }
}
