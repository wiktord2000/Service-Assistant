import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPanelComponent } from './products-panel.component';

const routes: Routes = [{ path: '', component: ProductsPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsPanelRoutingModule {}
