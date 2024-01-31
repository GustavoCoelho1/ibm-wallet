import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { DashboardComponent } from './components/pages/auth/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { CategoriesComponent } from './components/pages/auth/categories/categories.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'auth/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'auth/categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
