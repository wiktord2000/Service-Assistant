import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileLinkComponent } from './client-profile-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ClientProfileLinkComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, MatTooltipModule],
  exports: [ClientProfileLinkComponent]
})
export class ClientProfileLinkModule {}
