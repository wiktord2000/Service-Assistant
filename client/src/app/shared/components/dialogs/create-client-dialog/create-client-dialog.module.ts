import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClientDialogComponent } from './create-client-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TextInputModule } from '../../inputs/text-input/text-input.module';

@NgModule({
  declarations: [CreateClientDialogComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    TextInputModule
  ],
  exports: [CreateClientDialogComponent]
})
export class CreateClientDialogModule {}
