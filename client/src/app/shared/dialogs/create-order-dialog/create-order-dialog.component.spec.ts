import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderDialogComponent } from './create-order-dialog.component';

describe('CreateOrderDialogComponent', () => {
  let component: CreateOrderDialogComponent;
  let fixture: ComponentFixture<CreateOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
