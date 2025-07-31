import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./homepage/homepage.component').then(m => m.HomepageComponent)
  },
  {
    path: 'demo/ng-osm-map',
    loadComponent: () => import('./demo/ng-osm-map/ng-osm-map-demo.component').then(m => m.NgOsmMapDemoComponent)
  },
  {
    path: 'docs/ng-osm-map',
    loadComponent: () => import('./docs/ng-osm-map/ng-osm-map-docs.component').then(m => m.NgOsmMapDocsComponent)
  },
  {
    path: 'ng-osm-map/demo',
    redirectTo: 'demo/ng-osm-map'
  },
  {
    path: 'ng-osm-map/docs',
    redirectTo: 'docs/ng-osm-map'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
