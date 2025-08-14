import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ng-osm-search-input-docs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ng-osm-search-input-docs.component.html',
  styleUrl: './ng-osm-search-input-docs.component.scss'
})
export class NgOsmSearchInputDocsComponent {
  title = 'NgOsmSearchInput Directive Documentation';
}
