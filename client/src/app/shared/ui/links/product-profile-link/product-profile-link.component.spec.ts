import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfileLinkComponent } from './product-profile-link.component';

describe('ProductProfileLinkComponent', () => {
  let component: ProductProfileLinkComponent;
  let fixture: ComponentFixture<ProductProfileLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductProfileLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
