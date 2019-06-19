import { AuthService } from './auth.service';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';



export function chackIdValidator(service: AuthService) {
    return (control: AbstractControl) => {
        return service.getAllData().pipe(
            map(item => {
                const flag = item.includes(control.value.trim())
                return flag ? { 'checkId': flag } : null;
            })
        )
    }
}

export function ageCheckValidator(control: AbstractControl) {
    const value = control.value;
    if (control.value !== '' && control.value !== undefined && value instanceof Date) {
        const birthdate = control.value;
        const currentdate = new Date();
        const years = currentdate.getFullYear() - birthdate.getFullYear()
        return years < 18 ? { 'ageCheck': true } : null;
    }
    return null;
}