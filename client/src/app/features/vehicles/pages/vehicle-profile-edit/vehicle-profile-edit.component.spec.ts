import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleProfileEditComponent } from './vehicle-profile-edit.component';

describe('VehicleProfileEditComponent', () => {
  let component: VehicleProfileEditComponent;
  let fixture: ComponentFixture<VehicleProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleProfileEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
