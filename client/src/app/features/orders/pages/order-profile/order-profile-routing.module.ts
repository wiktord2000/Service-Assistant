import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderProfileComponent } from './order-profile.component';
import { OrderResolver } from '../../data-access/order.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { order: OrderResolver },
    component: OrderProfileComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../order-profile-edit/order-profile-edit.module').then(
            (m) => m.OrderProfileEditModule
          )
      },
      {
        path: 'basket',
        loadChildren: () =>
          import('../order-profile-basket/order-profile-basket.module').then(
            (m) => m.OrderProfileBasketModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderProfileRoutingModule {}
