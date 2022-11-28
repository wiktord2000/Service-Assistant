import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfileComponent } from './product-profile.component';

describe('ProductProfileComponent', () => {
  let component: ProductProfileComponent;
  let fixture: ComponentFixture<ProductProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
