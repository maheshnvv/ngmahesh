import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AutocompleteSuggestion } from '../models/map-interfaces';

export interface SearchInputMapConnection {
  searchInputId: string;
  mapId: string;
}

export interface SearchEvent {
  query: string;
  searchInputId: string;
}

export interface SuggestionSelectedEvent {
  suggestion: AutocompleteSuggestion;
  searchInputId: string;
}

export interface LocationSelectedEvent {
  displayValue: string;
  coordinates: { latitude: number; longitude: number };
  mapId: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgOsmSearchConnectionService {
  private searchSubject = new Subject<SearchEvent>();
  private suggestionSelectedSubject = new Subject<SuggestionSelectedEvent>();
  private locationSelectedSubject = new Subject<LocationSelectedEvent>();
  private connections = new Map<string, string>(); // searchInputId -> mapId
  private reverseConnections = new Map<string, string[]>(); // mapId -> searchInputIds[]

  /**
   * Observable for search events from search input directives
   */
  get searchEvents$(): Observable<SearchEvent> {
    return this.searchSubject.asObservable();
  }

  /**
   * Observable for suggestion selection events from search input directives
   */
  get suggestionSelectedEvents$(): Observable<SuggestionSelectedEvent> {
    return this.suggestionSelectedSubject.asObservable();
  }

  /**
   * Observable for location selection events from map directives
   */
  get locationSelectedEvents$(): Observable<LocationSelectedEvent> {
    return this.locationSelectedSubject.asObservable();
  }

  /**
   * Connect a search input directive to a map directive
   */
  connectSearchInputToMap(searchInputId: string, mapId: string): void {
    // Remove any existing connection for this search input
    this.disconnectSearchInput(searchInputId);

    // Create new connection
    this.connections.set(searchInputId, mapId);

    // Update reverse connections
    if (!this.reverseConnections.has(mapId)) {
      this.reverseConnections.set(mapId, []);
    }
    this.reverseConnections.get(mapId)!.push(searchInputId);
  }

  /**
   * Disconnect a search input directive
   */
  disconnectSearchInput(searchInputId: string): void {
    const mapId = this.connections.get(searchInputId);
    if (mapId) {
      // Remove from connections
      this.connections.delete(searchInputId);

      // Update reverse connections
      const searchInputs = this.reverseConnections.get(mapId);
      if (searchInputs) {
        const index = searchInputs.indexOf(searchInputId);
        if (index > -1) {
          searchInputs.splice(index, 1);
        }
        if (searchInputs.length === 0) {
          this.reverseConnections.delete(mapId);
        }
      }
    }
  }

  /**
   * Disconnect a map directive (removes all its search input connections)
   */
  disconnectMap(mapId: string): void {
    const searchInputs = this.reverseConnections.get(mapId);
    if (searchInputs) {
      // Remove all connections for this map
      searchInputs.forEach(searchInputId => {
        this.connections.delete(searchInputId);
      });
      this.reverseConnections.delete(mapId);
    }
  }

  /**
   * Get the map ID connected to a search input
   */
  getConnectedMap(searchInputId: string): string | undefined {
    return this.connections.get(searchInputId);
  }

  /**
   * Get all search input IDs connected to a map
   */
  getConnectedSearchInputs(mapId: string): string[] {
    return this.reverseConnections.get(mapId) || [];
  }

  /**
   * Check if a search input is connected to a specific map
   */
  isConnected(searchInputId: string, mapId: string): boolean {
    return this.connections.get(searchInputId) === mapId;
  }

  /**
   * Emit a search event from a search input directive
   */
  emitSearchEvent(query: string, searchInputId: string): void {
    this.searchSubject.next({ query, searchInputId });
  }

  /**
   * Emit a suggestion selected event from a search input directive
   */
  emitSuggestionSelectedEvent(suggestion: AutocompleteSuggestion, searchInputId: string): void {
    this.suggestionSelectedSubject.next({ suggestion, searchInputId });
  }

  /**
   * Emit a location selected event from a map directive
   */
  emitLocationSelectedEvent(displayValue: string, coordinates: { latitude: number; longitude: number }, mapId: string): void {
    this.locationSelectedSubject.next({ displayValue, coordinates, mapId });
  }

  /**
   * Get all active connections
   */
  getAllConnections(): SearchInputMapConnection[] {
    const connections: SearchInputMapConnection[] = [];
    this.connections.forEach((mapId, searchInputId) => {
      connections.push({ searchInputId, mapId });
    });
    return connections;
  }
}
