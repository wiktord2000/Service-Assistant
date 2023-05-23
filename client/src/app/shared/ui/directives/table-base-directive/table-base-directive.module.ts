import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBaseDirective } from './table-base.directive';

@NgModule({
  declarations: [TableBaseDirective],
  imports: [CommonModule],
  exports: [TableBaseDirective]
})
export class TableBaseDirectiveModule {}
