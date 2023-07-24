import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductProfileLinkComponent } from './product-profile-link.component';
import { BasicLinkModule } from '../basic-link/basic-link.module';

@NgModule({
  declarations: [ProductProfileLinkComponent],
  imports: [CommonModule, BasicLinkModule],
  exports: [ProductProfileLinkComponent]
})
export class ProductProfileLinkModule {}
