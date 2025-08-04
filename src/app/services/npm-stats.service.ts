import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, catchError, of, map } from 'rxjs';

export interface LibraryConfig {
  name: string;
  npmPackage: string;
  version?: string; // Optional fallback version
}

export interface NpmStats {
  downloads: number;
  downloadsFormatted: string;
  version: string;
  packageName: string;
}

export interface NpmStatsState {
  stats: Map<string, NpmStats>;
  totalDownloads: number;
  isLoading: boolean;
  error: string | null;
}

interface NpmDownloadResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

interface NpmPackageResponse {
  'dist-tags': {
    latest: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NpmStatsService {
  private readonly DEFAULT_LIBRARIES: LibraryConfig[] = [
    {
      name: 'NgOsmMap',
      npmPackage: '@ngmahesh/ng-osm-map'
      // version is fetched from npm registry
    }
    // More libraries can be added here
  ];

  private statsSubject = new BehaviorSubject<NpmStatsState>({
    stats: new Map(),
    totalDownloads: 0,
    isLoading: false,
    error: null
  });

  public stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Fetch npm stats for all configured libraries
   */
  fetchAllStats(libraries?: LibraryConfig[]): void {
    const librariesToFetch = libraries || this.DEFAULT_LIBRARIES;
    
    this.updateState({ isLoading: true, error: null });

    const requests = librariesToFetch.map(library => {
      const downloadsUrl = `https://api.npmjs.org/downloads/point/last-month/${library.npmPackage}`;
      const packageUrl = `https://registry.npmjs.org/${library.npmPackage}`;
      
      return forkJoin({
        downloads: this.http.get<NpmDownloadResponse>(downloadsUrl).pipe(
          catchError(() => of({ downloads: 0, start: '', end: '', package: library.npmPackage }))
        ),
        packageInfo: this.http.get<NpmPackageResponse>(packageUrl).pipe(
          catchError(() => of({ 'dist-tags': { latest: library.version || '1.0.0' } }))
        ),
        libraryConfig: of(library)
      });
    });

    forkJoin(requests).subscribe({
      next: (results) => {
        const statsMap = new Map<string, NpmStats>();
        let totalDownloads = 0;

        results.forEach((result) => {
          const downloads = result.downloads.downloads || 0;
          const stats: NpmStats = {
            downloads: downloads,
            downloadsFormatted: this.formatDownloads(downloads),
            version: result.packageInfo['dist-tags'].latest,
            packageName: result.libraryConfig.npmPackage
          };
          
          statsMap.set(result.libraryConfig.npmPackage, stats);
          totalDownloads += downloads;
        });

        this.updateState({
          stats: statsMap,
          totalDownloads: totalDownloads,
          isLoading: false,
          error: null
        });
      },
      error: (error) => {
        console.error('Error fetching npm stats:', error);
        this.updateState({
          isLoading: false,
          error: 'Failed to fetch npm statistics'
        });
      }
    });
  }

  /**
   * Get stats for a specific library
   */
  getLibraryStats(packageName: string): Observable<NpmStats | null> {
    return this.stats$.pipe(
      map(state => state.stats.get(packageName) || null)
    );
  }

  /**
   * Get total downloads across all libraries
   */
  getTotalDownloads(): Observable<number> {
    return this.stats$.pipe(
      map(state => state.totalDownloads)
    );
  }

  /**
   * Get formatted total downloads
   */
  getTotalDownloadsFormatted(): Observable<string> {
    return this.stats$.pipe(
      map(state => {
        if (state.isLoading) return '...';
        return this.formatDownloads(state.totalDownloads);
      })
    );
  }

  /**
   * Get loading state
   */
  getLoadingState(): Observable<boolean> {
    return this.stats$.pipe(
      map(state => state.isLoading)
    );
  }

  /**
   * Get error state
   */
  getErrorState(): Observable<string | null> {
    return this.stats$.pipe(
      map(state => state.error)
    );
  }

  /**
   * Format download numbers for display
   */
  private formatDownloads(downloads: number): string {
    if (downloads >= 1000000) {
      return (downloads / 1000000).toFixed(1) + 'M';
    } else if (downloads >= 1000) {
      return (downloads / 1000).toFixed(1) + 'K';
    } else {
      return downloads.toString();
    }
  }

  /**
   * Update the internal state
   */
  private updateState(partialState: Partial<NpmStatsState>): void {
    const currentState = this.statsSubject.value;
    this.statsSubject.next({ ...currentState, ...partialState });
  }

  /**
   * Get the default library configuration
   */
  getDefaultLibraries(): LibraryConfig[] {
    return [...this.DEFAULT_LIBRARIES];
  }

  /**
   * Reset the service state
   */
  reset(): void {
    this.statsSubject.next({
      stats: new Map(),
      totalDownloads: 0,
      isLoading: false,
      error: null
    });
  }
}
