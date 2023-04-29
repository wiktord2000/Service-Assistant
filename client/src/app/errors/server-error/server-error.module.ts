import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorComponent } from './server-error.component';

@NgModule({
  declarations: [ServerErrorComponent],
  imports: [CommonModule],
  exports: [ServerErrorComponent]
})
export class ServerErrorModule {}
