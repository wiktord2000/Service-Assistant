import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductsTableComponent } from './order-products-table.component';

describe('OrderProductsTableComponent', () => {
  let component: OrderProductsTableComponent;
  let fixture: ComponentFixture<OrderProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderProductsTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
