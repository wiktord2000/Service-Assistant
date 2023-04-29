import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsPanelComponent } from './clients-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientsTableModule } from 'src/app/shared/components/tables/clients-table/clients-table.module';

@NgModule({
  declarations: [ClientsPanelComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, ClientsTableModule],
  exports: [ClientsPanelComponent]
})
export class ClientsPanelModule {}
