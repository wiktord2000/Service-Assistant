import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Directive({
  selector: '[appTableBase]'
})
export class TableBaseDirective implements OnInit, AfterViewInit {
  @Input() matElevationValue: number = 8;
  @Input() heightInRows?: number | 'auto' = 8;
  tableHeight!: number | 'none';
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private utils: UtilsService,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.tableHeight =
      this.heightInRows === 'auto' ? 'none' : this.utils.calculateTableHeight(this.heightInRows);
  }

  ngAfterViewInit(): void {
    const tableWrapper = this.elementRef.nativeElement.querySelector('.table-wrapper');
    const tableInternalWrapper =
      this.elementRef.nativeElement.querySelector('.table-internal-wrapper');

    this.renderer2.addClass(tableWrapper, `mat-elevation-z${this.matElevationValue}`);
    this.renderer2.setStyle(tableInternalWrapper, 'min-height', `${this.tableHeight}px`);
    this.renderer2.setStyle(tableInternalWrapper, 'max-height', `${this.tableHeight}px`);
  }
}
