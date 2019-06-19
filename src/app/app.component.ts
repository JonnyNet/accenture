import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    private subscription = new Array<Subscription>();
    isRequest: boolean = false;

    constructor(
        private appservice: AppService,
        private snotifyService: SnotifyService
    ) { }


    ngOnInit(): void {
        this.subscription.push(this.appservice.getEventSpinner().subscribe((event: boolean) => {
            this.isRequest = event;
        }));

        this.subscription.push(this.appservice.getEventSnotify().subscribe((event: any) => {
            this.showSnotify(event);
        }));
    }

    private showSnotify(data: any) {
        this.snotifyService[data.type](data.message, data.title, {
            showProgressBar: true,
            closeOnClick: true,
            timeout: data.timeout
        });
    }

    ngOnDestroy(): void {
        this.subscription.forEach(subs => {
            subs.unsubscribe();
        })
    }

}
