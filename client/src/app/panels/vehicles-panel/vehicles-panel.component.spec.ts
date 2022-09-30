import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesPanelComponent } from './vehicles-panel.component';

describe('VehiclesPanelComponent', () => {
  let component: VehiclesPanelComponent;
  let fixture: ComponentFixture<VehiclesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
