import { EventEmitter, TemplateRef } from '@angular/core';

/**
 * Location object that can be specified by coordinates or address
 */
export interface LocationObject {
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
  /** Address string for geocoding */
  address?: string;
  /** State/province */
  state?: string;
  /** Country */
  country?: string;
  /** ZIP/postal code */
  zipCode?: string;
  /** City */
  city?: string;
}

/**
 * Pin configuration for map markers
 */
export interface PinObject {
  /** Location of the pin */
  location: LocationObject;
  /** Custom color for the pin (hex, rgb, or named color) */
  color?: string;
  /** Custom HTML content for the pin popup */
  content?: string;
  /** Template reference for custom popup content */
  popupTemplate?: TemplateRef<PinPopupContext>;
  /** Title for the pin */
  title?: string;
  /** Icon URL or icon configuration */
  icon?: string | PinIcon;
  /** Whether the pin is draggable */
  draggable?: boolean;
  /** Custom data associated with the pin */
  data?: any;
}

/**
 * Context provided to pin popup templates
 */
export interface PinPopupContext {
  /** The location object associated with this pin */
  $implicit: LocationObject;
  /** The complete pin object */
  pin: PinObject;
  /** The index of the pin in the pins array */
  pinIndex: number;
  /** Callback function to delete this pin */
  deletePin: () => void;
}

/**
 * Custom pin icon configuration
 */
export interface PinIcon {
  /** URL to the icon image */
  iconUrl: string;
  /** Size of the icon [width, height] */
  iconSize?: [number, number];
  /** Anchor point of the icon [x, y] */
  iconAnchor?: [number, number];
  /** Popup anchor point [x, y] */
  popupAnchor?: [number, number];
  /** Shadow URL */
  shadowUrl?: string;
  /** Shadow size [width, height] */
  shadowSize?: [number, number];
}

/**
 * Area highlighting configuration
 */
export interface HighlightArea {
  /** Array of locations defining the area boundary */
  boundary: LocationObject[];
  /** Border color (hex, rgb, or named color) */
  borderColor?: string;
  /** Border width in pixels */
  borderWidth?: number;
  /** Fill color (hex, rgb, or named color) */
  fillColor?: string;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Area title */
  title?: string;
}

/**
 * Map configuration options
 */
export interface MapOptions {
  /** Initial zoom level (1-18) */
  zoom?: number;
  /** Minimum zoom level */
  minZoom?: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Enable zoom control */
  zoomControl?: boolean;
  /** Map height in pixels or CSS string */
  height?: number | string;
  /** Map width in pixels or CSS string */
  width?: number | string;
  /** Enable scroll wheel zoom */
  scrollWheelZoom?: boolean;
  /** Enable double click zoom */
  doubleClickZoom?: boolean;
  /** Map tile layer URL template */
  tileLayer?: string;
  /** Attribution text */
  attribution?: string;
  /** Tile layer type (predefined options) */
  tileLayerType?: TileLayerType;
  /** Available tile layers for layer control */
  availableTileLayers?: TileLayerConfig[];
  /** Enable tile layer control */
  enableLayerControl?: boolean;
  /** Search configuration */
  search?: SearchOptions;
  /** Enable click-to-select functionality */
  enableClickSelect?: boolean;
  /** Selection configuration */
  selection?: SelectionOptions;
  /** External search input configuration */
  searchInput?: SearchInputConfig;
  /** Default draggable state for pins */
  defaultPinsDraggable?: boolean;
  /** Pre-selected locations that will be marked as selected without triggering selection events */
  preSelectedLocations?: LocationObject[];
}

/**
 * Geocoding result from address lookup
 */
export interface GeocodingResult {
  /** Latitude */
  lat: number;
  /** Longitude */
  lon: number;
  /** Display name */
  display_name: string;
  /** Address components */
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

/**
 * Search configuration options
 */
export interface SearchOptions {
  /** Enable search functionality */
  enabled?: boolean;
  /** Placeholder text for search input */
  placeholder?: string;
  /** Auto-zoom to search results */
  autoZoom?: boolean;
  /** Zoom level when showing search results */
  searchZoom?: number;
  /** Add a pin at search result location */
  addPinOnResult?: boolean;
  /** Custom search result pin configuration */
  searchResultPin?: Partial<PinObject>;
  /** Autocomplete configuration */
  autocomplete?: {
    /** Enable autocomplete suggestions */
    enabled?: boolean;
    /** Debounce time in milliseconds */
    debounceMs?: number;
    /** Maximum number of suggestions */
    maxResults?: number;
    /** Minimum query length to trigger autocomplete */
    minQueryLength?: number;
  };
}

/**
 * Map click event data
 */
export interface MapClickEvent {
  /** Clicked coordinates */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Address information (if available) */
  addressInfo?: {
    display_name?: string;
    address?: {
      house_number?: string;
      road?: string;
      city?: string;
      state?: string;
      postcode?: string;
      country?: string;
    };
  };
  /** Original Leaflet event */
  originalEvent?: any;
}

/**
 * Search result data
 */
export interface SearchResult {
  /** Location coordinates */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Display name */
  displayName: string;
  /** Address components */
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  /** Bounding box */
  boundingBox?: [number, number, number, number];
}

/**
 * Pin drag event data
 */
export interface PinDragEvent {
  /** Pin index in the pins array */
  pinIndex: number;
  /** Original pin configuration */
  originalPin: PinObject;
  /** New coordinates after drag */
  newCoordinates: {
    latitude: number;
    longitude: number;
  };
  /** Address information for new location (if available) */
  newAddressInfo?: {
    display_name?: string;
    address?: {
      house_number?: string;
      road?: string;
      city?: string;
      state?: string;
      postcode?: string;
      country?: string;
    };
  };
  /** Original Leaflet drag event */
  originalEvent?: any;
}

/**
 * Autocomplete suggestion item
 */
export interface AutocompleteSuggestion {
  /** Display text for the suggestion */
  displayText: string;
  /** Full display name from geocoding */
  fullDisplayName: string;
  /** Coordinates */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Address components */
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  /** Bounding box */
  boundingBox?: [number, number, number, number];
  /** Original geocoding result */
  originalResult?: GeocodingResult;
}

/**
 * Context provided to autocomplete search templates
 */
export interface AutocompleteSearchContext {
  /** The current autocomplete suggestions */
  $implicit: AutocompleteSuggestion[];
  /** The current search query string */
  query: string;
  /** Function to select a suggestion */
  selectSuggestion: (suggestion: AutocompleteSuggestion) => void;
  /** Whether suggestions are currently loading */
  loading: boolean;
}

/**
 * Search input configuration for external input binding
 */
export interface SearchInputConfig {
  /** Enable external input binding */
  enableExternalBinding?: boolean;
  /** Element selector or HTMLInputElement for binding */
  inputElement?: string | HTMLInputElement;
  /** Show suggestions as dropdown */
  showSuggestionsDropdown?: boolean;
  /** Custom dropdown container selector */
  dropdownContainer?: string | HTMLElement;
  /** Auto-focus input on map load */
  autoFocus?: boolean;
}

/**
 * Available tile layer types
 */
export type TileLayerType = 'openstreetmap' | 'satellite' | 'terrain' | 'dark' | 'light' | 'watercolor' | 'toner';

/**
 * Tile layer configuration
 */
export interface TileLayerConfig {
  /** Type of tile layer */
  type: TileLayerType;
  /** Display name */
  name: string;
  /** Tile URL template */
  url: string;
  /** Attribution text */
  attribution: string;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Minimum zoom level */
  minZoom?: number;
  /** Subdomains */
  subdomains?: string[];
}

/**
 * Selected location information
 */
export interface SelectedLocation {
  /** Unique identifier for the selection */
  id: string;
  /** Location coordinates */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Address information (if available) */
  addressInfo?: {
    display_name?: string;
    address?: {
      house_number?: string;
      road?: string;
      city?: string;
      state?: string;
      postcode?: string;
      country?: string;
    };
  };
  /** Associated pin index (if a pin was created for this selection) */
  pinIndex?: number;
  /** Timestamp when selected */
  selectedAt: Date;
}

/**
 * Pin deletion event data
 */
export interface PinDeleteEvent {
  /** Pin index that was deleted */
  pinIndex: number;
  /** The deleted pin configuration */
  deletedPin: PinObject;
  /** Reason for deletion */
  reason: 'user-action' | 'programmatic';
}

/**
 * Selection configuration options
 */
export interface SelectionOptions {
  /** Enable multi-selection (default: false for single selection) */
  multiSelect?: boolean;
  /** Maximum number of selections (0 = unlimited) */
  maxSelections?: number;
  /** Auto-create pins for selections */
  createPinsForSelections?: boolean;
  /** Custom pin configuration for selected locations */
  selectionPin?: Partial<PinObject>;
  /** Show delete button in pin tooltips */
  showDeleteButton?: boolean;
  /** Allow deleting individual pins from tooltip */
  allowPinDeletion?: boolean;
}

/**
 * Context provided to autocomplete search templates
 */
export interface AutocompleteSearchContext {
  /** Array of autocomplete suggestions */
  $implicit: AutocompleteSuggestion[];
  /** Current search query */
  query: string;
  /** Whether suggestions are loading */
  loading: boolean;
  /** Callback to trigger a search */
  search: (query: string) => void;
  /** Callback to select a suggestion */
  selectSuggestion: (suggestion: AutocompleteSuggestion) => void;
  /** Callback to clear suggestions */
  clearSuggestions: () => void;
}
