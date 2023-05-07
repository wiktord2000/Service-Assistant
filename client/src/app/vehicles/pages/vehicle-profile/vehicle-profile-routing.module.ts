import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleProfileComponent } from './vehicle-profile.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', canDeactivate: [CanDeactivateGuard], component: VehicleProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleProfileRoutingModule {}
