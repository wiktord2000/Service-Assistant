import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleProfileComponent } from './vehicle-profile.component';
import { VehicleResolver } from '../../data-access/vehicle.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { vehicle: VehicleResolver },
    component: VehicleProfileComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../vehicle-profile-edit/vehicle-profile-edit.module').then(
            (m) => m.VehicleProfileEditModule
          )
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../vehicle-profile-orders/vehicle-profile-orders.module').then(
            (m) => m.VehicleProfileOrdersModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleProfileRoutingModule {}
