import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductProfileOrdersComponent } from './product-profile-orders.component';

const routes: Routes = [{ path: '', component: ProductProfileOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductProfileOrdersRoutingModule {}
