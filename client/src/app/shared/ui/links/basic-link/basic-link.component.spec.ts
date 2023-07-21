import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLinkComponent } from './basic-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('BasicLinkComponent', () => {
  let component: BasicLinkComponent;
  let fixture: ComponentFixture<BasicLinkComponent>;
  const queryElement = (querySelector: string): HTMLElement =>
    fixture.nativeElement.querySelector(querySelector);
  const getLinkElement = () => queryElement('a');
  const getLabelElement = () => queryElement('.link-label');
  const getIconElement = () => queryElement('.link-icon');
  const getLinkTextElement = () => queryElement('.link-text');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicLinkComponent],
      imports: [MatButtonModule, MatTooltipModule, MatIconModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render element', () => {
    const routerLink = '/clients/12';
    const displayText = 'Tomasz G.';
    const tooltipText = 'Tomasz Ganek';
    const label = 'Client:';
    const icon = 'groups';
    component.routerLink = routerLink;
    component.displayText = displayText;
    component.tooltipText = tooltipText;
    component.label = label;
    component.icon = icon;

    fixture.detectChanges();

    const linkElement = getLinkElement();
    const labelElement = getLabelElement();
    const iconElement = getIconElement();
    const linkTextElement = getLinkTextElement();

    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('aria-label')).toBe('Link to ' + displayText);
    expect(linkElement.getAttribute('ng-reflect-position')).toBe('right');
    expect(linkElement.getAttribute('ng-reflect-disabled')).toBe('false');
    expect(linkElement.getAttribute('class')).toContain('mat-tooltip-trigger');
    expect(linkElement.getAttribute('class')).toContain('mat-primary');

    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent.trim()).toBe(label);

    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toBe(icon);

    expect(linkTextElement).toBeTruthy();
    expect(linkTextElement.textContent.trim()).toBe(displayText);
  });

  it('should render label when value provided', () => {
    component.label = 'Owner';
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('.link-label');
    expect(labelElement).toBeTruthy();
  });

  it('should not render label when value not provided', () => {
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('.link-label');
    expect(labelElement).toBeFalsy();
  });

  it('should show the tooltip text', () => {
    const tooltipText = 'Go to the client profile';
    component.tooltipText = tooltipText;
    fixture.detectChanges();

    const linkElement = getLinkElement();
    expect(linkElement.getAttribute('ng-reflect-message')).toBe(tooltipText);
  });

  it('should disable the tooltip when the "tooltipText" is not provided', () => {
    fixture.detectChanges();

    const linkElement = getLinkElement();
    expect(linkElement.getAttribute('ng-reflect-disabled')).toBe('true');
  });

  it('should enable the tooltip when the "tooltipText" is provided', () => {
    component.tooltipText = 'Go to the client profile';
    fixture.detectChanges();

    const linkElement = getLinkElement();
    expect(linkElement.getAttribute('ng-reflect-disabled')).toBe('false');
  });

  it('should set the tooltip position', () => {
    const tooltipPosition = 'below';
    component.tooltipPosition = tooltipPosition;
    fixture.detectChanges();

    const linkElement = getLinkElement();
    expect(linkElement.getAttribute('ng-reflect-position')).toBe(tooltipPosition);
  });

  it('should change the palette color of the button', () => {
    const paletteColor = 'accent';
    component.paletteColor = paletteColor;
    fixture.detectChanges();

    const linkElement = getLinkElement();
    expect(linkElement.getAttribute('class')).toContain(`mat-${paletteColor}`);
  });

  it('should change the custom color of the button', () => {
    const customColor = 'rgb(255, 0, 0)';
    component.customColor = customColor;
    fixture.detectChanges();

    const linkElement = getLinkElement();
    expect(linkElement.style.color).toBe(customColor);
  });

  it('should choose the custom color over the palette color', () => {
    const customColor = 'white';
    const paletteColor = 'accent';
    component.customColor = customColor;
    component.paletteColor = paletteColor;
    fixture.detectChanges();

    const linkElement = getLinkElement();

    expect(linkElement.style.color).toBe(customColor);
    expect(linkElement.getAttribute('class')).not.toContain(`mat-${paletteColor}`);
  });

  it('should render the "groups" icon', () => {
    const iconName = 'groups';
    component.icon = iconName;
    fixture.detectChanges();

    const iconElement = getIconElement();
    expect(iconElement.textContent.trim()).toBe(iconName);
  });

  it('should render the "person" icon', () => {
    const iconName = 'person';
    component.icon = iconName;
    fixture.detectChanges();

    const iconElement = getIconElement();
    expect(iconElement.textContent.trim()).toBe(iconName);
  });

  it('should not render the icon when icon is not provided', () => {
    fixture.detectChanges();

    const iconElement = getIconElement();
    expect(iconElement).toBeFalsy();
  });

  it('should set the "routerLink"', () => {
    const routerLink = '/clients/12';
    component.routerLink = routerLink;
    fixture.detectChanges();

    const linkElement = getLinkElement();
    expect(linkElement.getAttribute('ng-reflect-router-link')).toBe(routerLink);
  });
});
