import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPanelComponent } from './panels/services-panel/services-panel.component';
import { VehiclesPanelComponent } from './panels/vehicles-panel/vehicles-panel.component';
import { StatisticsPanelComponent } from './panels/statistics-panel/statistics-panel.component';
import { VehicleProfileComponent } from './profiles/vehicle-profile/vehicle-profile.component';
import { ProductsPanelComponent } from './panels/products-panel/products-panel.component';
import { ProductProfileComponent } from './profiles/product-profile/product-profile.component';
import { CanDeactivateGuard } from './core/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule)
      },
      { path: 'services', component: ServicesPanelComponent },
      { path: 'products', component: ProductsPanelComponent },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then((m) => m.ClientsModule)
      },
      { path: 'vehicles', component: VehiclesPanelComponent },
      { path: 'statistics', component: StatisticsPanelComponent },
      {
        path: 'vehicles/:id',
        component: VehicleProfileComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'products/:id',
        component: ProductProfileComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' } //when path doesn't match (Wildcard)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
