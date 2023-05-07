import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesTableComponent } from './vehicles-table.component';

describe('VehiclesTableComponent', () => {
  let component: VehiclesTableComponent;
  let fixture: ComponentFixture<VehiclesTableComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclesTableComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [{ provide: MyService, useValue: {} }],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // myService = TestBed.inject(MyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
