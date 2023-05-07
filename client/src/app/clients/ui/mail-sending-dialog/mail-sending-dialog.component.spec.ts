import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSendingDialogComponent } from './mail-sending-dialog.component';

describe('MailSendingDialogComponent', () => {
  let component: MailSendingDialogComponent;
  let fixture: ComponentFixture<MailSendingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailSendingDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSendingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
