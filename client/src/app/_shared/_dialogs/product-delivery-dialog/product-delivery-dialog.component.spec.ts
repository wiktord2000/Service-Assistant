import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeliveryDialogComponent } from './product-delivery-dialog.component';

describe('ProductDeliveryDialogComponent', () => {
  let component: ProductDeliveryDialogComponent;
  let fixture: ComponentFixture<ProductDeliveryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDeliveryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDeliveryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
