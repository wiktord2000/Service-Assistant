import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileLinkComponent } from './client-profile-link.component';
import { CLIENTS } from 'src/app/shared/utils/testing-data';
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

  it('should initialize clientName property', () => {
    const client = CLIENTS[0];
    const clientToString = client.companyName;

    mockUtilsService.clientToString.and.returnValue(clientToString); // Mock the clientToString() method
    component.client = client;
    component.ngOnInit(); // Manually invoke ngOnInit() - otherwise doesn't work
    fixture.detectChanges();

    expect(mockUtilsService.clientToString).toHaveBeenCalledWith(client);
    expect(component.clientName).toBe(clientToString);
  });

  it('should render the client profile link', () => {
    const client = CLIENTS[0]; // Provide sample client data
    component.client = client;
    component.label = 'Profile';
    component.clientName = 'Jack';
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    console.log(linkElement);
    const labelTextElement = fixture.nativeElement.querySelector('.link-label');
    const iconElement = fixture.nativeElement.querySelector('.link-icon');
    const textElement = fixture.nativeElement.querySelector('.link-text');

    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('aria-label')).toBe('Client profile');
    expect(linkElement.getAttribute('ng-reflect-position')).toBe('right');
    expect(linkElement.getAttribute('class')).toContain('mat-tooltip-trigger');

    expect(labelTextElement).toBeTruthy();
    expect(labelTextElement.textContent.trim()).toBe('Profile');

    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toBe('groups');

    expect(textElement).toBeTruthy();
    expect(textElement.textContent.trim()).toBe('Jack');
  });
});
