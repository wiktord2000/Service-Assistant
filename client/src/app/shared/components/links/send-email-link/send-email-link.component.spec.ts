import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailLinkComponent } from './send-email-link.component';

describe('SendEmailLinkComponent', () => {
  let component: SendEmailLinkComponent;
  let fixture: ComponentFixture<SendEmailLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendEmailLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
