import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleProfileEditComponent } from './vehicle-profile-edit.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', canDeactivate: [CanDeactivateGuard], component: VehicleProfileEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleProfileEditRoutingModule {}
