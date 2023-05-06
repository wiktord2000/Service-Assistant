import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [CustomHeaderComponent],
  imports: [CommonModule, MatDividerModule],
  exports: [CustomHeaderComponent]
})
export class CustomHeaderModule {}
