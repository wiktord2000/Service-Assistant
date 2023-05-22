import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileComponent } from './client-profile.component';
import { ClientResolver } from '../../utils/client.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { client: ClientResolver },
    component: ClientProfileComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../client-profile-edit/client-profile-edit.module').then(
            (m) => m.ClientProfileEditModule
          )
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('../client-profile-vehicles/client-profile-vehicles.module').then(
            (m) => m.ClientProfileVehiclesModule
          )
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../client-profile-orders/client-profile-orders.module').then(
            (m) => m.ClientProfileOrdersModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfileRoutingModule {}
