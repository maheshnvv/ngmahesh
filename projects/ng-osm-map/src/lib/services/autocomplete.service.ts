import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AutocompleteSuggestion, GeocodingResult } from '../models/map-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private readonly nominatimBaseUrl = 'https://nominatim.openstreetmap.org/search';
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  /**
   * Get autocomplete suggestions for a search query
   */
  getSuggestions(query: string, maxResults: number = 5): Observable<AutocompleteSuggestion[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    const params = {
      q: query,
      format: 'json',
      limit: maxResults.toString(),
      addressdetails: '1',
      extratags: '1',
      namedetails: '1'
    };

    return this.http.get<GeocodingResult[]>(this.nominatimBaseUrl, { params }).pipe(
      map(results => this.mapToAutocompleteSuggestions(results)),
      catchError(error => {
        console.error('Autocomplete error:', error);
        return of([]);
      })
    );
  }

  /**
   * Create a debounced search observable
   */
  createDebouncedSearch(debounceTimeMs: number = 300, maxResults: number = 5): Observable<AutocompleteSuggestion[]> {
    return this.searchSubject.pipe(
      debounceTime(debounceTimeMs),
      distinctUntilChanged(),
      switchMap((query: string) => this.getSuggestions(query, maxResults))
    );
  }

  /**
   * Trigger a search with debouncing
   */
  search(query: string): void {
    this.searchSubject.next(query);
  }

  /**
   * Map geocoding results to autocomplete suggestions
   */
  private mapToAutocompleteSuggestions(results: GeocodingResult[]): AutocompleteSuggestion[] {
    return results.map(result => {
      // Create a shorter display text
      const displayText = this.createDisplayText(result);

      return {
        displayText,
        fullDisplayName: result.display_name,
        coordinates: {
          latitude: parseFloat(String(result.lat)),
          longitude: parseFloat(String(result.lon))
        },
        address: result.address,
        originalResult: result
      };
    });
  }

  /**
   * Create a concise display text for autocomplete suggestions
   */
  private createDisplayText(result: GeocodingResult): string {
    const parts: string[] = [];

    if (result.address) {
      const addr = result.address;

      // Add road/street
      if (addr.road) parts.push(addr.road);
      else if (addr.house_number) parts.push(addr.house_number);

      // Add city
      if (addr.city) parts.push(addr.city);
      else if (addr.postcode) parts.push(addr.postcode);

      // Add state/country
      if (addr.state) parts.push(addr.state);
      if (addr.country && parts.length < 3) parts.push(addr.country);
    }

    // Fallback to parts of display_name if address parsing didn't work well
    if (parts.length === 0) {
      const displayParts = result.display_name.split(', ');
      parts.push(...displayParts.slice(0, 3));
    }

    return parts.join(', ');
  }

  /**
   * Format suggestion for display in dropdown
   */
  formatSuggestion(suggestion: AutocompleteSuggestion): string {
    return suggestion.displayText;
  }

  /**
   * Get detailed location info for a suggestion
   */
  getLocationDetails(suggestion: AutocompleteSuggestion): string {
    return suggestion.fullDisplayName;
  }
}
