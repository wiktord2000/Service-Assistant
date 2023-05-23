import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { SendEmailLinkModule } from 'src/app/shared/ui/links/send-email-link/send-email-link.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientProfileRoutingModule } from './client-profile-routing.module';

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientProfileRoutingModule,
    MatIconModule,
    MatTabsModule,
    SendEmailLinkModule
  ]
})
export class ClientProfileModule {}
