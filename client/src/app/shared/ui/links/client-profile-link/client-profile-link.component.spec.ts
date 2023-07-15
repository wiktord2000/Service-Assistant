import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileLinkComponent } from './client-profile-link.component';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { CLIENT_OF_COMPANY_TYPE } from 'src/app/shared/utils/testing-data';

describe('ClientProfileLinkComponent', () => {
  let component: ClientProfileLinkComponent;
  let fixture: ComponentFixture<ClientProfileLinkComponent>;
  let mockUtilsService: jasmine.SpyObj<UtilsService>;

  beforeEach(async () => {
    // Create a mock UtilsService with desired methods
    mockUtilsService = jasmine.createSpyObj('UtilsService', [
      'clientToString',
      'getClientIcon',
      'getClientRouterLink'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ClientProfileLinkComponent],
      providers: [{ provide: UtilsService, useValue: mockUtilsService }], // Register mocked service
      imports: [MatButtonModule, MatIconModule, MatTooltipModule, RouterTestingModule]
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

  it('should initialize "clientDisplayName" property', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const clientDisplayName = client.companyName;

    mockUtilsService.clientToString.and.returnValue(clientDisplayName);
    component.client = client;
    component.ngOnInit(); // Manually invoke ngOnInit() - otherwise doesn't work

    fixture.detectChanges();

    expect(mockUtilsService.clientToString).toHaveBeenCalledWith(client);
    expect(component.clientDisplayName).toBe(clientDisplayName);
  });

  it('should initialize "clientIcon" property', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const clientIcon = 'groups';

    mockUtilsService.getClientIcon.and.returnValue(clientIcon);
    component.client = client;
    component.ngOnInit();

    fixture.detectChanges();

    expect(mockUtilsService.getClientIcon).toHaveBeenCalledWith(client);
    expect(component.clientIcon).toBe(clientIcon);
  });

  it('should initialize "routerLink" property', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const routerLink = '/clients/1';

    mockUtilsService.getClientRouterLink.and.returnValue(routerLink);
    component.client = client;
    component.ngOnInit();

    fixture.detectChanges();

    expect(mockUtilsService.getClientRouterLink).toHaveBeenCalledWith(client);
    expect(component.routerLink).toBe(routerLink);
  });
});
