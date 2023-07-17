import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleProfileLinkComponent } from './vehicle-profile-link.component';
import { BasicLinkModule } from '../basic-link/basic-link.module';

@NgModule({
  declarations: [VehicleProfileLinkComponent],
  imports: [CommonModule, BasicLinkModule],
  exports: [VehicleProfileLinkComponent]
})
export class VehicleProfileLinkModule {}
