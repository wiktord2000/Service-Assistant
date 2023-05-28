import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientProfileLinkModule } from 'src/app/shared/ui/links/client-profile-link/client-profile-link.module';
import { VehicleProfileComponent } from './vehicle-profile.component';
import { VehicleProfileRoutingModule } from './vehicle-profile-routing.module';

@NgModule({
  declarations: [VehicleProfileComponent],
  imports: [
    CommonModule,
    VehicleProfileRoutingModule,
    MatIconModule,
    MatTabsModule,
    ClientProfileLinkModule
  ]
})
export class VehicleProfileModule {}
