import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { map } from 'rxjs/operators';

describe('AuthService', () => {

    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        })

        service = TestBed.get(AuthService);
        httpMock = TestBed.get(HttpTestingController);
    });


    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it('validar identificacion', () => {
        const id = '1234';
        service.getAllData().pipe(
            map((item: any) => {
                return Object.keys(item).map(index => {
                    return item[index].identification
                });
            })
        ).subscribe((res: Array<string>) => {
            expect(res).toContain(id);
        });

        const req = httpMock.expectOne('https://testbankapi.firebaseio.com/clients.json');
        expect(req.request.method).toEqual('GET');

        req.flush({
            "-Lb_JtJG2xzkIAihkVwB": { identification: "123456789" },
            "-Lc4g5JntIRAycr8bBqR": { identification: "1234" }
        });

        httpMock.verify();
    });


    it('insertar datos cleinte', () => {
        const user = {
            identification: '123456765',
            firstname: 'wertytre',
            lastname: '1234567654',
            birthdate: '2008-09-22T14:01:54.9571247Z'
        };

        service.insertClaint(user).subscribe((res: any) => {
            expect(res).toBeTruthy();
        })

        const req = httpMock.expectOne('https://testbankapi.firebaseio.com/clients.json', 'insert');
        expect(req.request.method).toEqual('POST');

        req.flush({
            data: { uid: "-Lb_JtJG2xzkIAihkVwB" }
        });

        httpMock.verify();

    });

});

