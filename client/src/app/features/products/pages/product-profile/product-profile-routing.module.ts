import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductProfileComponent } from './product-profile.component';
import { ProductResolver } from '../../data-access/product.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { product: ProductResolver },
    component: ProductProfileComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../product-profile-edit/product-profile-edit.module').then(
            (m) => m.ProductProfileEditModule
          )
      },
      {
        path: 'opinion',
        loadChildren: () =>
          import('../product-profile-opinion/product-profile-opinion.module').then(
            (m) => m.ProductProfileOpinionModule
          )
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../product-profile-orders/product-profile-orders.module').then(
            (m) => m.ProductProfileOrdersModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductProfileRoutingModule {}
