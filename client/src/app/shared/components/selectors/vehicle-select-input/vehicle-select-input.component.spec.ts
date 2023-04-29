import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleSelectInputComponent } from './vehicle-select-input.component';

describe('VehicleSelectInputComponent', () => {
  let component: VehicleSelectInputComponent;
  let fixture: ComponentFixture<VehicleSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleSelectInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
