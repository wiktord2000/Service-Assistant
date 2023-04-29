import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateServiceDialogComponent } from './create-service-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TextInputModule } from '../../inputs/text-input/text-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [CreateServiceDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TextInputModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  exports: [CreateServiceDialogComponent]
})
export class CreateServiceDialogModule {}
