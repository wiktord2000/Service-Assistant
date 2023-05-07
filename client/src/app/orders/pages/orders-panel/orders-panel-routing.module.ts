import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPanelComponent } from './orders-panel.component';

const routes: Routes = [{ path: '', component: OrdersPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersPanelRoutingModule { }
