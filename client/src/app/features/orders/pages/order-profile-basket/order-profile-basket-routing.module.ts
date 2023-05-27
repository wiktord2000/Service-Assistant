import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderProfileBasketComponent } from './order-profile-basket.component';

const routes: Routes = [{ path: '', component: OrderProfileBasketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderProfileBasketRoutingModule { }
