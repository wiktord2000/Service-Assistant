import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductDialogComponent } from './create-product-dialog.component';
import { TextInputModule } from '../../../../shared/ui/inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CustomHeaderModule } from '../../../../shared/ui/custom-header/custom-header.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CreateProductDialogComponent],
  imports: [
    CommonModule,
    TextInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    CustomHeaderModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [CreateProductDialogComponent]
})
export class CreateProductDialogModule {}
