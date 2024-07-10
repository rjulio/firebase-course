import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private token: AuthTokenService) {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.token.authJwtToken) {
			const myHeaders = req.headers;
			myHeaders.set("Authorization", this.token.authJwtToken);
			// myHeaders.set("Access-Control-Allow-Origin", "*");

			const cloned = req.clone({
				headers: myHeaders
			});

			return next.handle(cloned);
		} else {
			return next.handle(req);
		}
	}
}