import { AuthService } from './auth.service';
import { AbstractControl } from '@angular/forms';



export function chackIdValidator(service: AuthService) {
    return (control: AbstractControl) => {
        console.log(control.value);

    }
}

export function ageCheckValidator(control: AbstractControl) {
    if (control.value !== '' && control.value !== undefined) {
        const birthdate = control.value;
        const currentdate = new Date();
        const years = currentdate.getFullYear() - birthdate.getFullYear()

        return years < 18 ? { 'ageCheck': true } : null;
    }
    return null;
}