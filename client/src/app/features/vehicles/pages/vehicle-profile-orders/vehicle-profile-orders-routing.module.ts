import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleProfileOrdersComponent } from './vehicle-profile-orders.component';

const routes: Routes = [{ path: '', component: VehicleProfileOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleProfileOrdersRoutingModule {}
