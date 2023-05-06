import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { ProductsPanelModule } from './panels/products-panel/products-panel.module';
import { ServicesPanelModule } from './panels/services-panel/services-panel.module';
import { VehiclesPanelModule } from './panels/vehicles-panel/vehicles-panel.module';
import { StatisticsPanelModule } from './panels/statistics-panel/statistics-panel.module';
import { ProductProfileModule } from './profiles/product-profile/product-profile.module';
import { VehicleProfileModule } from './profiles/vehicle-profile/vehicle-profile.module';
import { NotFoundModule } from './errors/not-found/not-found.module';
import { ServerErrorModule } from './errors/server-error/server-error.module';
import { TestErrorsModule } from './errors/test-errors/test-errors.module';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // General
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    // Auth
    LoginModule,
    RegisterModule,
    // Panels
    ServicesPanelModule,
    ProductsPanelModule,
    VehiclesPanelModule,
    StatisticsPanelModule,
    // Profiles
    ProductProfileModule,
    VehicleProfileModule,
    // Errors
    NotFoundModule,
    ServerErrorModule,
    TestErrorsModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' } // makes local names e.g. DECEMBER - GRUDZIEN (inside calendar)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
