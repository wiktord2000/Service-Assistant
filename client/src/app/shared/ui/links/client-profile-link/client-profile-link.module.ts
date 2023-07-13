import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileLinkComponent } from './client-profile-link.component';
import { BasicLinkModule } from '../basic-link/basic-link.module';

@NgModule({
  declarations: [ClientProfileLinkComponent],
  imports: [CommonModule, BasicLinkModule],
  exports: [ClientProfileLinkComponent]
})
export class ClientProfileLinkModule {}
