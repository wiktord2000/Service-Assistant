import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailLinkComponent } from './send-email-link.component';
import { SendEmailLinkModule } from './send-email-link.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BasicLinkComponent } from '../basic-link/basic-link.component';
import { MatDialog } from '@angular/material/dialog';
import { MailSendingDialogComponent } from 'src/app/features/clients/ui/mail-sending-dialog/mail-sending-dialog.component';

describe('SendEmailLinkComponent', () => {
  let component: SendEmailLinkComponent;
  let fixture: ComponentFixture<SendEmailLinkComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj(MatDialog, ['open']);

    await TestBed.configureTestingModule({
      imports: [SendEmailLinkModule, RouterTestingModule],
      providers: [{ provide: MatDialog, useValue: mockMatDialog }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app-basic-link component with correct inputs', () => {
    const email = 'test@example.com';
    const customColor = 'red';
    const iconName = 'forward_to_inbox';
    const tooltipPostion = 'right';

    component.email = email;
    component.customColor = customColor;
    fixture.detectChanges();

    const appBasicLinkDebugElement = fixture.debugElement.query(By.css('app-basic-link'));
    const appBasicLinkComponent = appBasicLinkDebugElement.componentInstance as BasicLinkComponent;

    expect(appBasicLinkComponent.tooltipText).toBe(email);
    expect(appBasicLinkComponent.tooltipPosition).toBe(tooltipPostion);
    expect(appBasicLinkComponent.icon).toBe(iconName);
    expect(appBasicLinkComponent.displayText).toBe(email);
    expect(appBasicLinkComponent.customColor).toBe(customColor);
  });

  it('should call the "onEmailClick" when link is clicked', () => {
    const onEmailClickSpy = spyOn(component, 'onEmailClick');
    const appBasicLinkElement: HTMLElement = fixture.nativeElement.querySelector('app-basic-link');

    appBasicLinkElement.click();

    expect(onEmailClickSpy).toHaveBeenCalled();
  });

  it('should open the mail sending dialog when the link is clicked', () => {
    const email = 'test@example.com';
    component.email = email;

    fixture.detectChanges();

    const appBasicLinkElement: HTMLElement = fixture.nativeElement.querySelector('app-basic-link');
    appBasicLinkElement.click();

    expect(mockMatDialog.open).toHaveBeenCalledWith(MailSendingDialogComponent, {
      width: '1000px',
      data: { emails: [email] }
    });
  });

  it('should render "forward_to_inbox" icon', () => {
    const iconElement: HTMLElement = fixture.nativeElement.querySelector('.link-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toBe('forward_to_inbox');
  });
});
