import { NgModule } from '@angular/core';
import { interceptorProviders } from './interceptors';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

@NgModule({
  providers: [interceptorProviders, AuthGuard, CanDeactivateGuard]
})
export class CoreModule {}
