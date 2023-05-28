import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductProfileEditComponent } from './product-profile-edit.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', canDeactivate: [CanDeactivateGuard], component: ProductProfileEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductProfileEditRoutingModule {}
