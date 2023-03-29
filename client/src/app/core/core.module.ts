import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { AuthGuard } from './../core/guards/auth.guard';
import { interceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  providers: [AuthGuard, interceptorProviders],
  exports: [MaterialModule]
})
export class CoreModule {}
