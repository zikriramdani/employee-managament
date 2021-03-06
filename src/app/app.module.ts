import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CurrencyPipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, } from '@angular/material';
import 'hammerjs';

// used to create fake backend
import { fakeBackendProvider } from 'src/app/helpers';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/helpers';

import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { AlertComponent } from 'src/app/master/alert/alert.component';
import { FooterComponent } from 'src/app/master/footer/footer.component';

// Pages
import { EmployeeComponent } from 'src/app/employee/employee.component';
import { AddEmployeeComponent } from 'src/app/employee/addemployee/addemployee.component';
import { DetailsEmployeeComponent } from 'src/app/employee/detailsemployee/detailsemployee.component';
import { EditEmployeeComponent } from 'src/app/employee/editemployee/editemployee.component';

// Routing Module
import { AppRoutingModule } from 'src/app/app.routing.module';

// Number
import { AllowDecimalNumberDirective } from 'src/app/shared/allow-decimal.directive';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        FooterComponent,

        // Pages
        EmployeeComponent,
        AddEmployeeComponent,
        DetailsEmployeeComponent,
        EditEmployeeComponent,

        // Number
        AllowDecimalNumberDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        
        BrowserAnimationsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule, 
        MatPaginatorModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider,

        MatDatepickerModule,
        MatNativeDateModule,
        // CurrencyPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
