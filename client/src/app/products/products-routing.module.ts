import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/products-panel/products-panel.module').then((m) => m.ProductsPanelModule)
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./feature/product-profile/product-profile.module').then((m) => m.ProductProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
