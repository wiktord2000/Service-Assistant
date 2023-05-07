import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorsComponent } from './test-errors.component';
import { MatButtonModule } from '@angular/material/button';
import { TestErrorsRoutingModule } from './test-errors-routing.module';

@NgModule({
  declarations: [TestErrorsComponent],
  imports: [CommonModule, TestErrorsRoutingModule, MatButtonModule]
})
export class TestErrorsModule {}
