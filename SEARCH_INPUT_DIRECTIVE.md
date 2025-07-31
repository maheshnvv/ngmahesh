# NgOsmMap Search Input Directive

The `NgOsmSearchInputDirective` provides a powerful way to create custom search inputs that are connected to NgOsmMap instances. This directive replaces the previous DOM query-based approach with a clean Angular directive-based solution.

## Features

- **Decoupled Architecture**: Search inputs are completely separate from map components
- **Automatic Connection**: Connect search inputs to specific maps using unique IDs
- **Autocomplete Support**: Built-in autocomplete with customizable templates
- **Multiple Inputs**: Support for multiple search inputs connected to the same map
- **Custom Templates**: Use Angular templates for custom autocomplete UI
- **Reactive Updates**: Search inputs automatically update when map selections change

## Basic Usage

### 1. Import the Required Modules

```typescript
import { NgOsmMapComponent, NgOsmSearchInputDirective } from '@ngmahesh/ng-osm-map';

@Component({
  imports: [NgOsmMapComponent, NgOsmSearchInputDirective],
  // ...
})
```

### 2. Create a Basic Search Input

```html
<!-- Search Input -->
<input 
  type="text" 
  ngOsmSearchInput
  [connectedMapId]="'my-map-id'"
  [enableAutocomplete]="true"
  [showSuggestionsDropdown]="true"
  placeholder="Search for a location..."
  (search)="onSearch($event)"
  (suggestionSelected)="onSuggestionSelected($event)">

<!-- Connected Map -->
<ng-osm-map
  [mapId]="'my-map-id'"
  [mapOptions]="mapOptions"
  [height]="400">
</ng-osm-map>
```

### 3. Component Code

```typescript
export class MyComponent {
  mapOptions = {
    zoom: 10,
    enableClickSelect: true,
    selection: {
      multiSelect: false,
      createPinsForSelections: true
    }
  };

  onSearch(query: string): void {
    console.log('Searching for:', query);
  }

  onSuggestionSelected(suggestion: AutocompleteSuggestion): void {
    console.log('Selected:', suggestion.displayText);
  }
}
```

## Advanced Usage

### Custom Autocomplete Template

Create a custom template for autocomplete suggestions:

```html
<input 
  type="text" 
  ngOsmSearchInput
  [connectedMapId]="'my-map-id'"
  [customSearchTemplate]="customAutocompleteTemplate"
  placeholder="Search with custom template...">

<ng-template #customAutocompleteTemplate 
             let-suggestions 
             let-query="query" 
             let-selectSuggestion="selectSuggestion" 
             let-loading="loading">
  <div class="custom-dropdown" *ngIf="suggestions.length > 0 || loading">
    <div *ngIf="loading" class="loading">
      <span>Searching...</span>
    </div>
    <div *ngFor="let suggestion of suggestions" 
         class="suggestion-item"
         (click)="selectSuggestion(suggestion)">
      <div class="main-text">{{ suggestion.displayText }}</div>
      <div class="sub-text">{{ suggestion.fullDisplayName }}</div>
      <div class="coordinates">
        {{ suggestion.coordinates.latitude.toFixed(4) }}, 
        {{ suggestion.coordinates.longitude.toFixed(4) }}
      </div>
    </div>
  </div>
</ng-template>
```

### Multiple Search Inputs

Connect multiple search inputs to the same map:

```html
<!-- Primary search -->
<input 
  type="text" 
  ngOsmSearchInput
  [connectedMapId]="'shared-map'"
  placeholder="Primary search...">

<!-- Secondary search -->
<input 
  type="text" 
  ngOsmSearchInput
  [connectedMapId]="'shared-map'"
  placeholder="Secondary search...">

<!-- Shared map -->
<ng-osm-map [mapId]="'shared-map'" [height]="400"></ng-osm-map>
```

## API Reference

### NgOsmSearchInputDirective Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `connectedMapId` | `string` | `undefined` | ID of the map to connect to |
| `enableAutocomplete` | `boolean` | `true` | Enable autocomplete functionality |
| `debounceMs` | `number` | `300` | Debounce time for autocomplete requests |
| `maxResults` | `number` | `5` | Maximum number of autocomplete results |
| `minQueryLength` | `number` | `2` | Minimum query length to trigger autocomplete |
| `placeholder` | `string` | `'Search location...'` | Input placeholder text |
| `autoFocus` | `boolean` | `false` | Auto-focus the input on load |
| `showSuggestionsDropdown` | `boolean` | `true` | Show default suggestions dropdown |
| `dropdownContainer` | `string \| HTMLElement` | `undefined` | Custom container for dropdown |
| `customSearchTemplate` | `TemplateRef<AutocompleteSearchContext>` | `undefined` | Custom template for autocomplete |

### NgOsmSearchInputDirective Outputs

| Output | Type | Description |
|--------|------|-------------|
| `search` | `EventEmitter<string>` | Emitted when search is triggered |
| `suggestionSelected` | `EventEmitter<AutocompleteSuggestion>` | Emitted when a suggestion is selected |
| `autocompleteResults` | `EventEmitter<AutocompleteSuggestion[]>` | Emitted when autocomplete results are received |
| `inputChange` | `EventEmitter<string>` | Emitted when input value changes |

### NgOsmMapComponent/Directive

The map component now accepts a `mapId` input:

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `mapId` | `string` | `auto-generated` | Unique identifier for the map instance |

### AutocompleteSearchContext (Template Context)

When using `customSearchTemplate`, the template receives this context:

```typescript
interface AutocompleteSearchContext {
  $implicit: AutocompleteSuggestion[];  // Array of suggestions
  query: string;                        // Current search query
  search: (query: string) => void;      // Function to trigger search
  selectSuggestion: (suggestion: AutocompleteSuggestion) => void;  // Function to select suggestion
  clearSuggestions: () => void;         // Function to clear suggestions
  loading: boolean;                     // Loading state
}
```

## Styling

### Default Dropdown Styling

The default autocomplete dropdown has the class `ng-osm-autocomplete-dropdown`. You can customize it:

```css
.ng-osm-autocomplete-dropdown {
  /* Your custom styles */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.ng-osm-autocomplete-item {
  /* Individual suggestion item styles */
  padding: 12px 16px;
}

.ng-osm-autocomplete-item:hover {
  background-color: #f8f9fa;
}
```

### Custom Template Styling

When using custom templates, you have full control over the styling:

```css
.custom-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}
```

## Migration from Previous Version

If you were using the previous DOM query-based approach:

### Before (Old Method)
```typescript
// Old approach using DOM queries
mapOptions = {
  searchInput: {
    enableExternalBinding: true,
    inputElement: '#search-input',
    showSuggestionsDropdown: true
  }
};
```

```html
<input id="search-input" type="text" placeholder="Search...">
<ng-osm-map [mapOptions]="mapOptions"></ng-osm-map>
```

### After (New Method)
```typescript
// New approach using directive
// No special configuration needed
```

```html
<input ngOsmSearchInput [connectedMapId]="'my-map'" placeholder="Search...">
<ng-osm-map [mapId]="'my-map'"></ng-osm-map>
```

## Benefits of the New Approach

1. **Type Safety**: Full TypeScript support with proper type checking
2. **Angular Best Practices**: Uses Angular dependency injection instead of DOM queries
3. **Better Performance**: More efficient change detection and updates  
4. **Cleaner Code**: Simpler configuration and usage
5. **Multiple Inputs**: Easy support for multiple search inputs per map
6. **Custom Templates**: Full flexibility with Angular templates
7. **Reactive**: Automatic synchronization between search inputs and map selections
