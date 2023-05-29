import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalScrollDirective } from './horizontal-scroll.directive';

@NgModule({
  declarations: [HorizontalScrollDirective],
  imports: [CommonModule],
  exports: [CommonModule, HorizontalScrollDirective]
})
export class HorizontalScrollDirectiveModule {}
