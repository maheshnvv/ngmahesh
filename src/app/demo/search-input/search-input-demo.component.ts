import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOsmMapComponent, NgOsmSearchInputDirective, PinObject, LocationObject, MapClickEvent, SearchResult, AutocompleteSuggestion, AutocompleteSearchContext } from '../../../../projects/ng-osm-map/src/public-api';

@Component({
  selector: 'app-search-input-demo',
  standalone: true,
  imports: [NgOsmMapComponent, NgOsmSearchInputDirective, CommonModule],
  template: `
    <div class="demo-container">
      <h2>Search Input Directive Demo</h2>

      <div class="demo-section">
        <h3>Basic Search Input</h3>
        <p>A basic search input connected to the map below:</p>

        <div class="search-container">
          <input
            type="text"
            ngOsmSearchInput
            [connectedMapId]="mapId"
            [enableAutocomplete]="true"
            [showSuggestionsDropdown]="true"
            placeholder="Search for a location..."
            class="search-input"
            (search)="onSearch($event)"
            (suggestionSelected)="onSuggestionSelected($event)"
            (autocompleteResults)="onAutocompleteResults($event)">
        </div>
      </div>

      <div class="demo-section">
        <h3>Custom Template Search Input</h3>
        <p>A search input with custom template for autocomplete suggestions:</p>

        <div class="search-container">
          <input
            type="text"
            ngOsmSearchInput
            [connectedMapId]="mapId"
            [enableAutocomplete]="true"
            [customSearchTemplate]="customAutocompleteTemplate"
            placeholder="Search with custom template..."
            class="search-input"
            (search)="onSearch($event)"
            (suggestionSelected)="onSuggestionSelected($event)">
        </div>
      </div>

      <div class="demo-section">
        <h3>Multiple Search Inputs</h3>
        <p>Multiple search inputs connected to the same map:</p>

        <div class="multi-search-container">
          <input
            type="text"
            ngOsmSearchInput
            [connectedMapId]="mapId"
            [enableAutocomplete]="true"
            [showSuggestionsDropdown]="true"
            placeholder="Search input 1..."
            class="search-input"
            (search)="onSearch($event)">

          <input
            type="text"
            ngOsmSearchInput
            [connectedMapId]="mapId"
            [enableAutocomplete]="true"
            [showSuggestionsDropdown]="true"
            placeholder="Search input 2..."
            class="search-input"
            (search)="onSearch($event)">
        </div>
      </div>

      <div class="demo-section">
        <h3>Connected Map</h3>
        <ng-osm-map
          [mapId]="mapId"
          [pins]="pins"
          [mapOptions]="mapOptions"
          [height]="400"
          [width]="'100%'"
          (mapClick)="onMapClick($event)"
          (searchResult)="onSearchResult($event)">
        </ng-osm-map>
      </div>

      <div class="demo-section">
        <h3>Event Log</h3>
        <div class="event-log">
          <div *ngFor="let event of eventLog" class="event-item">
            <strong>{{ event.type }}:</strong> {{ event.message }}
            <small>{{ event.timestamp | date:'HH:mm:ss' }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Autocomplete Template -->
    <ng-template #customAutocompleteTemplate let-suggestions let-query="query" let-selectSuggestion="selectSuggestion" let-loading="loading">
      <div class="custom-autocomplete-dropdown" *ngIf="suggestions.length > 0 || loading">
        <div *ngIf="loading" class="loading-item">
          <div class="spinner"></div>
          <span>Searching...</span>
        </div>
        <div *ngFor="let suggestion of suggestions"
             class="custom-suggestion-item"
             (click)="selectSuggestion(suggestion)">
          <div class="suggestion-main">{{ suggestion.displayText }}</div>
          <div class="suggestion-details">{{ suggestion.fullDisplayName }}</div>
          <div class="suggestion-coords">
            {{ suggestion.coordinates.latitude.toFixed(4) }}, {{ suggestion.coordinates.longitude.toFixed(4) }}
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .demo-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .demo-section {
      margin-bottom: 30px;
    }

    .search-container {
      position: relative;
      margin-bottom: 20px;
    }

    .multi-search-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
    }

    .search-input:focus {
      outline: none;
      border-color: #007bff;
    }

    .custom-autocomplete-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 300px;
      overflow-y: auto;
      z-index: 1000;
    }

    .loading-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      color: #666;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .custom-suggestion-item {
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s;
    }

    .custom-suggestion-item:hover {
      background-color: #f8f9fa;
    }

    .custom-suggestion-item:last-child {
      border-bottom: none;
    }

    .suggestion-main {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .suggestion-details {
      font-size: 14px;
      color: #666;
      margin-bottom: 2px;
    }

    .suggestion-coords {
      font-size: 12px;
      color: #999;
      font-family: monospace;
    }

    .event-log {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      background-color: #f9f9f9;
    }

    .event-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }

    .event-item:last-child {
      border-bottom: none;
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
    }

    h3 {
      color: #555;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
    }
  `]
})
export class SearchInputDemoComponent {
  @ViewChild('customAutocompleteTemplate', { static: true }) customAutocompleteTemplate!: TemplateRef<AutocompleteSearchContext>;

  mapId = 'search-demo-map';

  pins: PinObject[] = [];

  mapOptions = {
    zoom: 10,
    enableClickSelect: true,
    selection: {
      multiSelect: false,
      createPinsForSelections: true,
      selectionPin: {
        color: '#ff6b6b',
        title: 'Selected Location',
        draggable: true
      }
    }
  };

  eventLog: Array<{type: string, message: string, timestamp: Date}> = [];

  onSearch(query: string): void {
    this.addToEventLog('Search', `Searching for: "${query}"`);
  }

  onSuggestionSelected(suggestion: AutocompleteSuggestion): void {
    this.addToEventLog('Suggestion Selected', `Selected: ${suggestion.displayText}`);
  }

  onAutocompleteResults(suggestions: AutocompleteSuggestion[]): void {
    this.addToEventLog('Autocomplete', `Got ${suggestions.length} suggestions`);
  }

  onMapClick(event: MapClickEvent): void {
    this.addToEventLog('Map Click', `Clicked at: ${event.coordinates.latitude.toFixed(4)}, ${event.coordinates.longitude.toFixed(4)}`);
  }

  onSearchResult(result: SearchResult): void {
    this.addToEventLog('Search Result', `Found: ${result.displayName}`);
  }

  private addToEventLog(type: string, message: string): void {
    this.eventLog.unshift({
      type,
      message,
      timestamp: new Date()
    });

    // Keep only last 10 events
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}
