import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServicesPanelComponent } from './panels/services-panel/services-panel.component';
import { ClientsPanelComponent } from './panels/clients-panel/clients-panel.component';
import { VehiclesPanelComponent } from './panels/vehicles-panel/vehicles-panel.component';
import { StatisticsPanelComponent } from './panels/statistics-panel/statistics-panel.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { TextInputComponent } from './shared/inputs/text-input/text-input.component';
import { PasswordInputComponent } from './shared/inputs/password-input/password-input.component';
import { DateInputComponent } from './shared/inputs/date-input/date-input.component';
import { ClientProfileComponent } from './profiles/client-profile/client-profile.component';
import { VehicleProfileComponent } from './profiles/vehicle-profile/vehicle-profile.component';
import { OrderProfileComponent } from './profiles/order-profile/order-profile.component';
import { ClientProfileLinkComponent } from './shared/links/client-profile-link/client-profile-link.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateAndTimePickerComponent } from './shared/date-and-time-picker/date-and-time-picker.component';
import { VehicleProfileLinkComponent } from './shared/links/vehicle-profile-link/vehicle-profile-link.component';
import { DateAndTimeInputComponent } from './shared/inputs/date-and-time-input/date-and-time-input.component';
import { StatusSelectorComponent } from './shared/inputs/selectors/status-selector/status-selector.component';
import { OrdersTableComponent } from './shared/tables/orders-table/orders-table.component';
import { VehiclesTableComponent } from './shared/tables/vehicles-table/vehicles-table.component';
import { ClientsTableComponent } from './shared/tables/clients-table/clients-table.component';
import { SendEmailLinkComponent } from './shared/links/send-email-link/send-email-link.component';
import { ClientSelectInputComponent } from './shared/inputs/selectors/client-select-input/client-select-input.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { CreateClientDialogComponent } from './shared/dialogs/create-client-dialog/create-client-dialog.component';
import { CreateVehicleDialogComponent } from './shared/dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { MailSendingDialogComponent } from './shared/dialogs/mail-sending-dialog/mail-sending-dialog.component';
import { ServicesTableComponent } from './shared/tables/services-table/services-table.component';
import { CreateServiceDialogComponent } from './shared/dialogs/create-service-dialog/create-service-dialog.component';
import { ProductsPanelComponent } from './panels/products-panel/products-panel.component';
import { ProductsTableComponent } from './shared/tables/products-table/products-table.component';
import { CreateProductDialogComponent } from './shared/dialogs/create-product-dialog/create-product-dialog.component';
import { ProductDeliveryDialogComponent } from './shared/dialogs/product-delivery-dialog/product-delivery-dialog.component';
import { ProductProfileComponent } from './profiles/product-profile/product-profile.component';
import { ProductProfileLinkComponent } from './shared/links/product-profile-link/product-profile-link.component';
import { CustomHeaderComponent } from './shared/custom-header/custom-header.component';
import { CreateOrderDialogComponent } from './shared/dialogs/create-order-dialog/create-order-dialog.component';
import { VehicleSelectInputComponent } from './shared/inputs/selectors/vehicle-select-input/vehicle-select-input.component';
import { ServiceSelectInputComponent } from './shared/inputs/selectors/service-select-input/service-select-input.component';
import { OrderServicesTableComponent } from './shared/tables/order-services-table/order-services-table.component';
import { OrderProductsTableComponent } from './shared/tables/order-products-table/order-products-table.component';
import { ProductSelectInputComponent } from './shared/inputs/selectors/product-select-input/product-select-input.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CoreModule } from './core/core.module';
import { OrdersPanelComponent } from './panels/orders-panel/orders-panel.component';
import { ErrorsModule } from './core/errors/errors.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    OrdersPanelComponent,
    ServicesPanelComponent,
    ClientsPanelComponent,
    VehiclesPanelComponent,
    StatisticsPanelComponent,
    SnackbarComponent,
    TextInputComponent,
    PasswordInputComponent,
    DateInputComponent,
    OrdersTableComponent,
    StatusSelectorComponent,
    ClientProfileComponent,
    VehicleProfileComponent,
    OrderProfileComponent,
    VehiclesTableComponent,
    ClientProfileLinkComponent,
    DateAndTimePickerComponent,
    VehicleProfileLinkComponent,
    DateAndTimeInputComponent,
    ClientsTableComponent,
    SendEmailLinkComponent,
    ClientSelectInputComponent,
    ConfirmDialogComponent,
    CreateClientDialogComponent,
    CreateVehicleDialogComponent,
    MailSendingDialogComponent,
    ServicesTableComponent,
    CreateServiceDialogComponent,
    ProductsPanelComponent,
    ProductsTableComponent,
    CreateProductDialogComponent,
    ProductDeliveryDialogComponent,
    ProductProfileComponent,
    ProductProfileLinkComponent,
    CustomHeaderComponent,
    CreateOrderDialogComponent,
    VehicleSelectInputComponent,
    ServiceSelectInputComponent,
    OrderServicesTableComponent,
    OrderProductsTableComponent,
    ProductSelectInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgxChartsModule,
    CoreModule,
    ErrorsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
