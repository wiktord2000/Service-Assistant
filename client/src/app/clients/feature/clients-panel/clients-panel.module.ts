import { CommonModule } from '@angular/common';
import { ClientsPanelComponent } from './clients-panel.component';
import { ClientsPanelRoutingModule } from './clients-panel-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientsTableModule } from 'src/app/shared/components/tables/clients-table/clients-table.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ClientsPanelComponent],
  imports: [
    CommonModule,
    ClientsPanelRoutingModule,
    MatButtonModule,
    MatIconModule,
    ClientsTableModule
  ]
})
export class ClientsPanelModule {}
