import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsTableComponent } from './clients-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientProfileLinkModule } from '../../links/client-profile-link/client-profile-link.module';
import { SendEmailLinkModule } from '../../links/send-email-link/send-email-link.module';

@NgModule({
  declarations: [ClientsTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    ClientProfileLinkModule,
    SendEmailLinkModule
  ],
  exports: [ClientsTableComponent]
})
export class ClientsTableModule {}
