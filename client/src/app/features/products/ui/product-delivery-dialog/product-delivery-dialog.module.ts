import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDeliveryDialogComponent } from './product-delivery-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputModule } from '../../../../shared/ui/inputs/date-input/date-input.module';
import { TextInputModule } from '../../../../shared/ui/inputs/text-input/text-input.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductDeliveryDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    DateInputModule,
    TextInputModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [ProductDeliveryDialogComponent]
})
export class ProductDeliveryDialogModule {}
