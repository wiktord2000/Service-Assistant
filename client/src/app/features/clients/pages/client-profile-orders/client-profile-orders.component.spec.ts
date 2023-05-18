import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileOrdersComponent } from './client-profile-orders.component';

describe('ClientProfileOrdersComponent', () => {
  let component: ClientProfileOrdersComponent;
  let fixture: ComponentFixture<ClientProfileOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProfileOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
