import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './_material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AddressFormExampleComponent } from './examples/address-form-example/address-form-example.component';
import { TableExampleComponent } from './examples/table-example/table-example.component';
import { DashboardComponent } from './examples/dashboard/dashboard.component';
import { TreeExampleComponent } from './examples/tree-example/tree-example.component';
import { DragDropExampleComponent } from './examples/drag-drop-example/drag-drop-example.component'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersPanelComponent } from './panels/orders-panel/orders-panel.component';

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
    OrdersPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]  // The set of components that are loaded when this module is loaded. AppComponent contains all components which we crea. 
})
export class AppModule { }
