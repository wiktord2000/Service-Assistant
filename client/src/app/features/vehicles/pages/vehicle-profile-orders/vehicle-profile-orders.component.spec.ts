import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleProfileOrdersComponent } from './vehicle-profile-orders.component';

describe('VehicleProfileOrdersComponent', () => {
  let component: VehicleProfileOrdersComponent;
  let fixture: ComponentFixture<VehicleProfileOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleProfileOrdersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleProfileOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
