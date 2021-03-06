import { OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { AppService } from '../app.service';

export abstract class AuthBase implements OnInit {

    form: FormGroup;
    build: FormBuilder;
    service: AuthService;
    app: AppService;

    constructor(injector: Injector) {
        this.service = injector.get(AuthService);
        this.build = injector.get(FormBuilder);
        this.app = injector.get(AppService);
    }

    abstract onInit();


    ngOnInit(): void {
        this.onInit();
    }

}
