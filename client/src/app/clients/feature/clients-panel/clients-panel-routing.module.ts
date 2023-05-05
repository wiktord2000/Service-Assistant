import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPanelComponent } from './clients-panel.component';

const routes: Routes = [{ path: '', component: ClientsPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsPanelRoutingModule {}
