import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesTableComponent } from './services-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TruncateTextPipeModule } from 'src/app/shared/ui/pipes/truncate-text-pipe/truncate-text-pipe.module';

@NgModule({
  declarations: [ServicesTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TruncateTextPipeModule
  ],
  exports: [ServicesTableComponent]
})
export class ServicesTableModule {}
