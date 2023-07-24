import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileLinkComponent } from './client-profile-link.component';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CLIENT_OF_COMPANY_TYPE } from 'src/app/shared/utils/testing-data';
import { By } from '@angular/platform-browser';
import { BasicLinkComponent } from '../basic-link/basic-link.component';
import { BasicLinkModule } from '../basic-link/basic-link.module';
import { ClientProfileLinkModule } from './client-profile-link.module';

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
      providers: [{ provide: UtilsService, useValue: mockUtilsService }], // Register mocked service
      imports: [RouterTestingModule, BasicLinkModule, ClientProfileLinkModule]
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
    component.ngOnInit(); // Manually invoke ngOnInit() - it's crucial

    fixture.detectChanges();

    expect(mockUtilsService.clientToString).toHaveBeenCalledWith(client);
    expect(component.clientDisplayName).toBe(clientDisplayName);
  });

  it('should initialize "clientIcon" property', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const clientIcon = 'groups';
    component.client = client;

    mockUtilsService.getClientIcon.and.returnValue(clientIcon);

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

  it('should render the app-basic-link component with correct inputs', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const clientDisplayName = client.companyName;
    const clientIcon = 'groups';
    const routerLink = '/clients/1';
    const customColor = 'blue';

    // Set the component inputs
    component.client = client;
    component.customColor = customColor;

    // Mock the UtilsService methods
    mockUtilsService.clientToString.and.returnValue(clientDisplayName);
    mockUtilsService.getClientIcon.and.returnValue(clientIcon);
    mockUtilsService.getClientRouterLink.and.returnValue(routerLink);

    component.ngOnInit();
    fixture.detectChanges();

    // Get the app-basic-link component
    const appBasicLinkDebugElement = fixture.debugElement.query(By.css('app-basic-link'));
    const appBasicLinkInstance = appBasicLinkDebugElement.componentInstance as BasicLinkComponent;

    // Assert that the app-basic-link component is present
    expect(appBasicLinkInstance).toBeTruthy();

    // Assert that the inputs of app-basic-link are correctly bound
    expect(appBasicLinkInstance.icon).toBe(clientIcon);
    expect(appBasicLinkInstance.routerLink).toBe(routerLink);
    expect(appBasicLinkInstance.displayText).toBe(clientDisplayName);
    expect(appBasicLinkInstance.tooltipText).toBe(clientDisplayName);
    expect(appBasicLinkInstance.customColor).toBe(customColor);
  });
});
