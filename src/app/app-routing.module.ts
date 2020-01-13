import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
    { path: 'login-page', component: LoginPageComponent },
    { path: '',redirectTo: '/login-page',pathMatch: 'full'},
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
