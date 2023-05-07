import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPanelComponent } from './services-panel.component';

const routes: Routes = [{ path: '', component: ServicesPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesPanelRoutingModule { }
