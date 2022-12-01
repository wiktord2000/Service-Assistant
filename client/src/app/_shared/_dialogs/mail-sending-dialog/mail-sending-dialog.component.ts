import { EmailMessage } from './../../../_models/EmailMessage';
import { SnackbarService } from './../../../_services/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MailService } from 'src/app/_services/mail.service';

@Component({
  selector: 'app-mail-sending-dialog',
  templateUrl: './mail-sending-dialog.component.html',
  styleUrls: ['./mail-sending-dialog.component.css']
})
export class MailSendingDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { emails: Array<string> },
    private formBuilder: FormBuilder,
    private mailService: MailService,
    public dialogRef: MatDialogRef<MailSendingDialogComponent>,
    private snackbarService: SnackbarService
  ) {}

  emails: string[] = [];
  history: string[][] = [];
  historySize: number = 10;
  emailForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email]]
  });
  messageForm: FormGroup = this.formBuilder.group({
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.emails = this.data.emails;
  }

  onSendEmail() {
    let { subject, message } = this.messageForm.value;

    let emailMessage: EmailMessage = {
      subject: subject,
      message: message,
      emails: this.emails
    };

    this.mailService.postMail(emailMessage).subscribe({
      next: () => {
        // Show snackbar
        this.snackbarService.showMessage('success', 'Pomyślnie wysłano wiadomość');
        // Close dialog
        this.dialogRef.close();
      },
      error: (err) => {
        this.snackbarService.showMessage('error', err.error);
        console.log(err);
      }
    });
  }

  // History functionality
  addToHistory(emails: string[]) {
    // Free up space
    if (this.history.length === this.historySize) this.history.shift();
    // Add new element at end
    this.history.push(emails);
  }

  onAddEmail() {
    let email = this.emailForm.controls['email'].value;
    // Check not empty
    if (!email) return;

    // Check that the email already exists
    let filteredArray = this.emails.filter((currEmail) => currEmail === email);
    if (filteredArray.length) {
      this.emailForm.controls['email'].setErrors({ emailExist: true });
      return;
    }

    // Store previous state
    this.addToHistory(this.emails.slice());
    // Add email
    this.emails.push(email);
    // Clear input
    this.emailForm.controls['email'].setValue('');
  }

  onDeleteEmail(emailToRemove: string) {
    // Store previous state
    this.addToHistory(this.emails.slice());
    // Delete email from array
    this.emails = this.emails.filter((email) => email !== emailToRemove);
  }

  onDeleteAllEmails(): void {
    if (!this.emails.length) return;
    // Add state to history before delete
    this.addToHistory(this.emails.slice());
    // Remove emails
    this.emails = [];
  }

  onReturnEmails(): void {
    // If history isn't empty
    if (!this.history.length) return;
    // Return previous state
    this.emails = this.history.pop();
  }
}
