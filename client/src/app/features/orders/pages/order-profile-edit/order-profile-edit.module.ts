import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderProfileEditRoutingModule } from './order-profile-edit-routing.module';
import { OrderProfileEditComponent } from './order-profile-edit.component';


@NgModule({
  declarations: [
    OrderProfileEditComponent
  ],
  imports: [
    CommonModule,
    OrderProfileEditRoutingModule
  ]
})
export class OrderProfileEditModule { }
