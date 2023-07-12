import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLinkComponent } from './basic-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BasicLinkComponent],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule, RouterModule],
  exports: [BasicLinkComponent]
})
export class BasicLinkModule {}
