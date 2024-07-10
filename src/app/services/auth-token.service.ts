import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
	authJwtToken: string;

	constructor(private sfAuth: AngularFireAuth) {
		sfAuth.idToken.subscribe(jwt => this.authJwtToken = jwt);
	}
}