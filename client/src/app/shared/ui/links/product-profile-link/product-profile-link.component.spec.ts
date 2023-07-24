import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfileLinkComponent } from './product-profile-link.component';
import { ProductProfileLinkModule } from './product-profile-link.module';
import { BasicLinkModule } from '../basic-link/basic-link.module';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Product } from 'src/app/core/models/Product';
import { SINGLE_PRODUCT } from 'src/app/shared/utils/testing-data';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BasicLinkComponent } from '../basic-link/basic-link.component';

describe('ProductProfileLinkComponent', () => {
  let component: ProductProfileLinkComponent;
  let fixture: ComponentFixture<ProductProfileLinkComponent>;
  let mockUtilsService: jasmine.SpyObj<UtilsService>;
  const product: Product = SINGLE_PRODUCT;

  beforeEach(async () => {
    mockUtilsService = jasmine.createSpyObj('UtilsService', ['getProductRouterLink']);

    await TestBed.configureTestingModule({
      imports: [ProductProfileLinkModule, BasicLinkModule, RouterTestingModule],
      providers: [{ provide: UtilsService, useValue: mockUtilsService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProfileLinkComponent);
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the "routerLink" property', () => {
    const routerLink = 'products/' + product.id;
    mockUtilsService.getProductRouterLink.and.returnValue(routerLink);
    component.ngOnInit();

    fixture.detectChanges();

    expect(mockUtilsService.getProductRouterLink).toHaveBeenCalledWith(product);
    expect(component.routerLink).toBe(routerLink);
  });

  it('should render the app-basic-link component with correct inputs', () => {
    const routerLink = 'products/' + product.id;
    const labelName = 'Towar';
    const displayText = product.name;
    const tooltipText = product.name;

    component.includeLabel = true;
    mockUtilsService.getProductRouterLink.and.returnValue(routerLink);
    component.ngOnInit();

    fixture.detectChanges();

    const appBasicLinkDebugElement = fixture.debugElement.query(By.css('app-basic-link'));
    const appBasicLinkComponent = appBasicLinkDebugElement.componentInstance as BasicLinkComponent;

    expect(appBasicLinkComponent.label).toBe(labelName);
    expect(appBasicLinkComponent.displayText).toBe(displayText);
    expect(appBasicLinkComponent.tooltipText).toBe(tooltipText);
    expect(appBasicLinkComponent.routerLink).toBe(routerLink);
  });

  it('should include the label', () => {
    component.includeLabel = true;
    fixture.detectChanges();
    const labelElement: HTMLElement = fixture.nativeElement.querySelector('.link-label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent.trim()).toBe('Towar');
  });

  it('should not include the label', () => {
    const labelElement: HTMLElement = fixture.nativeElement.querySelector('.link-label');
    expect(labelElement).toBeFalsy();
  });
});
