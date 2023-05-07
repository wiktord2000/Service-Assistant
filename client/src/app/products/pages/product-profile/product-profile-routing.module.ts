import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductProfileComponent } from './product-profile.component';

const routes: Routes = [{ path: '', component: ProductProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductProfileRoutingModule { }
