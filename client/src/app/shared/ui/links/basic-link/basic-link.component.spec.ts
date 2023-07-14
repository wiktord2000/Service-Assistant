import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLinkComponent } from './basic-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('BasicLinkComponent', () => {
  let component: BasicLinkComponent;
  let fixture: ComponentFixture<BasicLinkComponent>;

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

    const linkElement = fixture.nativeElement.querySelector('a');
    const labelElement = fixture.nativeElement.querySelector('.link-label');
    const iconElement = fixture.nativeElement.querySelector('.link-icon');
    const linkTextElement = fixture.nativeElement.querySelector('.link-text');

    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('aria-label')).toBe('Link to ' + displayText);
    expect(linkElement.getAttribute('ng-reflect-position')).toBe('right');
    expect(linkElement.getAttribute('class')).toContain('mat-tooltip-trigger');
    expect(linkElement.getAttribute('class')).toContain('mat-primary');

    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent.trim()).toBe(label);

    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toBe(icon);

    expect(linkTextElement).toBeTruthy();
    expect(linkTextElement.textContent.trim()).toBe(displayText);
  });
});
