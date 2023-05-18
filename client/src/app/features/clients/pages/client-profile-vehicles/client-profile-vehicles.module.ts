import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProfileVehiclesRoutingModule } from './client-profile-vehicles-routing.module';
import { ClientProfileVehiclesComponent } from './client-profile-vehicles.component';


@NgModule({
  declarations: [
    ClientProfileVehiclesComponent
  ],
  imports: [
    CommonModule,
    ClientProfileVehiclesRoutingModule
  ]
})
export class ClientProfileVehiclesModule { }
