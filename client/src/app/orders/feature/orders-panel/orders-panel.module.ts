import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersPanelComponent } from './orders-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersTableModule } from 'src/app/orders/ui/orders-table/orders-table.module';
import { OrdersPanelRoutingModule } from './orders-panel-routing.module';

@NgModule({
  declarations: [OrdersPanelComponent],
  imports: [
    CommonModule,
    OrdersPanelRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    OrdersTableModule,
    ReactiveFormsModule
  ],
  exports: [OrdersPanelComponent]
})
export class OrdersPanelModule {}
