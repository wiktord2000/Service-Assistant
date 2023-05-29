import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsTableComponent } from './clients-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientProfileLinkModule } from '../../../../shared/ui/links/client-profile-link/client-profile-link.module';
import { SendEmailLinkModule } from '../../../../shared/ui/links/send-email-link/send-email-link.module';
import { TruncateTextPipeModule } from 'src/app/shared/ui/pipes/truncate-text-pipe/truncate-text-pipe.module';
import { TableBaseDirectiveModule } from 'src/app/shared/ui/directives/table-base/table-base-directive.module';

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
    SendEmailLinkModule,
    TruncateTextPipeModule,
    TableBaseDirectiveModule
  ],
  exports: [ClientsTableComponent]
})
export class ClientsTableModule {}
