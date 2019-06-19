import { Component, Injector } from '@angular/core';
import { AuthBase } from '../authbase';
import { Validators } from '@angular/forms';
import { chackIdValidator, ageCheckValidator } from '../custon.validators';
import { Helper } from 'src/app/shared/helper';



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
        console.log(this.form);
        if (this.form.valid) {
            let data = this.form.value;
            data.birthdate = Helper.formatDate(data.birthdate);
            this.service.insertClaint(data).subscribe((res: any) => {
                console.log(res);
                this.form.reset();
            });
        }
    }
}
