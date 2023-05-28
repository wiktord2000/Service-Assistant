import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfileEditComponent } from './product-profile-edit.component';

describe('ProductProfileEditComponent', () => {
  let component: ProductProfileEditComponent;
  let fixture: ComponentFixture<ProductProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductProfileEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
