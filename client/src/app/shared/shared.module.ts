import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from './ui/dialogs/confirm-dialog/confirm-dialog.module';
import { SnackbarModule } from './ui/snackbar/snackbar.module';

@NgModule({
  imports: [ConfirmDialogModule, SnackbarModule],
  exports: [ConfirmDialogModule, SnackbarModule]
})
export class SharedModule {}
