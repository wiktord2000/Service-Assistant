import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { SharedModule } from './_modules/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './_modules/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AddressFormExampleComponent } from './examples/address-form-example/address-form-example.component';
import { TableExampleComponent } from './examples/table-example/table-example.component';
import { DashboardComponent } from './examples/dashboard/dashboard.component';
import { TreeExampleComponent } from './examples/tree-example/tree-example.component';
import { DragDropExampleComponent } from './examples/drag-drop-example/drag-drop-example.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersPanelComponent } from './panels/orders-panel/orders-panel.component';
import { ServicesPanelComponent } from './panels/services-panel/services-panel.component';
import { ClientsPanelComponent } from './panels/clients-panel/clients-panel.component';
import { VehiclesPanelComponent } from './panels/vehicles-panel/vehicles-panel.component';
import { PartsPanelComponent } from './panels/parts-panel/parts-panel.component';
import { StatisticsPanelComponent } from './panels/statistics-panel/statistics-panel.component';
import { SnackbarComponent } from './_shared/snackbar/snackbar.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { PasswordInputComponent } from './_forms/password-input/password-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { ClientProfileComponent } from './profiles/client-profile/client-profile.component';
import { VehicleProfileComponent } from './profiles/vehicle-profile/vehicle-profile.component';
import { OrderProfileComponent } from './profiles/order-profile/order-profile.component';
import { ClientProfileLinkComponent } from './_shared/client-profile-link/client-profile-link.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateAndTimePickerComponent } from './_shared/date-and-time-picker/date-and-time-picker.component';
import { VehicleProfileLinkComponent } from './_shared/vehicle-profile-link/vehicle-profile-link.component';
import { DateAndTimeInputComponent } from './_forms/date-and-time-input/date-and-time-input.component';
import { StatusSelectorComponent } from './_shared/tables/orders-table/status-selector/status-selector.component';
import { OrdersTableComponent } from './_shared/tables/orders-table/orders-table.component';
import { VehiclesTableComponent } from './_shared/tables/vehicles-table/vehicles-table.component';
import { ClientsTableComponent } from './_shared/tables/clients-table/clients-table.component';
import { SendEmailLinkComponent } from './_shared/send-email-link/send-email-link.component';
import { ClientSelectInputComponent } from './_forms/client-select-input/client-select-input.component';


// Let application know what you use in project e.g. components or another modules
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddressFormExampleComponent,
    TableExampleComponent,
    DashboardComponent,
    TreeExampleComponent,
    DragDropExampleComponent,
    LoginComponent,
    RegisterComponent,
    OrdersPanelComponent,
    ServicesPanelComponent,
    ClientsPanelComponent,
    VehiclesPanelComponent,
    PartsPanelComponent,
    StatisticsPanelComponent,
    SnackbarComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
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
    ClientSelectInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]  // The set of components that are loaded when this module is loaded. AppComponent contains all components which we crea. 
})
export class AppModule { }