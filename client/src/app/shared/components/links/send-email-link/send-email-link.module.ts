import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendEmailLinkComponent } from './send-email-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SendEmailLinkComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [SendEmailLinkComponent]
})
export class SendEmailLinkModule {}
