import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesPanelComponent } from './vehicles-panel.component';

const routes: Routes = [{ path: '', component: VehiclesPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesPanelRoutingModule {}
