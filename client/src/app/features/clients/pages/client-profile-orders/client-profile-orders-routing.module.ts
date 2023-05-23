import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileOrdersComponent } from './client-profile-orders.component';

const routes: Routes = [{ path: '', component: ClientProfileOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfileOrdersRoutingModule {}
