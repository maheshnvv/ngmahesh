import { Injectable } from '@angular/core';
import { TileLayerConfig, TileLayerType } from '../models/map-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TileLayerService {

  /**
   * Predefined tile layer configurations
   */
  private readonly predefinedLayers: { [key in TileLayerType]: TileLayerConfig } = {
    openstreetmap: {
      type: 'openstreetmap',
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    satellite: {
      type: 'satellite',
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      labelUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
      attribution: '© <a href="https://www.esri.com/">Esri</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      subdomains: ['a', 'b', 'c', 'd']
    },
    hybrid: {
      type: 'hybrid',
      name: 'Hybrid',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      labelUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
      attribution: '© <a href="https://www.esri.com/">Esri</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: ['a', 'b', 'c', 'd']
    },
    terrain: {
      type: 'terrain',
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      maxZoom: 17,
      subdomains: ['a', 'b', 'c']
    },
    dark: {
      type: 'dark',
      name: 'Dark',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
      subdomains: ['a', 'b', 'c', 'd']
    },
    light: {
      type: 'light',
      name: 'Light',
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
      subdomains: ['a', 'b', 'c', 'd']
    },
    watercolor: {
      type: 'watercolor',
      name: 'Watercolor',
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 16,
      subdomains: ['a', 'b', 'c', 'd']
    },
    toner: {
      type: 'toner',
      name: 'Toner',
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20,
      subdomains: ['a', 'b', 'c', 'd']
    }
  };

  /**
   * Get tile layer configuration by type
   */
  getTileLayerConfig(type: TileLayerType): TileLayerConfig {
    return this.predefinedLayers[type];
  }

  /**
   * Get all available tile layer configurations
   */
  getAllTileLayerConfigs(): TileLayerConfig[] {
    return Object.values(this.predefinedLayers);
  }

  /**
   * Get default tile layers for layer control
   */
  getDefaultTileLayersForControl(): TileLayerConfig[] {
    return [
      this.predefinedLayers.openstreetmap,
      this.predefinedLayers.satellite,
      this.predefinedLayers.hybrid,
      this.predefinedLayers.terrain,
      this.predefinedLayers.dark,
      this.predefinedLayers.light
    ];
  }

  /**
   * Check if a tile layer type is valid
   */
  isValidTileLayerType(type: string): type is TileLayerType {
    return type in this.predefinedLayers;
  }

  /**
   * Get tile layer URL for custom configuration
   */
  getTileLayerUrl(type: TileLayerType): string {
    return this.predefinedLayers[type].url;
  }

  /**
   * Get attribution for tile layer type
   */
  getAttribution(type: TileLayerType): string {
    return this.predefinedLayers[type].attribution;
  }

  /**
   * Create custom tile layer configuration
   */
  createCustomTileLayer(
    type: TileLayerType,
    name: string,
    url: string,
    attribution: string,
    options?: Partial<TileLayerConfig>
  ): TileLayerConfig {
    return {
      type,
      name,
      url,
      attribution,
      maxZoom: 19,
      ...options
    };
  }
}
