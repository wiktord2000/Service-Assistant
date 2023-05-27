import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProfileComponent } from './order-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientProfileLinkModule } from 'src/app/shared/ui/links/client-profile-link/client-profile-link.module';
import { VehicleProfileLinkModule } from 'src/app/shared/ui/links/vehicle-profile-link/vehicle-profile-link.module';
import { StatusSelectorModule } from '../../ui/status-selector/status-selector.module';
import { OrderProfileRoutingModule } from './order-profile-routing.module';

@NgModule({
  declarations: [OrderProfileComponent],
  imports: [
    CommonModule,
    OrderProfileRoutingModule,
    MatTabsModule,
    StatusSelectorModule,
    ClientProfileLinkModule,
    VehicleProfileLinkModule
  ]
})
export class OrderProfileModule {}
