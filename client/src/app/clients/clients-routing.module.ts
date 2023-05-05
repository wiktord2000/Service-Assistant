import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/clients-panel/clients-panel.module').then((m) => m.ClientsPanelModule)
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./feature/client-profile/client-profile.module').then((m) => m.ClientProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
