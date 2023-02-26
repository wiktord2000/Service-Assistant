import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectInputComponent } from './product-select-input.component';

describe('ProductSelectInputComponent', () => {
  let component: ProductSelectInputComponent;
  let fixture: ComponentFixture<ProductSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSelectInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
