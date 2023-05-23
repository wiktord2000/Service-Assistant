import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProfileLinkComponent } from './order-profile-link.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OrderProfileLinkComponent],
  imports: [CommonModule, MatTooltipModule, RouterModule, MatButtonModule, MatIconModule],
  exports: [OrderProfileLinkComponent]
})
export class OrderProfileLinkModule {}
