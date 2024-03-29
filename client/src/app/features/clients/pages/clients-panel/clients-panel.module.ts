import { CommonModule } from '@angular/common';
import { ClientsPanelComponent } from './clients-panel.component';
import { ClientsPanelRoutingModule } from './clients-panel-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientsTableModule } from 'src/app/features/clients/ui/clients-table/clients-table.module';
import { NgModule } from '@angular/core';
import { CreateClientDialogModule } from '../../ui/create-client-dialog/create-client-dialog.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base/table-base-directive.module';

@NgModule({
  declarations: [ClientsPanelComponent],
  imports: [
    CommonModule,
    ClientsPanelRoutingModule,
    MatButtonModule,
    MatIconModule,
    ClientsTableModule,
    CreateClientDialogModule,
    TableBaseDirectiveModule
  ]
})
export class ClientsPanelModule {}
