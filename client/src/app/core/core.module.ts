import { NgModule } from '@angular/core';
import { interceptorProviders } from './interceptors';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { NavModule } from './nav/nav.module';

@NgModule({
  declarations: [],
  imports: [NavModule],
  providers: [interceptorProviders, AuthGuard, CanDeactivateGuard],
  exports: [NavModule]
})
export class CoreModule {}
