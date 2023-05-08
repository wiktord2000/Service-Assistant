import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusSelectorComponent } from './status-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [StatusSelectorComponent],
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  exports: [StatusSelectorComponent]
})
export class StatusSelectorModule {}
