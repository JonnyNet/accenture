import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { from, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DebugElement, Query } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatInputModule, MatFormFieldControl, MatFormFieldModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	const formBuilder: FormBuilder = new FormBuilder();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				RegisterComponent
			],
			imports: [
				CommonModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				HttpClientTestingModule,
				MatInputModule,
				MatFormFieldModule,
				MatIconModule
			],
			providers: [
				AuthService,
				{ provide: FormBuilder, useValue: formBuilder }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;

		component.ngOnInit();

		de = fixture.debugElement.query(By.css('form'));
		el = de.nativeElement;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('formulario invalido vacio', () => {
		expect(component.form.valid).toBeFalsy();
	});

	it('campo identification', () => {
		let identification = component.form.get('identification');
		expect(identification.valid).toBeFalsy();

		let errors = {};
		errors = identification.errors || {};
		expect(errors['required']).toBeTruthy();
		expect(errors['minLength']).toBeFalsy();
		expect(errors['maxLength']).toBeUndefined();
		expect(errors['pattern']).toBeUndefined();
		expect(errors['checkId']).toBeUndefined();


		identification.clearAsyncValidators();
		identification.setAsyncValidators(mockPartnerCodeAvailabilityValidator.bind(this))
		identification.setValue('1047389512');
		errors = identification.errors || {};

		expect(errors['required']).toBeUndefined();
		expect(errors['minLength']).toBeUndefined();
		expect(errors['maxLength']).toBeUndefined();
		expect(errors['pattern']).toBeUndefined();
		expect(errors['checkId']).toBeUndefined();
	});


	it('campo firstname', () => {
		let firstname = component.form.get('firstname');
		expect(firstname.valid).toBeFalsy();

		let errors = {};
		errors = firstname.errors || {};
		expect(errors['required']).toBeTruthy();

		firstname.setValue('jonny rojas');
		errors = firstname.errors || {};

		expect(errors['required']).toBeUndefined();

	});


	it('campo lastName', () => {
		let lastname = component.form.get('lastname');
		expect(lastname.valid).toBeFalsy();

		let errors = {};
		errors = lastname.errors || {};
		expect(errors['required']).toBeTruthy();

		lastname.setValue('rojas del rio');
		errors = lastname.errors || {};

		expect(errors['required']).toBeUndefined();
	});


	it('campo birthdate', () => {
		let birthdate = component.form.get('birthdate');
		expect(birthdate.valid).toBeFalsy();

		let errors = {};
		errors = birthdate.errors || {};
		expect(errors['required']).toBeTruthy();
		expect(errors['ageCheck']).toBeUndefined();

		birthdate.setValue('2008-09-22T14:01:54.9571247Z');
		errors = birthdate.errors || {};

		expect(errors['required']).toBeUndefined();
		expect(errors['ageCheck']).toBeUndefined();
	});

	it('formulario valido con datos', () => {
		expect(component.form.valid).toBeFalsy();
		component.form.patchValue({
			identification: '123456765',
			firstname: 'wertytre',
			lastname: '1234567654',
			birthdate: '2008-09-22T14:01:54.9571247Z'
		});
		expect(component.form.valid).toBeTruthy();
	});


	it('enviar formulario', () => {
		spyOn(component, 'onSubmit');
		el = fixture.debugElement.query(By.css('button')).nativeElement;
		el.click();
		expect(component.onSubmit).toHaveBeenCalledTimes(0);
	});
});


function mockPartnerCodeAvailabilityValidator(control: AbstractControl) {
	return from(new Promise(res => {
		const data = '1047389512';
		const result = data == control.value;
		const output: any = result ? { checkId: true } : null;
		res(output);
	}));
}