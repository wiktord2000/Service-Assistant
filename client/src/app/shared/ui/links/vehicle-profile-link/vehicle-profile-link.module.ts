import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleProfileLinkComponent } from './vehicle-profile-link.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VehicleProfileLinkComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule, RouterModule],
  exports: [VehicleProfileLinkComponent]
})
export class VehicleProfileLinkModule {}
