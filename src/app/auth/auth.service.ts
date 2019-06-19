import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private readonly server = 'https://testbankapi.firebaseio.com/clients.json';

	constructor(private http: HttpClient) { }

	getAllData() {
		return this.http.get(this.server).pipe(
			map((item: any) => {
				return Object.keys(item).map(index => {
					return item[index].identification
				});
			})
		);
	}

	insertClaint(client: any) {
		return this.http.post(this.server, client);
	}
}
