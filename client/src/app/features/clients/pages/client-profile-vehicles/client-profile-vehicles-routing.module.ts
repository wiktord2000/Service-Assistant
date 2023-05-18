import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileVehiclesComponent } from './client-profile-vehicles.component';

const routes: Routes = [{ path: '', component: ClientProfileVehiclesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfileVehiclesRoutingModule { }
