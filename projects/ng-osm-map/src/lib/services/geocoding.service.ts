import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, concatMap, take, defaultIfEmpty } from 'rxjs/operators';
import { LocationObject, GeocodingResult } from '../models/map-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly nominatimBaseUrl = 'https://nominatim.openstreetmap.org/search';
  private negativeCache: Set<string> = new Set(); // Cache failed query strings (normalized)

  constructor(private http: HttpClient) {}

  /**
   * Resolve a location object to coordinates using an enriched fallback ladder.
   *
   * Fallback ladder (stop at first success):
   * 1. Full: addressLine1 + addressLine2 + city + state + zip + country
   * 2. Drop addressLine2: addressLine1 + city + state + zip + country
   * 3. Drop addressLine1: addressLine2 + city + state + zip + country
   * 4. Drop both address lines: city + state + zip + country
   * 5. City + State + Country
   * 6. City + Country
   * 7. ZIP + State + Country
   * 8. ZIP + Country
   * 9. State + Country
   * 10. City only
   * 11. State only
   * 12. Country only
   *
   * Rules:
   * - Provided non-zero coordinates short-circuit unless they are (0,0) with address data present.
   * - 0 / undefined / empty / whitespace fields are ignored.
   * - Identical or empty assembled queries are skipped.
   * - Negative cache prevents re-query of known failing normalized strings within the session.
   */
  resolveLocation(location: LocationObject): Observable<{ lat: number; lng: number } | null> {
    const hasProvidedCoords = location.latitude !== undefined && location.longitude !== undefined;
    const isZeroPair = hasProvidedCoords && Number(location.latitude) === 0 && Number(location.longitude) === 0;

    const anyAddressField = [location.address, location.addressLine2, location.city, location.state, location.zipCode, location.country]
      .some(v => !!(v && String(v).trim().length));

    if (hasProvidedCoords && (!isZeroPair || !anyAddressField)) {
      return of({ lat: Number(location.latitude), lng: Number(location.longitude) });
    }

    const norm = (v?: string | null) => (v && v.trim().length ? v.trim() : '');
    const line1 = norm(location.address);
    const line2 = norm(location.addressLine2);
    const city = norm(location.city);
    const state = norm(location.state);
    const zip = norm(location.zipCode);
    const country = norm(location.country);

    const ladder: string[][] = [];

    // 1 Full
    ladder.push([line1, line2, city, state, zip, country]);
    // 2 Drop line2
    ladder.push([line1, city, state, zip, country]);
    // 3 Drop line1, keep line2
    ladder.push([line2, city, state, zip, country]);
    // 4 Drop both address lines
    ladder.push([city, state, zip, country]);
    // 5 City + State + Country
    ladder.push([city, state, country]);
    // 6 City + Country
    ladder.push([city, country]);
    // 7 ZIP + State + Country
    ladder.push([zip, state, country]);
    // 8 ZIP + Country
    ladder.push([zip, country]);
    // 9 State + Country
    ladder.push([state, country]);
    // 10 City only (if not already represented exactly)
    ladder.push([city]);
    // 11 State only
    ladder.push([state]);
    // 12 Country only
    ladder.push([country]);
    // 11 Country only
    ladder.push([country]);

    const seen = new Set<string>();
    const attempts: string[] = [];

    for (const parts of ladder) {
      const filtered = parts.filter(p => p && p.length);
      if (filtered.length === 0) continue;
      const assembled = filtered.join(', ');
      const key = assembled.toLowerCase();
      if (!assembled.trim().length || seen.has(key)) continue;
      seen.add(key);
      attempts.push(assembled);
    }

    if (attempts.length === 0) return of(null);

    return from(attempts).pipe(
      concatMap(query => {
        const key = query.toLowerCase();
        if (this.negativeCache.has(key)) {
          return of(null);
        }
        return this.geocodeAddress(query).pipe(
            map(result => {
              if (!result) {
                this.negativeCache.add(key);
                return null;
              }
              if ((result.lat === 0 && result.lng === 0) && attempts.length > 1) {
                // Treat (0,0) as invalid unless it's the only attempt
                this.negativeCache.add(key);
                return null;
              }
              return result;
            })
        );
      }),
      concatMap(r => r ? of(r) : of()),
      take(1),
      defaultIfEmpty(null)
    );
  }

  /** Geocode an address string via Nominatim */
  private geocodeAddress(address: string): Observable<{ lat: number; lng: number } | null> {
    const params = { q: address, format: 'json', limit: '1', addressdetails: '1' };
    return this.http.get<GeocodingResult[]>(this.nominatimBaseUrl, { params }).pipe(
      map(results => {
        if (results && results.length) {
          const r = results[0];
            const lat = parseFloat(String(r.lat));
            const lon = parseFloat(String(r.lon));
            if (isNaN(lat) || isNaN(lon)) return null;
            return { lat, lng: lon };
        }
        return null;
      }),
      catchError(err => {
        console.error('Geocoding error:', err);
        return of(null);
      })
    );
  }

  /** Reverse geocode coordinates to a display name */
  reverseGeocode(lat: number, lng: number): Observable<string | null> {
    const params = { lat: lat.toString(), lon: lng.toString(), format: 'json', zoom: '18', addressdetails: '1' };
    const reverseUrl = 'https://nominatim.openstreetmap.org/reverse';
    return this.http.get<GeocodingResult>(reverseUrl, { params }).pipe(
      map(result => result?.display_name || null),
      catchError(err => {
        console.error('Reverse geocoding error:', err);
        return of(null);
      })
    );
  }
}
