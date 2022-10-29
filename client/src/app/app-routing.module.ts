import { ClientProfileComponent } from './profiles/client-profile/client-profile.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './_guards/auth.guard';
import { OrdersPanelComponent } from './panels/orders-panel/orders-panel.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPanelComponent } from './panels/services-panel/services-panel.component';
import { ClientsPanelComponent } from './panels/clients-panel/clients-panel.component';
import { VehiclesPanelComponent } from './panels/vehicles-panel/vehicles-panel.component';
import { PartsPanelComponent } from './panels/parts-panel/parts-panel.component';
import { StatisticsPanelComponent } from './panels/statistics-panel/statistics-panel.component';
import { VehicleProfileComponent } from './profiles/vehicle-profile/vehicle-profile.component';
import { OrderProfileComponent } from './profiles/order-profile/order-profile.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {
    path: "",
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: "orders", component: OrdersPanelComponent},
      {path: "services", component: ServicesPanelComponent},
      {path: "clients", component: ClientsPanelComponent},
      {path: "vehicles", component: VehiclesPanelComponent},
      {path: "parts", component: PartsPanelComponent},
      {path: "statistics", component: StatisticsPanelComponent},
      {path: "clients/:id", component: ClientProfileComponent},
      {path: "vehicles/:id", component: VehicleProfileComponent},
      {path: "orders/:id", component: OrderProfileComponent}
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: "**", component: NotFoundComponent, pathMatch: 'full'}   //when path doesn't match 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
