import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorsComponent } from './test-errors/test-errors.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NotFoundComponent, ServerErrorComponent, TestErrorsComponent],
  imports: [MatButtonModule, CommonModule],
  exports: [NotFoundComponent, ServerErrorComponent, TestErrorsComponent]
})
export class ErrorsModule {}
