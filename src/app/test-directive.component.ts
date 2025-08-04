import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOsmSearchInputDirective } from '../../projects/ng-osm-map/src/lib/directives/ng-osm-search-input.directive';

@Component({
  selector: 'app-test-directive',
  standalone: true,
  imports: [CommonModule, NgOsmSearchInputDirective],
  template: `
    <div>
      <h3>Test Directive</h3>
      <input
        type="text"
        ngOsmSearchInput
        [connectedMapId]="'test-map'"
        [enableAutocomplete]="true"
        placeholder="Test search input..."
        (search)="onSearch($event)">
    </div>
  `
})
export class TestDirectiveComponent {
  onSearch(query: string): void {
    console.log('Search:', query);
  }
}
