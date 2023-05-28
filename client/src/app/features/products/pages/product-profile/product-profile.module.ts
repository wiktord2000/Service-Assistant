import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductProfileRoutingModule } from './product-profile-routing.module';
import { ProductProfileComponent } from './product-profile.component';

@NgModule({
  declarations: [ProductProfileComponent],
  imports: [CommonModule, ProductProfileRoutingModule, MatIconModule, MatTabsModule]
})
export class ProductProfileModule {}
