import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/clients-panel/clients-panel.module').then((m) => m.ClientsPanelModule)
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./pages/client-profile/client-profile.module').then((m) => m.ClientProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
