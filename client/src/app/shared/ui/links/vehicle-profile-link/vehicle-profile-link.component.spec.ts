import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleProfileLinkComponent } from './vehicle-profile-link.component';

describe('VehicleProfileLinkComponent', () => {
  let component: VehicleProfileLinkComponent;
  let fixture: ComponentFixture<VehicleProfileLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleProfileLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
