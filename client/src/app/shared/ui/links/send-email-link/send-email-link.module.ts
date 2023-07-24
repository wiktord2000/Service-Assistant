import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendEmailLinkComponent } from './send-email-link.component';
import { MailSendingDialogModule } from '../../../../features/clients/ui/mail-sending-dialog/mail-sending-dialog.module';
import { BasicLinkModule } from '../basic-link/basic-link.module';

@NgModule({
  declarations: [SendEmailLinkComponent],
  imports: [CommonModule, MailSendingDialogModule, BasicLinkModule],
  exports: [SendEmailLinkComponent]
})
export class SendEmailLinkModule {}
