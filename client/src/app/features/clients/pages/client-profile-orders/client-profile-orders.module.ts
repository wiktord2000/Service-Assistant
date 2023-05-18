import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProfileOrdersRoutingModule } from './client-profile-orders-routing.module';
import { ClientProfileOrdersComponent } from './client-profile-orders.component';


@NgModule({
  declarations: [
    ClientProfileOrdersComponent
  ],
  imports: [
    CommonModule,
    ClientProfileOrdersRoutingModule
  ]
})
export class ClientProfileOrdersModule { }
