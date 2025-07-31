import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeocodingService } from './services/geocoding.service';
import { LocationObject, PinObject, HighlightArea, MapOptions } from './models/map-interfaces';

@Injectable({
  providedIn: 'root'
})
export class NgOsmMapService {

  constructor(
    private http: HttpClient,
    private geocodingService: GeocodingService
  ) {}

  /**
   * Resolve a location to coordinates
   */
  resolveLocation(location: LocationObject): Observable<{ lat: number; lng: number } | null> {
    return this.geocodingService.resolveLocation(location);
  }

  /**
   * Reverse geocode coordinates to address
   */
  reverseGeocode(lat: number, lng: number): Observable<string | null> {
    return this.geocodingService.reverseGeocode(lat, lng);
  }

  /**
   * Get default map options
   */
  getDefaultMapOptions(): MapOptions {
    return {
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
  }

  /**
   * Validate pin object
   */
  validatePin(pin: PinObject): boolean {
    if (!pin.location) return false;

    const hasCoords = pin.location.latitude !== undefined && pin.location.longitude !== undefined;
    const hasAddress = pin.location.address || pin.location.city || pin.location.state || pin.location.country;

    return hasCoords || !!hasAddress;
  }

  /**
   * Validate highlight area
   */
  validateHighlightArea(area: HighlightArea): boolean {
    return area.boundary && area.boundary.length >= 3;
  }
}
