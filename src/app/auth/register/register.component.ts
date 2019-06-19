import { Component, Injector } from '@angular/core';
import { AuthBase } from '../authbase';
import { Validators } from '@angular/forms';
import { chackIdValidator, ageCheckValidator } from '../custon.validators';
import { Helper } from 'src/app/shared/helper';
import { TypeSnotify } from 'src/app/app.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AuthBase {

    constructor(injector: Injector) {
        super(injector);
    }

    onInit() {
        this.form = this.build.group({
            identification: ['', {
                validators: [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(10),
                    Validators.pattern(/^\-?\d+$/)],
                asyncValidators: [chackIdValidator(this.service)],
                updateOn: 'blur'
            }],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            birthdate: ['', [Validators.required, ageCheckValidator]]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.app.showSpinner(true);
            let data = this.form.value;
            data.birthdate = Helper.formatDate(data.birthdate);
            this.service.insertClaint(data).subscribe((res: any) => {
                console.log(res);
                this.app.showSpinner(false);
                this.form.reset();
                this.app.showSnotify(TypeSnotify.SUCCESS, 'Bienvenido', 'mensaje de bienvenida')
            }, err => {
                console.log(err);
                this.app.showSpinner(false);
                this.app.showSnotify(TypeSnotify.ERROR, 'Error', 'error al guardar, intente mas tarde')
            });
        }
    }
}
