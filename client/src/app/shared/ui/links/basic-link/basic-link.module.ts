import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLinkComponent } from './basic-link.component';

@NgModule({
  declarations: [BasicLinkComponent],
  imports: [CommonModule],
  exports: [BasicLinkComponent]
})
export class BasicLinkModule {}
