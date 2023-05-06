import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/orders-panel/orders-panel.module').then((m) => m.OrdersPanelModule)
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./feature/order-profile/order-profile.module').then((m) => m.OrderProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
