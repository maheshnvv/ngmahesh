import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocationObject, GeocodingResult } from '../models/map-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly nominatimBaseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  /**
   * Resolve a location object to coordinates
   */
  resolveLocation(location: LocationObject): Observable<{ lat: number; lng: number } | null> {
    // If coordinates are already provided, return them
    if (location.latitude !== undefined && location.longitude !== undefined) {
      return of({ lat: location.latitude, lng: location.longitude });
    }

    // Build address string for geocoding
    const addressParts: string[] = [];
    if (location.address) addressParts.push(location.address);
    if (location.city) addressParts.push(location.city);
    if (location.state) addressParts.push(location.state);
    if (location.country) addressParts.push(location.country);
    if (location.zipCode) addressParts.push(location.zipCode);

    if (addressParts.length === 0) {
      return of(null);
    }

    const addressString = addressParts.join(', ');
    return this.geocodeAddress(addressString);
  }

  /**
   * Geocode an address string using OpenStreetMap Nominatim
   */
  private geocodeAddress(address: string): Observable<{ lat: number; lng: number } | null> {
    const params = {
      q: address,
      format: 'json',
      limit: '1',
      addressdetails: '1'
    };

    return this.http.get<GeocodingResult[]>(this.nominatimBaseUrl, { params }).pipe(
      map(results => {
        if (results && results.length > 0) {
          const result = results[0];
          return { lat: parseFloat(String(result.lat)), lng: parseFloat(String(result.lon)) };
        }
        return null;
      }),
      catchError(error => {
        console.error('Geocoding error:', error);
        return of(null);
      })
    );
  }

  /**
   * Reverse geocode coordinates to address
   */
  reverseGeocode(lat: number, lng: number): Observable<string | null> {
    const params = {
      lat: lat.toString(),
      lon: lng.toString(),
      format: 'json',
      zoom: '18',
      addressdetails: '1'
    };

    const reverseUrl = 'https://nominatim.openstreetmap.org/reverse';

    return this.http.get<GeocodingResult>(reverseUrl, { params }).pipe(
      map(result => {
        return result?.display_name || null;
      }),
      catchError(error => {
        console.error('Reverse geocoding error:', error);
        return of(null);
      })
    );
  }
}
