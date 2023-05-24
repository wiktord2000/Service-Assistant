import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderProfileEditComponent } from './order-profile-edit.component';

const routes: Routes = [{ path: '', component: OrderProfileEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderProfileEditRoutingModule { }
