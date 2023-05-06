import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from './components/dialogs/confirm-dialog/confirm-dialog.module';
import { CreateOrderDialogModule } from '../orders/ui/create-order-dialog/create-order-dialog.module';
import { CreateProductDialogModule } from './components/dialogs/create-product-dialog/create-product-dialog.module';
import { CreateServiceDialogModule } from './components/dialogs/create-service-dialog/create-service-dialog.module';
import { CreateVehicleDialogModule } from './components/dialogs/create-vehicle-dialog/create-vehicle-dialog.module';
import { MailSendingDialogModule } from './components/dialogs/mail-sending-dialog/mail-sending-dialog.module';
import { ProductDeliveryDialogModule } from './components/dialogs/product-delivery-dialog/product-delivery-dialog.module';
import { SnackbarModule } from './components/snackbar/snackbar.module';

const DIALOG_MODULES = [
  ConfirmDialogModule,
  CreateOrderDialogModule,
  CreateProductDialogModule,
  CreateServiceDialogModule,
  CreateVehicleDialogModule,
  MailSendingDialogModule,
  ProductDeliveryDialogModule
];

@NgModule({
  imports: [DIALOG_MODULES, SnackbarModule],
  exports: [DIALOG_MODULES, SnackbarModule]
})
export class SharedModule {}
