import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileVehiclesComponent } from './client-profile-vehicles.component';

describe('ClientProfileVehiclesComponent', () => {
  let component: ClientProfileVehiclesComponent;
  let fixture: ComponentFixture<ClientProfileVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileVehiclesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
