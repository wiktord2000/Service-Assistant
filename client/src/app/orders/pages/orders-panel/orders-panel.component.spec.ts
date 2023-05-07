import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersPanelComponent } from './orders-panel.component';

describe('OrdersPanelComponent', () => {
  let component: OrdersPanelComponent;
  let fixture: ComponentFixture<OrdersPanelComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersPanelComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [{ provide: MyService, useValue: {} }],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // myService = TestBed.inject(MyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
