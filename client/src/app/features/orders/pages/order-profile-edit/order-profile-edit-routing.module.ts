import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderProfileEditComponent } from './order-profile-edit.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', canDeactivate: [CanDeactivateGuard], component: OrderProfileEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderProfileEditRoutingModule {}
