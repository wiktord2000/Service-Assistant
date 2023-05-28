import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfileOrdersComponent } from './product-profile-orders.component';

describe('ProductProfileOrdersComponent', () => {
  let component: ProductProfileOrdersComponent;
  let fixture: ComponentFixture<ProductProfileOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductProfileOrdersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProfileOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
