import { NgModule } from '@angular/core';
import { SnackbarModule } from './ui/snackbar/snackbar.module';
import { ConfirmDialogModule } from './ui/confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [ConfirmDialogModule, SnackbarModule],
  exports: [ConfirmDialogModule, SnackbarModule]
})
export class SharedModule {}
