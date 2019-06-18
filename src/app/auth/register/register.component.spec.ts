import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { from } from 'rxjs';
import { DebugElement, Query } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;
	let de : DebugElement;
	let el : HTMLElement;

	const formBuilder: FormBuilder = new FormBuilder();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				RegisterComponent
			],
			imports: [
				CommonModule,
				ReactiveFormsModule,
				HttpClientTestingModule
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
		expect(errors['minLength']).toBeTruthy();
		expect(errors['maxLength']).toBeTruthy();
		expect(errors['pattern']).toBeTruthy();


		identification.clearAsyncValidators();
		identification.setValue('1047389512');
		identification.setAsyncValidators(mockPartnerCodeAvailabilityValidator.bind(this))
		errors = identification.errors || {};

		expect(errors['required']).toBeTruthy();
		expect(errors['minLength']).toBeTruthy();
		expect(errors['maxLength']).toBeTruthy();
		expect(errors['pattern']).toBeTruthy();
		expect(errors['checkId']).toBeTruthy();

	});


	it('campo firstname', () => {
		let firstname = component.form.get('firstname');
		expect(firstname.valid).toBeFalsy();

		let errors = {};
		errors = firstname.errors || {};
		expect(errors['required']).toBeTruthy();

		firstname.setValue('jonny');
		errors = firstname.errors || {};

		expect(errors['required']).toBeTruthy();

	});


	it('campo lastName', () => {
		let lastName = component.form.get('lastName');
		expect(lastName.valid).toBeFalsy();

		let errors = {};
		errors = lastName.errors || {};
		expect(errors['required']).toBeTruthy();

		lastName.setValue('rojas del rio');
		errors = lastName.errors || {};

		expect(errors['required']).toBeTruthy();
	});


	it('campo birthdate', () => {
		let birthdate = component.form.get('birthdate');
		expect(birthdate.valid).toBeFalsy();

		let errors = {};
		errors = birthdate.errors || {};
		expect(errors['required']).toBeTruthy();
		expect(errors['ageCheck']).toBeTruthy();

		birthdate.setValue('2008-09-22T14:01:54.9571247Z');
		errors = birthdate.errors || {};

		expect(errors['required']).toBeTruthy();
		expect(errors['ageCheck']).toBeTruthy();
	});

	it('formulario valido con datos', () => {
		expect(component.form.valid).toBeFalsy();
		component.form.pathValue({
			identification : '12345676543',
			firstname : 'wertytre',
			lastName : '1234567654',
			birthdate : '2008-09-22T14:01:54.9571247Z'
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


export async function mockPartnerCodeAvailabilityValidator(control: AbstractControl) {
	return from(new Promise((resolve, reject) => {
		const data = '1234567890';
		const result = data == control.value;
		result ? resolve({ checkId: true }) : resolve(null);
	}));
}