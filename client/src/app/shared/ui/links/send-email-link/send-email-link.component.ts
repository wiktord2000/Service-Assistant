import { MailSendingDialogComponent } from '../../../../features/clients/ui/mail-sending-dialog/mail-sending-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';

const MAIL_SENDING_DIALOG_WIDTH = '1000px';

@Component({
  selector: 'app-send-email-link',
  templateUrl: './send-email-link.component.html',
  styleUrls: ['./send-email-link.component.scss']
})
export class SendEmailLinkComponent {
  @Input() email!: string;
  @Input() customColor?: string;
  iconName: string = 'forward_to_inbox';

  constructor(private dialog: MatDialog) {}

  onEmailClick() {
    this.dialog.open(MailSendingDialogComponent, {
      width: MAIL_SENDING_DIALOG_WIDTH,
      data: {
        emails: [this.email]
      }
    });
  }
}
