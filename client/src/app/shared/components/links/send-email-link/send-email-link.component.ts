import { MailSendingDialogComponent } from '../../dialogs/mail-sending-dialog/mail-sending-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-send-email-link',
  templateUrl: './send-email-link.component.html',
  styleUrls: ['./send-email-link.component.scss']
})
export class SendEmailLinkComponent implements OnInit {
  @Input() email: string;
  @Input() color: ThemePalette = 'primary';
  @Input() customColor?: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onEmailClick() {
    this.dialog.open(MailSendingDialogComponent, {
      width: '1000px',
      data: {
        emails: [this.email]
      }
    });
  }
}
