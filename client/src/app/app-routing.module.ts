import { NotFoundComponent } from './features/errors/pages/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module').then((m) => m.OrdersModule)
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./features/services/services.module').then((m) => m.ServicesModule)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.module').then((m) => m.ProductsModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.module').then((m) => m.ClientsModule)
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('./features/vehicles/vehicles.module').then((m) => m.VehiclesModule)
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('./features/statistics/statistics.module').then((m) => m.StatisticsModule)
      }
    ]
  },
  {
    path: 'errors',
    loadChildren: () => import('./features/errors/errors.module').then((m) => m.ErrorsModule)
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' } //when path doesn't match (Wildcard)
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
