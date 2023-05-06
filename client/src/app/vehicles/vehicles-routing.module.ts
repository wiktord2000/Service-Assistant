import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/vehicles-panel/vehicles-panel.module').then((m) => m.VehiclesPanelModule)
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./feature/vehicle-profile/vehicle-profile.module').then((m) => m.VehicleProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule {}
