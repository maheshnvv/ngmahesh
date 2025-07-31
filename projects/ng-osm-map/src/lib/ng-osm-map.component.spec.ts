import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOsmMapComponent } from './ng-osm-map.component';

describe('NgOsmMapComponent', () => {
  let component: NgOsmMapComponent;
  let fixture: ComponentFixture<NgOsmMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgOsmMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgOsmMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
