import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendEmailLinkComponent } from './send-email-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MailSendingDialogModule } from '../../../../features/clients/ui/mail-sending-dialog/mail-sending-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SendEmailLinkComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MailSendingDialogModule,
    MatTooltipModule
  ],
  exports: [SendEmailLinkComponent]
})
export class SendEmailLinkModule {}
