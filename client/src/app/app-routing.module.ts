import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { OrdersPanelComponent } from './panels/orders-panel/orders-panel.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "orders", component: OrdersPanelComponent},
  {path: "**", component: LoginComponent, pathMatch: 'full'}   //when path doesn't match 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
