import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderProfileComponent } from './order-profile.component';

describe('OrderProfileComponent', () => {
  let component: OrderProfileComponent;
  let fixture: ComponentFixture<OrderProfileComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderProfileComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [{ provide: MyService, useValue: {} }],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // myService = TestBed.inject(MyService);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(component).toBeTruthy();
    });
  });
});
