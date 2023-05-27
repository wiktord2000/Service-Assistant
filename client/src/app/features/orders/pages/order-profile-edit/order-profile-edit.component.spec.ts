import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProfileEditComponent } from './order-profile-edit.component';

describe('OrderProfileEditComponent', () => {
  let component: OrderProfileEditComponent;
  let fixture: ComponentFixture<OrderProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderProfileEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
