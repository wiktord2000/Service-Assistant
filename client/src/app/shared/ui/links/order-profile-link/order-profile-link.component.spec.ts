import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProfileLinkComponent } from './order-profile-link.component';

describe('OrderProfileLinkComponent', () => {
  let component: OrderProfileLinkComponent;
  let fixture: ComponentFixture<OrderProfileLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderProfileLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
