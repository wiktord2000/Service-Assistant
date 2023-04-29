import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesPanelComponent } from './services-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ServicesTableModule } from 'src/app/shared/components/tables/services-table/services-table.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ServicesPanelComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    ServicesTableModule
  ],
  exports: [ServicesPanelComponent]
})
export class ServicesPanelModule {}
