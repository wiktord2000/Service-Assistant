import { AuthGuard } from './_guards/auth.guard';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
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
      {path: "statistics", component: StatisticsPanelComponent}
    ]
  },
  {path: "**", component: LoginComponent, pathMatch: 'full'}   //when path doesn't match 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
