import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  exports: [SnackbarComponent]
})
export class SnackbarModule {}
