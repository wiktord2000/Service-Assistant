import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailSendingDialogComponent } from './mail-sending-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [MailSendingDialogComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    MatInputModule
  ],
  exports: [MailSendingDialogComponent]
})
export class MailSendingDialogModule {}
