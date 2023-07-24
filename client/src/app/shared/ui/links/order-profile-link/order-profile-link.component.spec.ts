import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProfileLinkComponent } from './order-profile-link.component';
import { BasicLinkModule } from '../basic-link/basic-link.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { SINGLE_ORDER } from 'src/app/shared/utils/testing-data';
import { Order } from 'src/app/core/models/Order';
import { By } from '@angular/platform-browser';
import { BasicLinkComponent } from '../basic-link/basic-link.component';
import { OrderProfileLinkModule } from './order-profile-link.module';

describe('OrderProfileLinkComponent', () => {
  let component: OrderProfileLinkComponent;
  let fixture: ComponentFixture<OrderProfileLinkComponent>;
  let mockUtilsService: jasmine.SpyObj<UtilsService>;
  const order: Order = SINGLE_ORDER;

  beforeEach(async () => {
    mockUtilsService = jasmine.createSpyObj('UtilsService', ['getOrderRouterLink']);

    await TestBed.configureTestingModule({
      imports: [BasicLinkModule, RouterTestingModule, OrderProfileLinkModule],
      providers: [{ provide: UtilsService, useValue: mockUtilsService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProfileLinkComponent);
    component = fixture.componentInstance;
    component.order = SINGLE_ORDER;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the "routerLink" property', () => {
    const routerLink = 'orders/' + order.id;
    mockUtilsService.getOrderRouterLink.and.returnValue(routerLink);
    component.ngOnInit();
    expect(mockUtilsService.getOrderRouterLink).toHaveBeenCalledWith(order);
    expect(component.routerLink).toBe(routerLink);
  });

  it('should render the app-basic-link component with correct inputs', () => {
    const tooltipText = order.orderNumber;
    const displayText = order.orderNumber;
    const routerLink = '/orders/' + order.id;
    const iconName = 'summarize';

    // Mock the UtilsService methods
    mockUtilsService.getOrderRouterLink.and.returnValue(routerLink);
    component.ngOnInit();

    fixture.detectChanges();

    // Get the app-basic-link component
    const appBasicLinkDebugElement = fixture.debugElement.query(By.css('app-basic-link'));
    const appBasicLinkInstance = appBasicLinkDebugElement.componentInstance as BasicLinkComponent;

    // Assert that the app-basic-link component is present
    expect(appBasicLinkInstance).toBeTruthy();

    // Assert that the inputs of app-basic-link are correctly bound
    expect(appBasicLinkInstance.tooltipText).toBe(tooltipText);
    expect(appBasicLinkInstance.displayText).toBe(displayText);
    expect(appBasicLinkInstance.routerLink).toBe(routerLink);
    expect(appBasicLinkInstance.icon).toBe(iconName);
  });
});
