import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfileOpinionComponent } from './product-profile-opinion.component';

describe('ProductProfileOpinionComponent', () => {
  let component: ProductProfileOpinionComponent;
  let fixture: ComponentFixture<ProductProfileOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductProfileOpinionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProfileOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
