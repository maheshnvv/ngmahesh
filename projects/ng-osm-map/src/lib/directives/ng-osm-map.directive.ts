import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
  NgZone,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  Optional,
  Injector
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as L from 'leaflet';
import { LocationObject, PinObject, HighlightArea, MapOptions, MapClickEvent, SearchResult, PinDragEvent, AutocompleteSuggestion, TileLayerConfig, TileLayerType, SelectedLocation, PinDeleteEvent, PinPopupContext } from '../models/map-interfaces';
import { GeocodingService } from '../services/geocoding.service';
import { AutocompleteService } from '../services/autocomplete.service';
import { TileLayerService } from '../services/tile-layer.service';

@Directive({
  selector: '[ngOsmMap]',
  standalone: true
})
export class NgOsmMapDirective implements OnInit, OnDestroy, OnChanges {

  @Input() pins: PinObject[] = [];
  @Input() zoomInto?: LocationObject;
  @Input() highlightAreas: HighlightArea[] = [];
  @Input() mapOptions: MapOptions = {};
  @Input() mapId?: string; // Unique identifier for this map instance;

  @Output() mapClick = new EventEmitter<MapClickEvent>();
  @Output() locationSelected = new EventEmitter<MapClickEvent>();
  @Output() searchResult = new EventEmitter<SearchResult>();
  @Output() pinDragged = new EventEmitter<PinDragEvent>();
  @Output() autocompleteResults = new EventEmitter<AutocompleteSuggestion[]>();
  @Output() pinDeleted = new EventEmitter<PinDeleteEvent>();
  @Output() selectionChanged = new EventEmitter<SelectedLocation[]>();

  private map?: L.Map;
  private markers: L.Marker[] = [];
  private areas: L.Polygon[] = [];
  private searchControl?: L.Control;
  private layerControl?: L.Control.Layers;
  private currentTileLayer?: L.TileLayer;
  private tileLayers: { [key: string]: L.TileLayer } = {};
  private clickSelectEnabled = false;
  private autocompleteDropdown?: HTMLElement;
  private externalSearchInput?: HTMLInputElement;
  private selectedLocations: SelectedLocation[] = [];
  private selectionCounter = 0;
  private embeddedViews: Map<number, EmbeddedViewRef<PinPopupContext>> = new Map();
  private coordinatesCache: Map<string, { lat: number; lng: number }> = new Map();
  private defaultOptions: MapOptions = {
    zoom: 13,
    minZoom: 1,
    maxZoom: 18,
    zoomControl: true,
    height: 400,
    width: '100%',
    scrollWheelZoom: true,
    doubleClickZoom: true,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  };

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private geocodingService: GeocodingService,
    private autocompleteService: AutocompleteService,
    private tileLayerService: TileLayerService,
    private ngZone: NgZone,
     private injector: Injector
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  ngOnDestroy(): void {
    // Clean up embedded views
    this.embeddedViews.forEach(view => view.destroy());
    this.embeddedViews.clear();

    // Clear coordinates cache
    this.coordinatesCache.clear();

    if (this.map) {
      this.map.remove();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    if (changes['pins']) {
      const currentPins = changes['pins'].currentValue || [];
      const previousPins = changes['pins'].previousValue || [];

      // Always perform efficient pin updates
      this.updatePinsEfficiently(previousPins, currentPins);
    }

    if (changes['highlightAreas']) {
      this.updateHighlightAreas();
    }

    if (changes['zoomInto']) {
      this.handleZoomInto();
    }
  }

  private initializeMap(): void {
    this.ngZone.runOutsideAngular(() => {
      const options = { ...this.defaultOptions, ...this.mapOptions };

      // Set element dimensions
      const element = this.elementRef.nativeElement;
      element.style.height = typeof options.height === 'number' ? `${options.height}px` : options.height!;
      element.style.width = typeof options.width === 'number' ? `${options.width}px` : options.width!;

      // Initialize map
      this.map = L.map(element, {
        zoom: options.zoom!,
        minZoom: options.minZoom,
        maxZoom: options.maxZoom,
        zoomControl: options.zoomControl,
        scrollWheelZoom: options.scrollWheelZoom,
        doubleClickZoom: options.doubleClickZoom
      });

      // Add tile layer
      this.setupTileLayers(options);

      // Set initial view
      this.setInitialView();

      // Add layer control if enabled
      if (options.enableLayerControl) {
        this.addLayerControl();
      }

      // Add search control if enabled
      if (options.search?.enabled) {
        this.addSearchControl();
      }

      // Enable click-to-select if configured
      if (options.enableClickSelect) {
        this.enableClickSelect();
      }

      // Setup external search input if configured
      if (options.searchInput?.enableExternalBinding) {
        this.setupExternalSearchInput();
      }

      // Setup pin deletion handler for popup buttons
      this.setupPinDeletionHandler();

      // Add pins and areas
      this.updatePins();
      this.updateHighlightAreas();
    });
  }

  private setInitialView(): void {
    if (this.zoomInto) {
      this.handleZoomInto();
    } else if (this.pins.length > 0) {
      // Center on first pin
      this.geocodingService.resolveLocation(this.pins[0].location).subscribe(coords => {
        if (coords && this.map) {
          this.map.setView([coords.lat, coords.lng], this.mapOptions.zoom || 13);
        }
      });
    } else {
      // Default view (center of world)
      this.map?.setView([0, 0], 2);
    }
  }

  private handleZoomInto(): void {
    if (!this.zoomInto || !this.map) return;

    this.geocodingService.resolveLocation(this.zoomInto).subscribe(coords => {
      if (coords && this.map) {
        this.map.setView([coords.lat, coords.lng], this.mapOptions.zoom || 13);
      }
    });
  }

  private updatePins(): void {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach(marker => this.map!.removeLayer(marker));
    this.markers = [];

    // Clean up any existing embedded views
    this.embeddedViews.forEach(view => view.destroy());
    this.embeddedViews.clear();

    if (!this.pins || this.pins.length === 0) return;

    // Resolve all pin locations
    const locationObservables = this.pins.map(pin =>
      this.resolveLocationWithCache(pin.location)
    );

    forkJoin(locationObservables).subscribe(coordinates => {
      coordinates.forEach((coords, index) => {
        if (coords && this.map) {
          const pin = this.pins[index];
          const marker = this.createMarker(coords, pin, index);
          marker.addTo(this.map);
          this.markers.push(marker);
        }
      });
    });
  }

  private updatePinsEfficiently(previousPins: PinObject[], currentPins: PinObject[]): void {
    if (!this.map) return;

    // If this is the first time, use the regular update method
    if (!previousPins || previousPins.length === 0) {
      this.updatePins();
      return;
    }

    // Find pins that were removed
    const removedIndices: number[] = [];
    for (let i = previousPins.length - 1; i >= currentPins.length; i--) {
      removedIndices.push(i);
    }

    // Remove markers for removed pins
    removedIndices.forEach(index => {
      if (this.markers[index]) {
        this.map!.removeLayer(this.markers[index]);
        // Clean up embedded view if exists
        const embeddedView = this.embeddedViews.get(index);
        if (embeddedView) {
          embeddedView.destroy();
          this.embeddedViews.delete(index);
        }
      }
    });

    // Remove markers from the end
    this.markers = this.markers.slice(0, currentPins.length);

    // Update existing pins and add new ones
    const locationObservables: any[] = [];
    const indicesToUpdate: number[] = [];

    currentPins.forEach((pin, index) => {
      const previousPin = previousPins[index];

      // Check if this is a new pin or if the location changed
      if (!previousPin || this.hasLocationChanged(previousPin.location, pin.location)) {
        locationObservables.push(this.resolveLocationWithCache(pin.location));
        indicesToUpdate.push(index);
      } else if (previousPin && this.hasPinPropertiesChanged(previousPin, pin)) {
        // Pin exists but properties changed (not location)
        this.updateMarkerProperties(index, pin);
      }
    });

    // Resolve only the locations that need updating
    if (locationObservables.length > 0) {
      forkJoin(locationObservables).subscribe(coordinates => {
        coordinates.forEach((coords, coordIndex) => {
          if (coords && this.map) {
            const pinIndex = indicesToUpdate[coordIndex];
            const pin = currentPins[pinIndex];

            // Remove old marker if it exists
            if (this.markers[pinIndex]) {
              this.map!.removeLayer(this.markers[pinIndex]);
              // Clean up embedded view
              const embeddedView = this.embeddedViews.get(pinIndex);
              if (embeddedView) {
                embeddedView.destroy();
                this.embeddedViews.delete(pinIndex);
              }
            }

            // Create new marker
            const marker = this.createMarker(coords, pin, pinIndex);
            marker.addTo(this.map);
            this.markers[pinIndex] = marker;
          }
        });
      });
    }
  }

  private resolveLocationWithCache(location: LocationObject): any {
    const cacheKey = this.getLocationCacheKey(location);

    // Check cache first
    if (this.coordinatesCache.has(cacheKey)) {
      return of(this.coordinatesCache.get(cacheKey)!);
    }

    // Not in cache, resolve and cache the result
    return this.geocodingService.resolveLocation(location).pipe(
      tap((coords: { lat: number; lng: number } | null) => {
        if (coords) {
          this.coordinatesCache.set(cacheKey, coords);
        }
      })
    );
  }

  private getLocationCacheKey(location: LocationObject): string {
    if (location.latitude !== undefined && location.longitude !== undefined) {
      return `coord_${location.latitude}_${location.longitude}`;
    }

    const parts = [
      location.address || '',
      location.city || '',
      location.state || '',
      location.country || '',
      location.zipCode || ''
    ].filter(part => part.length > 0);

    return `addr_${parts.join('_')}`;
  }

  private hasLocationChanged(prev: LocationObject, current: LocationObject): boolean {
    // Compare coordinates
    if (prev.latitude !== current.latitude || prev.longitude !== current.longitude) {
      return true;
    }

    // Compare address components
    return prev.address !== current.address ||
           prev.city !== current.city ||
           prev.state !== current.state ||
           prev.country !== current.country ||
           prev.zipCode !== current.zipCode;
  }

  private hasPinPropertiesChanged(prev: PinObject, current: PinObject): boolean {
    return prev.color !== current.color ||
           prev.title !== current.title ||
           prev.content !== current.content ||
           prev.draggable !== current.draggable ||
           prev.icon !== current.icon ||
           prev.popupTemplate !== current.popupTemplate;
  }

  private updateMarkerProperties(index: number, pin: PinObject): void {
    const marker = this.markers[index];
    if (!marker) return;

    // Update popup content if it has changed
    if (pin.popupTemplate || pin.content || pin.title) {
      // Remove old popup first
      marker.unbindPopup();
      // Add new popup
      this.addPopupToMarker(marker, pin, index);
    }

    // Update draggable state
    const isDraggable = pin.draggable !== undefined ? pin.draggable : this.mapOptions.defaultPinsDraggable || false;
    if (marker.options.draggable !== isDraggable) {
      if (isDraggable) {
        marker.dragging?.enable();
      } else {
        marker.dragging?.disable();
      }
    }
  }

  private createMarker(coords: { lat: number; lng: number }, pin: PinObject, pinIndex: number): L.Marker {
    const markerOptions: L.MarkerOptions = {};

    // Set draggable option
    const isDraggable = pin.draggable !== undefined ? pin.draggable : this.mapOptions.defaultPinsDraggable || false;
    markerOptions.draggable = isDraggable;

    // Custom icon
    if (pin.icon) {
      if (typeof pin.icon === 'string') {
        markerOptions.icon = L.icon({
          iconUrl: pin.icon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        });
      } else {
        markerOptions.icon = L.icon({
          iconUrl: pin.icon.iconUrl,
          iconSize: pin.icon.iconSize || [25, 41],
          iconAnchor: pin.icon.iconAnchor || [12, 41],
          popupAnchor: pin.icon.popupAnchor || [1, -34],
          shadowUrl: pin.icon.shadowUrl,
          shadowSize: pin.icon.shadowSize
        });
      }
    } else if (pin.color) {
      // Create colored marker using CSS
      const coloredIcon = this.createColoredIcon(pin.color);
      markerOptions.icon = coloredIcon;
    }

    const marker = L.marker([coords.lat, coords.lng], markerOptions);

    // Add popup content
    if (pin.popupTemplate || pin.content || pin.title) {
      this.addPopupToMarker(marker, pin, pinIndex);
    }

    // Add drag event handler if marker is draggable
    if (isDraggable) {
      marker.on('dragend', (e: L.DragEndEvent) => {
        const newLatLng = e.target.getLatLng();
        const dragEvent: PinDragEvent = {
          pinIndex,
          originalPin: pin,
          newCoordinates: {
            latitude: newLatLng.lat,
            longitude: newLatLng.lng
          },
          originalEvent: e
        };

        // Get address info for new location
        this.geocodingService.reverseGeocode(newLatLng.lat, newLatLng.lng).subscribe(displayName => {
          if (displayName) {
            dragEvent.newAddressInfo = {
              display_name: displayName,
              address: this.parseAddressFromDisplayName(displayName)
            };
          }

          this.ngZone.run(() => {
            this.pinDragged.emit(dragEvent);

            // Update selection data if this pin is associated with a selection
            if (pin.data?.selectionId) {
              const associatedSelection = this.selectedLocations.find(sel => sel.id === pin.data.selectionId);
              if (associatedSelection) {
                associatedSelection.coordinates = {
                  latitude: newLatLng.lat,
                  longitude: newLatLng.lng
                };

                if (dragEvent.newAddressInfo) {
                  associatedSelection.addressInfo = dragEvent.newAddressInfo;
                }

                // Update external search input if this is the primary selection
                this.updateExternalSearchInputFromSelection();

                // Emit selection change
                this.selectionChanged.emit([...this.selectedLocations]);
              }
            }
          });
        });
      });
    }

    return marker;
  }

  /**
   * Add popup content to a marker, supporting both template-based and string-based content
   */
  private addPopupToMarker(marker: L.Marker, pin: PinObject, pinIndex: number): void {
    if (pin.popupTemplate) {
      // Handle template-based popup
      this.addTemplatePopup(marker, pin, pinIndex);
    } else if (pin.content || pin.title) {
      // Handle string-based popup
      let popupContent = pin.content || pin.title || '';

      // Add delete button if enabled
      const selectionOptions = this.mapOptions.selection;
      if (selectionOptions?.allowPinDeletion && selectionOptions?.showDeleteButton) {
        popupContent += `
          <br>
          <button class="pin-delete-btn" onclick="window.deletePinHandler?.(${pinIndex})"
                  style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; margin-top: 8px;">
            🗑️ Delete Pin
          </button>
        `;
      }

      marker.bindPopup(popupContent);
    }
  }

  /**
   * Add template-based popup to a marker
   */

private getViewContainer(): ViewContainerRef | null {
  try {
    return this.injector.get(ViewContainerRef, null);
  } catch {
    return null;
  }
}

// Then update your template popup method:
private addTemplatePopup(marker: L.Marker, pin: PinObject, pinIndex: number): void {
  if (!pin.popupTemplate) return;

  const viewContainer = this.getViewContainer();
  if (!viewContainer) {
    console.warn('ViewContainerRef not available for template popups. Falling back to string-based popup.');
    let popupContent = pin.title || 'Template Popup';
    marker.bindPopup(popupContent);
    return;
  }

    // Create a function to generate popup content dynamically
    const createPopupContent = (): HTMLElement => {
      // Create context for the template
      const context: PinPopupContext = {
        $implicit: pin.location,
        pin: pin,
        pinIndex: pinIndex,
        deletePin: () => this.deletePinByIndex(pinIndex, 'user-action')
      };

      // Create embedded view from template
      const embeddedView = viewContainer!.createEmbeddedView(pin.popupTemplate!, context);

      // Store the view for cleanup
      this.embeddedViews.set(pinIndex, embeddedView);

      // Trigger change detection to ensure template is rendered
      embeddedView.detectChanges();

      // Create a container div to hold the template content
      const popupContainer = document.createElement('div');
      popupContainer.className = 'template-popup-container';

      // Append all nodes from the template to the container
      embeddedView.rootNodes.forEach((node: any) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          popupContainer.appendChild(node);
        }
      });

      return popupContainer;
    };

    // Bind popup with dynamic content creation
    const popup = L.popup({
      maxWidth: 400,
      closeButton: true,
      autoClose: true,
      autoPan: true
    });

    marker.bindPopup(popup);

    // Handle popup open event - create content dynamically
    marker.on('popupopen', () => {
      const content = createPopupContent();
      popup.setContent(content);
    });

    // Clean up the embedded view when popup is closed
    marker.on('popupclose', () => {
      const view = this.embeddedViews.get(pinIndex);
      if (view) {
        view.destroy();
        this.embeddedViews.delete(pinIndex);
      }
    });
  }

  private createColoredIcon(color: string): L.DivIcon {
    // Create a simple colored marker using SVG
    const svgIcon = `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z"
              fill="${color}" stroke="#fff" stroke-width="2"/>
        <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
      </svg>
    `;

    return L.divIcon({
      html: svgIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      className: 'colored-marker'
    });
  }

  private updateHighlightAreas(): void {
    if (!this.map) return;

    // Clear existing areas
    this.areas.forEach(area => this.map!.removeLayer(area));
    this.areas = [];

    if (!this.highlightAreas || this.highlightAreas.length === 0) return;

    this.highlightAreas.forEach(area => {
      // Resolve all boundary locations
      const boundaryObservables = area.boundary.map(location =>
        this.geocodingService.resolveLocation(location)
      );

      forkJoin(boundaryObservables).subscribe(coordinates => {
        const validCoords = coordinates.filter(coord => coord !== null) as { lat: number; lng: number }[];

        if (validCoords.length >= 3 && this.map) {
          const latLngs: L.LatLngExpression[] = validCoords.map(coord => [coord.lat, coord.lng]);

          const polygon = L.polygon(latLngs, {
            color: area.borderColor || '#3388ff',
            weight: area.borderWidth || 3,
            fillColor: area.fillColor || '#3388ff',
            fillOpacity: area.fillOpacity || 0.2
          });

          if (area.title) {
            polygon.bindPopup(area.title);
          }

          polygon.addTo(this.map);
          this.areas.push(polygon);
        }
      });
    });
  }

  /**
   * Get the Leaflet map instance
   */
  getMap(): L.Map | undefined {
    return this.map;
  }

  /**
   * Fit map bounds to show all pins and areas
   */
  fitBounds(): void {
    if (!this.map) return;

    const group = new L.FeatureGroup([...this.markers, ...this.areas]);

    if (group.getLayers().length > 0) {
      this.map.fitBounds(group.getBounds(), { padding: [10, 10] });
    }
  }

  /**
   * Add a new pin to the map
   */
  addPin(pin: PinObject): void {
    this.pins = [...this.pins, pin];
    this.updatePins();
  }

  /**
   * Remove a pin from the map
   */
  removePin(index: number): void {
    if (index >= 0 && index < this.pins.length) {
      this.pins = this.pins.filter((_, i) => i !== index);
      this.updatePins();
    }
  }

  /**
   * Clear all pins from the map
   */
  clearPins(): void {
    this.pins = [];
    this.updatePins();
  }

  /**
   * Add search control to the map
   */
  private addSearchControl(): void {
    if (!this.map) return;

    const searchOptions = this.mapOptions.search!;

    // Create custom search control
    const SearchControl = L.Control.extend({
      onAdd: (map: L.Map) => {
        const container = L.DomUtil.create('div', 'leaflet-control-search');
        container.style.backgroundColor = 'white';
        container.style.padding = '5px';
        container.style.borderRadius = '4px';
        container.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        container.style.position = 'relative';

        const searchForm = L.DomUtil.create('form', '', container);
        const searchInput = L.DomUtil.create('input', '', searchForm);
        const searchButton = L.DomUtil.create('button', '', searchForm);

        searchInput.type = 'text';
        searchInput.placeholder = searchOptions.placeholder || 'Search location...';
        searchInput.style.padding = '5px';
        searchInput.style.border = '1px solid #ccc';
        searchInput.style.borderRadius = '4px 0 0 4px';
        searchInput.style.width = '200px';

        searchButton.type = 'submit';
        searchButton.innerHTML = '🔍';
        searchButton.style.padding = '5px 10px';
        searchButton.style.border = '1px solid #ccc';
        searchButton.style.borderLeft = 'none';
        searchButton.style.borderRadius = '0 4px 4px 0';
        searchButton.style.backgroundColor = '#f8f9fa';
        searchButton.style.cursor = 'pointer';

        // Create autocomplete dropdown for built-in search
        let searchDropdown: HTMLElement | null = null;
        if (searchOptions.autocomplete?.enabled) {
          searchDropdown = L.DomUtil.create('div', 'leaflet-search-autocomplete', container);
          searchDropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ccc;
            border-top: none;
            border-radius: 0 0 4px 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
          `;
        }

        // Prevent map interaction when using search
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        // Handle autocomplete for built-in search
        let searchTimeout:any;

        if (searchOptions.autocomplete?.enabled && searchDropdown) {
          L.DomEvent.on(searchInput, 'input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const query = target.value.trim();

            // Clear previous timeout
            if (searchTimeout) {
              clearTimeout(searchTimeout);
            }

            if (query.length >= (searchOptions.autocomplete?.minQueryLength || 2)) {
              searchTimeout = setTimeout(() => {
                this.autocompleteService.getSuggestions(query, searchOptions.autocomplete?.maxResults || 5).subscribe(suggestions => {
                  this.showBuiltInAutocompleteSuggestions(suggestions, searchDropdown!, searchInput);

                  this.ngZone.run(() => {
                    this.autocompleteResults.emit(suggestions);
                  });
                });
              }, searchOptions.autocomplete?.debounceMs || 300);
            } else {
              this.hideBuiltInAutocompleteSuggestions(searchDropdown!);
            }
          });

          // Handle keyboard navigation
          L.DomEvent.on(searchInput, 'keydown', (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Escape') {
              this.hideBuiltInAutocompleteSuggestions(searchDropdown!);
            }
          });

          // Hide suggestions on blur
          L.DomEvent.on(searchInput, 'blur', () => {
            setTimeout(() => {
              this.hideBuiltInAutocompleteSuggestions(searchDropdown!);
            }, 200);
          });
        }

        // Handle search
        L.DomEvent.on(searchForm, 'submit', (e: Event) => {
          e.preventDefault();
          const query = searchInput.value.trim();
          if (query) {
            this.handleSearch(query);
            if (searchDropdown) {
              this.hideBuiltInAutocompleteSuggestions(searchDropdown);
            }
          }
        });

        return container;
      }
    });

    this.searchControl = new SearchControl({ position: 'topright' });
    this.searchControl.addTo(this.map);
  }

  /**
   * Show autocomplete suggestions for built-in search
   */
  private showBuiltInAutocompleteSuggestions(suggestions: AutocompleteSuggestion[], dropdown: HTMLElement, inputElement: HTMLInputElement): void {
    if (suggestions.length === 0) {
      this.hideBuiltInAutocompleteSuggestions(dropdown);
      return;
    }

    // Clear existing suggestions
    dropdown.innerHTML = '';

    // Add suggestions
    suggestions.forEach((suggestion) => {
      const item = document.createElement('div');
      item.className = 'leaflet-search-autocomplete-item';
      item.style.cssText = `
        padding: 8px 12px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        transition: background-color 0.2s;
      `;

      item.innerHTML = `
        <div style="font-weight: 500; margin-bottom: 2px;">${suggestion.displayText}</div>
        <div style="font-size: 0.85em; color: #666; opacity: 0.8;">${suggestion.fullDisplayName}</div>
      `;

      // Hover effects
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = '#f5f5f5';
      });

      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'white';
      });

      // Click handler
      item.addEventListener('click', () => {
        inputElement.value = suggestion.displayText;
        this.handleSearch(suggestion.displayText);
        this.hideBuiltInAutocompleteSuggestions(dropdown);
      });

      dropdown.appendChild(item);
    });

    // Show dropdown
    dropdown.style.display = 'block';
  }

  /**
   * Hide autocomplete suggestions for built-in search
   */
  private hideBuiltInAutocompleteSuggestions(dropdown: HTMLElement): void {
    dropdown.style.display = 'none';
  }

  /**
   * Handle search functionality
   */
  private handleSearch(query: string): void {
    if (!query || !this.map) return;

    const locationObj: LocationObject = { address: query };

    this.geocodingService.resolveLocation(locationObj).subscribe(coords => {
      if (coords && this.map) {
        const searchOptions = this.mapOptions.search!;
        const zoom = searchOptions.searchZoom || 15;

        // Zoom to location if autoZoom is enabled (default true)
        if (searchOptions.autoZoom !== false) {
          this.map.setView([coords.lat, coords.lng], zoom);
        }

        // Add pin if configured - but let the selection system handle it
        // We'll pass the pin configuration to the selection handler
        const searchPinConfig = searchOptions.addPinOnResult ? {
          ...searchOptions.searchResultPin,
          title: searchOptions.searchResultPin?.title || 'Search Result',
          content: searchOptions.searchResultPin?.content || `<h3>📍 Search Result</h3><p>${query}</p>`,
          color: searchOptions.searchResultPin?.color || '#ff6b6b'
        } : undefined;

        // Get address information for the result
        this.geocodingService.reverseGeocode(coords.lat, coords.lng).subscribe(addressInfo => {
          const searchResult: SearchResult = {
            coordinates: { latitude: coords.lat, longitude: coords.lng },
            displayName: addressInfo || query,
            address: this.parseAddressFromDisplayName(addressInfo || '')
          };

          // Create a map click event for selection handling
          const searchClickEvent: MapClickEvent = {
            coordinates: { latitude: coords.lat, longitude: coords.lng },
            addressInfo: addressInfo ? {
              display_name: addressInfo,
              address: this.parseAddressFromDisplayName(addressInfo)
            } : undefined
          };

          // Handle selection for search result (always single selection)
          this.handleLocationSelection(searchClickEvent, 'search-result', searchPinConfig);

          this.ngZone.run(() => {
            this.searchResult.emit(searchResult);
          });
        });
      }
    });
  }

  /**
   * Enable click-to-select functionality
   */
  private enableClickSelect(): void {
    if (!this.map) return;

    this.clickSelectEnabled = true;

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const clickEvent: MapClickEvent = {
        coordinates: {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        },
        originalEvent: e
      };

      // Emit immediate click event
      this.ngZone.run(() => {
        this.mapClick.emit(clickEvent);
      });

      // Get address information for clicked location
      this.geocodingService.reverseGeocode(e.latlng.lat, e.latlng.lng).subscribe(displayName => {
        if (displayName) {
          clickEvent.addressInfo = {
            display_name: displayName,
            address: this.parseAddressFromDisplayName(displayName)
          };
        }

        // Handle selection based on multi-select settings
        this.handleLocationSelection(clickEvent, 'map-click');

        this.ngZone.run(() => {
          this.locationSelected.emit(clickEvent);
        });
      });
    });
  }

  /**
   * Parse address components from display name
   */
  private parseAddressFromDisplayName(displayName: string): any {
    // Simple parsing - in a real implementation, you might want more sophisticated parsing
    const parts = displayName.split(', ');
    if (parts.length >= 4) {
      return {
        road: parts[0],
        city: parts[parts.length - 4],
        state: parts[parts.length - 3],
        postcode: parts[parts.length - 2],
        country: parts[parts.length - 1]
      };
    }
    return {};
  }

  /**
   * Perform search programmatically
   */
  search(query: string): void {
    this.handleSearch(query);
  }

  /**
   * Toggle click-to-select functionality
   */
  toggleClickSelect(enabled: boolean): void {
    if (!this.map) return;

    if (enabled && !this.clickSelectEnabled) {
      this.enableClickSelect();
    } else if (!enabled && this.clickSelectEnabled) {
      this.map.off('click');
      this.clickSelectEnabled = false;
    }
  }

  /**
   * Get current search control visibility
   */
  isSearchEnabled(): boolean {
    return !!this.searchControl;
  }

  /**
   * Get current click-select status
   */
  isClickSelectEnabled(): boolean {
    return this.clickSelectEnabled;
  }

  /**
   * Setup external search input binding with autocomplete
   */
  private setupExternalSearchInput(): void {
    if (!this.mapOptions.searchInput?.enableExternalBinding) return;

    const inputConfig = this.mapOptions.searchInput;
    let inputElement: HTMLInputElement;

    // Get input element
    if (typeof inputConfig.inputElement === 'string') {
      const element = document.querySelector(inputConfig.inputElement) as HTMLInputElement;
      if (!element) {
        console.warn(`External search input element not found: ${inputConfig.inputElement}`);
        return;
      }
      inputElement = element;
    } else if (inputConfig.inputElement instanceof HTMLInputElement) {
      inputElement = inputConfig.inputElement;
    } else {
      console.warn('Invalid external search input element configuration');
      return;
    }

    this.externalSearchInput = inputElement;

    // Auto-focus if configured
    if (inputConfig.autoFocus) {
      setTimeout(() => inputElement.focus(), 100);
    }

    // Setup autocomplete if enabled
    if (inputConfig.showSuggestionsDropdown) {
      this.setupAutocompleteDropdown(inputElement, inputConfig);
    }

    // Handle search on input events
    let searchTimeout: any;

    inputElement.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const query = target.value.trim();

      // Clear previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      if (query.length >= 2) {
        // Get autocomplete suggestions if enabled
        if (inputConfig.showSuggestionsDropdown && this.mapOptions.search?.autocomplete?.enabled) {
          const autocompleteOptions = this.mapOptions.search.autocomplete;

          searchTimeout = setTimeout(() => {
            this.autocompleteService.getSuggestions(query, autocompleteOptions?.maxResults || 5).subscribe(suggestions => {
              this.showAutocompleteSuggestions(suggestions, inputElement);

              this.ngZone.run(() => {
                this.autocompleteResults.emit(suggestions);
              });
            });
          }, autocompleteOptions?.debounceMs || 300);
        }
      } else {
        this.hideAutocompleteSuggestions();
      }
    });

    // Handle search on Enter key
    inputElement.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = inputElement.value.trim();
        if (query) {
          this.handleSearch(query);
          this.hideAutocompleteSuggestions();
        }
      } else if (e.key === 'Escape') {
        this.hideAutocompleteSuggestions();
      }
    });

    // Handle search on blur (optional)
    inputElement.addEventListener('blur', () => {
      // Small delay to allow clicking on suggestions
      setTimeout(() => {
        this.hideAutocompleteSuggestions();
      }, 200);
    });
  }

  /**
   * Setup autocomplete dropdown UI
   */
  private setupAutocompleteDropdown(inputElement: HTMLInputElement, inputConfig: any): void {
    // Create dropdown container
    this.autocompleteDropdown = document.createElement('div');
    this.autocompleteDropdown.className = 'ng-osm-autocomplete-dropdown';
    this.autocompleteDropdown.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
    `;

    // Determine container for dropdown
    let dropdownContainer: HTMLElement | null = null;

    if (inputConfig.dropdownContainer) {
      if (typeof inputConfig.dropdownContainer === 'string') {
        dropdownContainer = document.querySelector(inputConfig.dropdownContainer) as HTMLElement;
      } else {
        dropdownContainer = inputConfig.dropdownContainer;
      }
    }

    if (!dropdownContainer) {
      // Create wrapper around input if none specified
      const inputParent = inputElement.parentElement;
      if (inputParent && inputParent.style.position !== 'relative') {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        inputParent.insertBefore(wrapper, inputElement);
        wrapper.appendChild(inputElement);
        dropdownContainer = wrapper;
      } else {
        dropdownContainer = inputParent || document.body;
      }
    }

    dropdownContainer.appendChild(this.autocompleteDropdown);
  }

  /**
   * Show autocomplete suggestions
   */
  private showAutocompleteSuggestions(suggestions: AutocompleteSuggestion[], inputElement: HTMLInputElement): void {
    if (!this.autocompleteDropdown || suggestions.length === 0) {
      this.hideAutocompleteSuggestions();
      return;
    }

    // Clear existing suggestions
    this.autocompleteDropdown.innerHTML = '';      // Add suggestions
      suggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = 'ng-osm-autocomplete-item';
        item.style.cssText = `
          padding: 8px 12px;
          cursor: pointer;
          border-bottom: 1px solid #eee;
          transition: background-color 0.2s;
        `;

        item.innerHTML = `
          <div style="font-weight: 500; margin-bottom: 2px;">${suggestion.displayText}</div>
          <div style="font-size: 0.85em; color: #666; opacity: 0.8;">${suggestion.fullDisplayName}</div>
        `;

        // Hover effects
        item.addEventListener('mouseenter', () => {
          item.style.backgroundColor = '#f5f5f5';
        });

        item.addEventListener('mouseleave', () => {
          item.style.backgroundColor = 'white';
        });

        // Click handler
        item.addEventListener('click', () => {
          inputElement.value = suggestion.displayText;
          this.handleSearch(suggestion.displayText);
          this.hideAutocompleteSuggestions();
        });

        if (this.autocompleteDropdown) {
          this.autocompleteDropdown.appendChild(item);
        }
      });

    // Show dropdown
    this.autocompleteDropdown.style.display = 'block';
  }

  /**
   * Hide autocomplete suggestions
   */
  private hideAutocompleteSuggestions(): void {
    if (this.autocompleteDropdown) {
      this.autocompleteDropdown.style.display = 'none';
    }
  }

  /**
   * Setup tile layers based on configuration
   */
  private setupTileLayers(options: MapOptions): void {
    if (!this.map) return;

    let tileLayerConfig: TileLayerConfig;

    // Determine which tile layer to use
    if (options.tileLayerType) {
      tileLayerConfig = this.tileLayerService.getTileLayerConfig(options.tileLayerType);
    } else if (options.tileLayer && options.attribution) {
      // Custom tile layer
      tileLayerConfig = {
        type: 'openstreetmap',
        name: 'Custom',
        url: options.tileLayer,
        attribution: options.attribution,
        maxZoom: options.maxZoom || 19
      };
    } else {
      // Default to OpenStreetMap
      tileLayerConfig = this.tileLayerService.getTileLayerConfig('openstreetmap');
    }

    // Create and add the primary tile layer
    this.currentTileLayer = L.tileLayer(tileLayerConfig.url, {
      attribution: tileLayerConfig.attribution,
      maxZoom: tileLayerConfig.maxZoom || 19,
      minZoom: tileLayerConfig.minZoom || 1,
      subdomains: tileLayerConfig.subdomains || ['a', 'b', 'c']
    });

    this.currentTileLayer.addTo(this.map);
    this.tileLayers[tileLayerConfig.name] = this.currentTileLayer;

    // Setup additional tile layers if layer control is enabled
    if (options.enableLayerControl) {
      this.setupAdditionalTileLayers(options);
    }
  }

  /**
   * Setup additional tile layers for layer control
   */
  private setupAdditionalTileLayers(options: MapOptions): void {
    const availableLayers = options.availableTileLayers || this.tileLayerService.getDefaultTileLayersForControl();

    availableLayers.forEach(layerConfig => {
      if (!this.tileLayers[layerConfig.name]) {
        const tileLayer = L.tileLayer(layerConfig.url, {
          attribution: layerConfig.attribution,
          maxZoom: layerConfig.maxZoom || 19,
          minZoom: layerConfig.minZoom || 1,
          subdomains: layerConfig.subdomains || ['a', 'b', 'c']
        });
        this.tileLayers[layerConfig.name] = tileLayer;
      }
    });
  }

  /**
   * Add layer control to the map
   */
  private addLayerControl(): void {
    if (!this.map || Object.keys(this.tileLayers).length <= 1) return;

    const baseLayers: { [key: string]: L.TileLayer } = {};

    // Add all tile layers to the control
    Object.entries(this.tileLayers).forEach(([name, layer]) => {
      baseLayers[name] = layer;
    });

    this.layerControl = L.control.layers(baseLayers, {}, {
      position: 'topright',
      collapsed: true
    });

    this.layerControl.addTo(this.map);
  }

  /**
   * Switch to a different tile layer
   */
  switchTileLayer(layerType: TileLayerType): void {
    if (!this.map) return;

    const layerConfig = this.tileLayerService.getTileLayerConfig(layerType);

    // Remove current tile layer
    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }

    // Add new tile layer
    this.currentTileLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom || 19,
      minZoom: layerConfig.minZoom || 1,
      subdomains: layerConfig.subdomains || ['a', 'b', 'c']
    });

    this.currentTileLayer.addTo(this.map);
  }

  /**
   * Get available tile layer types
   */
  getAvailableTileLayerTypes(): TileLayerType[] {
    return this.tileLayerService.getAllTileLayerConfigs().map(config => config.type);
  }

  /**
   * Get current tile layer type
   */
  getCurrentTileLayerType(): TileLayerType | undefined {
    // This would need to be tracked when switching layers
    return this.mapOptions.tileLayerType || 'openstreetmap';
  }

  /**
   * Update a specific pin's location without recreating all markers
   */
  updatePinLocation(pinIndex: number, newLocation: LocationObject): void {
    if (pinIndex >= 0 && pinIndex < this.markers.length && pinIndex < this.pins.length) {
      const marker = this.markers[pinIndex];

      if (newLocation.latitude !== undefined && newLocation.longitude !== undefined) {
        // Update marker position directly
        marker.setLatLng([newLocation.latitude, newLocation.longitude]);

        // Update pin data
        this.pins[pinIndex].location = newLocation;
      } else {
        // Need to resolve address-based location
        this.geocodingService.resolveLocation(newLocation).subscribe(coords => {
          if (coords && marker) {
            marker.setLatLng([coords.lat, coords.lng]);
            this.pins[pinIndex].location = {
              latitude: coords.lat,
              longitude: coords.lng
            };
          }
        });
      }
    }
  }

  /**
   * Handle location selection with multi-select support
   * @param clickEvent The map click event
   * @param source The source of the selection ('map-click' | 'search-result')
   * @param customPinConfig Custom pin configuration for this selection
   */
  private handleLocationSelection(clickEvent: MapClickEvent, source: 'map-click' | 'search-result' = 'map-click', customPinConfig?: Partial<PinObject>): void {
    const selectionOptions = this.mapOptions.selection;

    if (!selectionOptions) {
      return; // No selection configuration
    }

    const selectedLocation: SelectedLocation = {
      id: `${source}_${++this.selectionCounter}`,
      coordinates: clickEvent.coordinates,
      addressInfo: clickEvent.addressInfo,
      selectedAt: new Date()
    };

    if (source === 'search-result') {
      // Search results always replace any existing search selection
      // Remove previous search selections
      const existingSearchSelections = this.selectedLocations.filter(sel => sel.id.startsWith('search-result_'));
      existingSearchSelections.forEach(sel => {
        if (sel.pinIndex !== undefined) {
          this.deletePinByIndex(sel.pinIndex, 'programmatic');
        }
      });

      // If multi-select is off, also remove map-click selections
      if (!selectionOptions.multiSelect) {
        const mapClickSelections = this.selectedLocations.filter(sel => sel.id.startsWith('map-click_'));
        mapClickSelections.forEach(sel => {
          if (sel.pinIndex !== undefined) {
            this.deletePinByIndex(sel.pinIndex, 'programmatic');
          }
        });
        this.selectedLocations = [];
      } else {
        // Multi-select is on, only remove search selections
        this.selectedLocations = this.selectedLocations.filter(sel => !sel.id.startsWith('search-result_'));
      }

      // Add the new search selection
      this.selectedLocations.unshift(selectedLocation); // Add at beginning for priority
    } else {
      // Map-click selection
      if (!selectionOptions.multiSelect) {
        // Single selection mode - replace all existing selections
        this.selectedLocations.forEach(existingSelection => {
          if (existingSelection.pinIndex !== undefined) {
            this.deletePinByIndex(existingSelection.pinIndex, 'programmatic');
          }
        });
        this.selectedLocations = [selectedLocation];
      } else {
        // Multi-select mode for map clicks
        // Check max selections limit
        if (selectionOptions.maxSelections && selectionOptions.maxSelections > 0) {
          // Count only map-click selections for the limit
          const mapClickSelections = this.selectedLocations.filter(sel => sel.id.startsWith('map-click_'));
          if (mapClickSelections.length >= selectionOptions.maxSelections) {
            // Remove oldest map-click selection
            const oldestMapClick = mapClickSelections[mapClickSelections.length - 1];
            if (oldestMapClick.pinIndex !== undefined) {
              this.deletePinByIndex(oldestMapClick.pinIndex, 'programmatic');
            }
            this.selectedLocations = this.selectedLocations.filter(sel => sel.id !== oldestMapClick.id);
          }
        }

        // Add new map-click selection
        // If there's a search selection, add after it, otherwise add at beginning
        const searchSelectionIndex = this.selectedLocations.findIndex(sel => sel.id.startsWith('search-result_'));
        if (searchSelectionIndex >= 0) {
          this.selectedLocations.splice(searchSelectionIndex + 1, 0, selectedLocation);
        } else {
          this.selectedLocations.unshift(selectedLocation);
        }
      }
    }

    // Create pin for selection if enabled
    if (selectionOptions.createPinsForSelections) {
      let pinConfig: PinObject;

      if (source === 'search-result' && customPinConfig) {
        // Use custom search pin configuration
        pinConfig = {
          location: clickEvent.coordinates,
          title: customPinConfig.title || 'Search Result',
          content: customPinConfig.content || this.generateSelectionPinContent(selectedLocation),
          color: customPinConfig.color || '#ff6b6b',
          draggable: customPinConfig.draggable !== false,
          data: { selectionId: selectedLocation.id, isSearchSelection: true },
          ...customPinConfig
        };
      } else {
        // Use regular selection pin configuration
        pinConfig = {
          location: clickEvent.coordinates,
          color: selectionOptions.selectionPin?.color || '#9c27b0',
          title: selectionOptions.selectionPin?.title || 'Selected Location',
          content: selectionOptions.selectionPin?.content || this.generateSelectionPinContent(selectedLocation),
          draggable: selectionOptions.selectionPin?.draggable !== false,
          data: { selectionId: selectedLocation.id, isSearchSelection: source === 'search-result' }
        };
      }

      // Add pin to the pins array
      this.pins.push(pinConfig);
      selectedLocation.pinIndex = this.pins.length - 1;

      // Update markers
      this.updatePins();
    }

    // Emit selection change
    this.ngZone.run(() => {
      this.selectionChanged.emit([...this.selectedLocations]);
    });

    // Update external search input if enabled
    this.updateExternalSearchInputFromSelection();
  }

  /**
   * Get the primary selection (search selection has priority, otherwise first selection)
   */
  private getPrimarySelection(): SelectedLocation | undefined {
    // Search selection has priority
    const searchSelection = this.selectedLocations.find(sel => sel.id.startsWith('search-result_'));
    if (searchSelection) {
      return searchSelection;
    }

    // Return first selection if no search selection
    return this.selectedLocations.length > 0 ? this.selectedLocations[0] : undefined;
  }

  /**
   * Update external search input with primary selection
   */
  private updateExternalSearchInputFromSelection(): void {
    const primarySelection = this.getPrimarySelection();
    if (primarySelection) {
      const displayValue = primarySelection.addressInfo?.display_name ||
        `${primarySelection.coordinates.latitude.toFixed(6)}, ${primarySelection.coordinates.longitude.toFixed(6)}`;

      // Find external search input and update it
      const externalInput = document.querySelector('#external-search-input') as HTMLInputElement;
      if (externalInput) {
        externalInput.value = displayValue;
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        externalInput.dispatchEvent(inputEvent);
      }
    }
  }

  /**
   * Generate content for selection pin popup
   */
  private generateSelectionPinContent(selection: SelectedLocation): string {
    const coords = selection.coordinates;
    const address = selection.addressInfo?.display_name;

    return `
      <h3>📍 Selected Location</h3>
      <p><strong>Coordinates:</strong><br>
         Lat: ${coords.latitude.toFixed(6)}<br>
         Lng: ${coords.longitude.toFixed(6)}</p>
      ${address ? `<p><strong>Address:</strong><br>${address}</p>` : ''}
      <p><small>Selected: ${selection.selectedAt.toLocaleString()}</small></p>
    `;
  }

  /**
   * Delete a pin by index
   */
  private deletePinByIndex(pinIndex: number, reason: 'user-action' | 'programmatic'): void {
    if (pinIndex >= 0 && pinIndex < this.pins.length) {
      const deletedPin = this.pins[pinIndex];

      // Remove pin from array
      this.pins.splice(pinIndex, 1);

      // Update selections that reference pins after this index
      this.selectedLocations.forEach(selection => {
        if (selection.pinIndex !== undefined) {
          if (selection.pinIndex === pinIndex) {
            // This selection's pin was deleted
            selection.pinIndex = undefined;
          } else if (selection.pinIndex > pinIndex) {
            // Adjust index for pins that shifted down
            selection.pinIndex--;
          }
        }
      });

      // Remove associated selection if it exists
      if (deletedPin.data?.selectionId) {
        this.selectedLocations = this.selectedLocations.filter(
          selection => selection.id !== deletedPin.data.selectionId
        );
      }

      // Emit pin deleted event
      this.ngZone.run(() => {
        this.pinDeleted.emit({
          pinIndex,
          deletedPin,
          reason
        });

        this.selectionChanged.emit([...this.selectedLocations]);
      });

      // Update markers
      this.updatePins();
    }
  }

  /**
   * Setup global pin deletion handler
   */
  private setupPinDeletionHandler(): void {
    // Create global handler for pin deletion from popups
    (window as any).deletePinHandler = (pinIndex: number) => {
      this.deletePinByIndex(pinIndex, 'user-action');
    };
  }

  /**
   * Get current selections
   */
  getSelectedLocations(): SelectedLocation[] {
    return [...this.selectedLocations];
  }

  /**
   * Clear all selections
   */
  clearSelections(): void {
    // Remove pins associated with selections
    this.selectedLocations.forEach(selection => {
      if (selection.pinIndex !== undefined) {
        this.deletePinByIndex(selection.pinIndex, 'programmatic');
      }
    });

    this.selectedLocations = [];

    this.ngZone.run(() => {
      this.selectionChanged.emit([]);
    });
  }

  /**
   * Add a selection programmatically
   */
  addSelection(coordinates: { latitude: number; longitude: number }, addressInfo?: any): void {
    const clickEvent: MapClickEvent = {
      coordinates,
      addressInfo
    };

    this.handleLocationSelection(clickEvent);
  }

  /**
   * Clear the coordinates cache (useful for testing or if locations have changed)
   */
  public clearLocationCache(): void {
    this.coordinatesCache.clear();
  }
}
