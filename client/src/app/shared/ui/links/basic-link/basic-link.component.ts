import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-basic-link',
  templateUrl: './basic-link.component.html',
  styleUrls: ['./basic-link.component.scss']
})
export class BasicLinkComponent implements OnInit {
  @Input() routerLink!: string;
  @Input() displayText!: string;
  @Input() tooltipText?: string;
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() paletteColor: ThemePalette = 'primary';
  @Input() customColor?: string;
  @Input() icon?: string;
  @Input() label?: string;

  constructor() {}

  ngOnInit(): void {
    if (this.routerLink === undefined || this.displayText === undefined) {
      throw new Error(
        'Properties "routerLink" and "displayText" are required for proper rendering of the component.'
      );
    }
  }
}
