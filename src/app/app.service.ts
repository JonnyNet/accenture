import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum TypeSnotify {
    ERROR = 'error',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning'
}


@Injectable({
    providedIn: 'root'
})
export class AppService {

    private subject1: Subject<boolean> = new Subject<boolean>();
    private subject2: Subject<any> = new Subject<any>();

    constructor() { }

    public showSpinner(sw: boolean) {
        this.subject1.next(sw);
    }

    public showSnotify(type: TypeSnotify, title: string, message: string, timeout: number = 3000) {
        this.subject2.next({
            type: type,
            title: title,
            message: message,
            timeout: timeout
        });
    }

    public getEventSpinner(): Observable<boolean> {
        return this.subject1.asObservable();
    }

    public getEventSnotify(): Observable<boolean> {
        return this.subject2.asObservable();
    }

}
