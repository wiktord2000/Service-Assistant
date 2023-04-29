import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorsComponent } from './test-errors.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TestErrorsComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [TestErrorsComponent]
})
export class TestErrorsModule {}
