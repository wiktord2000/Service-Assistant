import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSelectInputComponent } from './service-select-input.component';

describe('ServiceSelectInputComponent', () => {
  let component: ServiceSelectInputComponent;
  let fixture: ComponentFixture<ServiceSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceSelectInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
