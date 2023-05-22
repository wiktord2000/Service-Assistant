import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPanelComponent } from './services-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ServicesTableModule } from 'src/app/features/services/pages/services-table/services-table.module';
import { MatButtonModule } from '@angular/material/button';
import { ServicesPanelRoutingModule } from './services-panel-routing.module';
import { CreateServiceDialogModule } from '../../ui/create-service-dialog/create-service-dialog.module';

@NgModule({
  declarations: [ServicesPanelComponent],
  imports: [
    CommonModule,
    ServicesPanelRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    ServicesTableModule,
    CreateServiceDialogModule
  ]
})
export class ServicesPanelModule {}