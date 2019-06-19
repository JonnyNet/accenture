import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatProgressSpinnerModule } from '@angular/material';


@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SnotifyModule,
        MatProgressSpinnerModule
    ],
    providers: [
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
