import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleProfileLinkComponent } from './vehicle-profile-link.component';
import { VehicleProfileLinkModule } from './vehicle-profile-link.module';
import { BasicLinkModule } from '../basic-link/basic-link.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { SINGLE_VEHICLE } from 'src/app/shared/utils/testing-data';
import { BasicLinkComponent } from '../basic-link/basic-link.component';
import { By } from '@angular/platform-browser';

describe('VehicleProfileLinkComponent', () => {
  let component: VehicleProfileLinkComponent;
  let fixture: ComponentFixture<VehicleProfileLinkComponent>;
  let mockUtilsService: jasmine.SpyObj<UtilsService>;
  const vehicle: Vehicle = SINGLE_VEHICLE;

  beforeEach(async () => {
    mockUtilsService = jasmine.createSpyObj('UtilsService', [
      'getVehicleRouterLink',
      'vehicleToString'
    ]);

    await TestBed.configureTestingModule({
      imports: [VehicleProfileLinkModule, BasicLinkModule, RouterTestingModule],
      providers: [{ provide: UtilsService, useValue: mockUtilsService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleProfileLinkComponent);
    component = fixture.componentInstance;
    component.vehicle = vehicle;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initalize the "routerLink" property', () => {
    let routerLink = 'vehicles/' + vehicle.id;
    mockUtilsService.getVehicleRouterLink.and.returnValue(routerLink);
    component.ngOnInit();

    fixture.detectChanges();

    expect(mockUtilsService.getVehicleRouterLink).toHaveBeenCalledWith(vehicle);
    expect(component.routerLink).toBe(routerLink);
  });

  it('should initalize the "vehicleDisplayName" property', () => {
    const vehicleDisplayName = vehicle.brand;
    mockUtilsService.vehicleToString.and.returnValue(vehicleDisplayName);
    component.ngOnInit();

    fixture.detectChanges();

    expect(mockUtilsService.vehicleToString).toHaveBeenCalledWith(vehicle);
    expect(component.vehicleDisplayName).toBe(vehicleDisplayName);
  });

  it('should render the app-basic-link component with correct inputs', () => {
    const tooltipText = vehicle.brand;
    const routerLink = 'vehicles/' + vehicle.id;
    const iconName = 'directions_car';
    const vehicleDisplayName = vehicle.brand;
    const label = 'Vehicle';
    const customColor = 'red';

    component.label = label;
    component.includeIcon = true;
    component.customColor = customColor;

    mockUtilsService.getVehicleRouterLink.and.returnValue(routerLink);
    mockUtilsService.vehicleToString.and.returnValue(vehicleDisplayName);

    component.ngOnInit();
    fixture.detectChanges();

    const appBasicLinkDebugElement = fixture.debugElement.query(By.css('app-basic-link'));
    const appBasicLinkComponent = appBasicLinkDebugElement.componentInstance as BasicLinkComponent;

    expect(appBasicLinkComponent.tooltipText).toBe(tooltipText);
    expect(appBasicLinkComponent.routerLink).toBe(routerLink);
    expect(appBasicLinkComponent.icon).toBe(iconName);
    expect(appBasicLinkComponent.displayText).toBe(vehicleDisplayName);
    expect(appBasicLinkComponent.label).toBe(label);
    expect(appBasicLinkComponent.customColor).toBe(customColor);
  });

  it('should include the icon', () => {
    component.includeIcon = true;
    fixture.detectChanges();
    const iconElement: HTMLElement = fixture.nativeElement.querySelector('.link-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toBe('directions_car');
  });

  it('should not include the icon', () => {
    const iconElement: HTMLElement = fixture.nativeElement.querySelector('.link-icon');
    expect(iconElement).toBeFalsy();
  });
});
