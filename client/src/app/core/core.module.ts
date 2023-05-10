import { NgModule } from '@angular/core';
import { interceptorProviders } from './interceptors';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { NavModule } from './layout/nav/nav.module';

@NgModule({
  imports: [NavModule],
  providers: [interceptorProviders, AuthGuard, CanDeactivateGuard],
  exports: [NavModule]
})
export class CoreModule {}
