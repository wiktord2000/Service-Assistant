import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatDividerModule, MatDialogModule, MatButtonModule],
  exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {}
