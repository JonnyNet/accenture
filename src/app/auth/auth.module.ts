import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { MatDatepickerModule } from '@angular/material';


@NgModule({
    declarations: [RegisterComponent],
    imports: [
        AuthRoutingModule,
        SharedModule
    ],
    providers: [MatDatepickerModule]
})
export class AuthModule { }
