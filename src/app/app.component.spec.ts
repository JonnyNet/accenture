import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SnotifyService, ToastDefaults, SnotifyModule } from 'ng-snotify';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SnotifyModule,
                SharedModule
            ],
            declarations: [
                AppComponent,
                NavbarComponent,
                SpinnerComponent,
            ],
            providers: [
                SnotifyService,
                { provide: 'SnotifyToastConfig', useValue: ToastDefaults }
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
