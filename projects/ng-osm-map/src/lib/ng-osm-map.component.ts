import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { NgOsmMapDirective } from './directives/ng-osm-map.directive';
import { LocationObject, PinObject, HighlightArea, MapOptions, MapClickEvent, SearchResult, PinDragEvent, AutocompleteSuggestion, TileLayerType, SelectedLocation, PinDeleteEvent } from './models/map-interfaces';

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

  @Input() pins: PinObject[] = [];
  @Input() zoomInto?: LocationObject;
  @Input() highlightAreas: HighlightArea[] = [];
  @Input() mapOptions: MapOptions = {};
  @Input() mapId?: string; // Unique identifier for this map instance
  @Input() height: number | string = 400;
  @Input() width: number | string = '100%';

  @Output() mapClick = new EventEmitter<MapClickEvent>();
  @Output() locationSelected = new EventEmitter<MapClickEvent>();
  @Output() searchResult = new EventEmitter<SearchResult>();
  @Output() pinDragged = new EventEmitter<PinDragEvent>();
  @Output() autocompleteResults = new EventEmitter<AutocompleteSuggestion[]>();
  @Output() pinDeleted = new EventEmitter<PinDeleteEvent>();
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
}
