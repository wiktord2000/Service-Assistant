import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderServicesTableComponent } from './order-services-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [OrderServicesTableComponent],
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatIconModule, MatTableModule],
  exports: [OrderServicesTableComponent]
})
export class OrderServicesTableModule {}
