import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductProfileLinkComponent } from './product-profile-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductProfileLinkComponent],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, RouterModule],
  exports: [ProductProfileLinkComponent]
})
export class ProductProfileLinkModule {}
