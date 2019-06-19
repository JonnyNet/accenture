import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';
import { RegisterComponent } from './register.component';


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
				SharedModule,
				BrowserAnimationsModule,
				HttpClientTestingModule,
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