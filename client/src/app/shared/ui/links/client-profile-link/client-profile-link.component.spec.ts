import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileLinkComponent } from './client-profile-link.component';

describe('ClientProfileLinkComponent', () => {
  let component: ClientProfileLinkComponent;
  let fixture: ComponentFixture<ClientProfileLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
