import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProfileLinkComponent } from './order-profile-link.component';
import { BasicLinkModule } from '../basic-link/basic-link.module';

@NgModule({
  declarations: [OrderProfileLinkComponent],
  imports: [CommonModule, BasicLinkModule],
  exports: [OrderProfileLinkComponent]
})
export class OrderProfileLinkModule {}
