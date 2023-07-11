import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileLinkComponent } from './client-profile-link.component';
import {
  CLIENTS,
  CLIENT_OF_COMPANY_TYPE,
  CLIENT_OF_PERSON_TYPE
} from 'src/app/shared/utils/testing-data';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ClientProfileLinkComponent', () => {
  let component: ClientProfileLinkComponent;
  let fixture: ComponentFixture<ClientProfileLinkComponent>;
  let mockUtilsService: jasmine.SpyObj<UtilsService>; // Mock UtilsService

  beforeEach(async () => {
    // Create a mock UtilsService with desired methods
    mockUtilsService = jasmine.createSpyObj('UtilsService', ['clientToString']);

    await TestBed.configureTestingModule({
      declarations: [ClientProfileLinkComponent],
      providers: [{ provide: UtilsService, useValue: mockUtilsService }], // Register mocked service
      imports: [MatButtonModule, MatIconModule, MatTooltipModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the client profile link', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const label = 'Profile';
    component.client = client;
    component.label = label;
    component.clientName = client.companyName;
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    const labelElement = fixture.nativeElement.querySelector('.link-label');
    const iconElement = fixture.nativeElement.querySelector('.link-icon');
    const linkTextElement = fixture.nativeElement.querySelector('.link-text');

    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('aria-label')).toBe('Client profile');
    expect(linkElement.getAttribute('ng-reflect-position')).toBe('right');
    expect(linkElement.getAttribute('class')).toContain('mat-tooltip-trigger');

    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent.trim()).toBe(label);

    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toBe('groups');

    expect(linkTextElement).toBeTruthy();
    expect(linkTextElement.textContent.trim()).toBe(client.companyName);
  });

  it('should render label when value provided', () => {
    component.client = CLIENTS[0];
    component.label = 'Owner';
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('.link-label');

    expect(labelElement).toBeTruthy();
  });

  it('should not render label when value not provided', () => {
    component.client = CLIENTS[0];
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('.link-label');

    expect(labelElement).toBeFalsy();
  });

  it('should render link when client provided', () => {
    component.client = CLIENTS[0];
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');

    expect(linkElement).toBeTruthy();
  });

  it('should not render link when client not provided', () => {
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');

    expect(linkElement).toBeFalsy();
  });

  it('should initialize clientName properly', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const clientToString = client.companyName;

    mockUtilsService.clientToString.and.returnValue(clientToString);
    component.client = client;
    component.ngOnInit(); // Manually invoke ngOnInit() - otherwise doesn't work

    fixture.detectChanges();

    expect(mockUtilsService.clientToString).toHaveBeenCalledWith(client);
    expect(component.clientName).toBe(clientToString);
  });

  it('should set the tooltip position', () => {
    const tooltipPosition = 'below';
    component.tooltipPosition = tooltipPosition;
    component.client = CLIENTS[0];
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.getAttribute('ng-reflect-position')).toBe(tooltipPosition);
  });

  it('should set the button color', () => {
    const color = 'accent';
    component.color = color;
    component.client = CLIENTS[0];
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.getAttribute('class')).toContain(`mat-${color}`);
  });

  it('should set the custom button color', () => {
    const customColor = 'rgb(255, 0, 0)';
    component.customColor = customColor;
    component.client = CLIENTS[0];
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.style.color).toBe(customColor);
  });

  it('should render the "groups" icon for company type client', () => {
    component.client = CLIENT_OF_COMPANY_TYPE;
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector('.link-icon');
    expect(iconElement.textContent.trim()).toBe('groups');
  });

  it('should render the "person" icon for person type client', () => {
    component.client = CLIENT_OF_PERSON_TYPE;
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector('.link-icon');
    expect(iconElement.textContent.trim()).toBe('person');
  });
});
