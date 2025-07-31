import { TestBed } from '@angular/core/testing';

import { NgOsmMapService } from './ng-osm-map.service';

describe('NgOsmMapService', () => {
  let service: NgOsmMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOsmMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
