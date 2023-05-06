import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendEmailLinkComponent } from './send-email-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MailSendingDialogModule } from '../../dialogs/mail-sending-dialog/mail-sending-dialog.module';

@NgModule({
  declarations: [SendEmailLinkComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MailSendingDialogModule],
  exports: [SendEmailLinkComponent]
})
export class SendEmailLinkModule {}
