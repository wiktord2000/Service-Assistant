import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'test-errors'
  },
  {
    path: 'test-errors',
    loadChildren: () =>
      import('./pages/test-errors/test-errors.module').then((m) => m.TestErrorsModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  },
  {
    path: 'server-error',
    loadChildren: () =>
      import('./pages/server-error/server-error.module').then((m) => m.ServerErrorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
