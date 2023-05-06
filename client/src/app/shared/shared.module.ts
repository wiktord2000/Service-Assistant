import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from './components/dialogs/confirm-dialog/confirm-dialog.module';
import { CreateVehicleDialogModule } from './components/dialogs/create-vehicle-dialog/create-vehicle-dialog.module';
import { MailSendingDialogModule } from './components/dialogs/mail-sending-dialog/mail-sending-dialog.module';
import { SnackbarModule } from './components/snackbar/snackbar.module';

const DIALOG_MODULES = [ConfirmDialogModule, CreateVehicleDialogModule, MailSendingDialogModule];

@NgModule({
  imports: [DIALOG_MODULES, SnackbarModule],
  exports: [DIALOG_MODULES, SnackbarModule]
})
export class SharedModule {}
