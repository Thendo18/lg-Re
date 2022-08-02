import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { LoginComponent } from './Pages/login/login.component';
// import { RegisterComponent } from './Pages/register/register.component';

const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full'},
{path:'login', component: LoginComponent, pathMatch: 'full' },
{path:'landing', component: LandingComponent,  pathMatch: 'full' },
// { path: 'register', component: RegisterComponent, pathMatch: 'full' },
{path: 'register', component: AuthComponent},
{path:'**', redirectTo: '', pathMatch: 'full'}
// {path: 'register', component: RegisterComponent},
// {path: 'create', component: RegisterComponent},
// {path: '', redirectTo: 'clients', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
