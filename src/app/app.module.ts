import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardComponent } from './components/pages/auth/dashboard/dashboard.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { UpdateMoneyTransactionComponent } from './components/pages/auth/dashboard/components/update-money-transaction/update-money-transaction.component';
import { DeleteMoneyTransactionComponent } from './components/pages/auth/dashboard/components/delete-money-transaction/delete-money-transaction.component';
import { SaveMoneyTransactionComponent } from './components/pages/auth/dashboard/components/save-money-transaction/save-money-transaction.component';
import { SaveLargeScaleMoneyTransactionComponent } from './components/pages/auth/dashboard/components/save-large-scale-money-transaction/save-large-scale-money-transaction.component';
import { SaveCategoryComponent } from './components/pages/auth/categories/components/save-category/save-category.component';
import { UpdateCategoryComponent } from './components/pages/auth/categories/components/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/pages/auth/categories/components/delete-category/delete-category.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        ModalComponent,
        DashboardComponent,
        LoginComponent,
        SignupComponent,
        UpdateMoneyTransactionComponent,
        DeleteMoneyTransactionComponent,
        SaveMoneyTransactionComponent,
        SaveLargeScaleMoneyTransactionComponent,
        SaveCategoryComponent,
        UpdateCategoryComponent,
        DeleteCategoryComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    providers: [AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
