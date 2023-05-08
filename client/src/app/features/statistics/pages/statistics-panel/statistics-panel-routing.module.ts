import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsPanelComponent } from './statistics-panel.component';

const routes: Routes = [{ path: '', component: StatisticsPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsPanelRoutingModule { }
