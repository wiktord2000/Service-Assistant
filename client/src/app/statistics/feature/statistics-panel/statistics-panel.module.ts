import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsPanelComponent } from './statistics-panel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CustomHeaderModule } from 'src/app/shared/components/custom-header/custom-header.module';
import { ClientProfileLinkModule } from 'src/app/shared/components/links/client-profile-link/client-profile-link.module';
import { StatisticsPanelRoutingModule } from './statistics-panel-routing.module';

@NgModule({
  declarations: [StatisticsPanelComponent],
  imports: [
    CommonModule,
    StatisticsPanelRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    NgxChartsModule,
    CustomHeaderModule,
    ClientProfileLinkModule
  ],
  exports: [StatisticsPanelComponent]
})
export class StatisticsPanelModule {}
