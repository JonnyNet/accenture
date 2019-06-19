import { OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';

export abstract class AuthBase implements OnInit, OnDestroy {

    form: FormGroup;
    build: FormBuilder;
    service: AuthService;

    constructor(injector: Injector) {
        this.service = injector.get(AuthService);
        this.build = injector.get(FormBuilder);
    }

    abstract onInit();
    abstract onEnd();


    ngOnInit(): void {
        this.onInit();
    }

    ngOnDestroy(): void {
        this.onEnd();
    }

}
