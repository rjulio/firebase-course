import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserRoles } from '@/app/model/user-roles';

@Injectable({ providedIn: 'root' })
export class UserService {
	isLoggedIn$: Observable<boolean>;
	isLoggedOut$: Observable<boolean>;
	pictureUrl$: Observable<string>;
	roles$: Observable<UserRoles>;

	constructor(
		private afAuth: AngularFireAuth,
		private router: Router
	) {
		this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
		this.isLoggedOut$ = afAuth.authState.pipe(map((user) => !user));
		this.pictureUrl$ = afAuth.authState.pipe(map((user) => user?.photoURL));
		this.roles$ = this.afAuth.idTokenResult.pipe(map((token) => <any>token?.claims ?? { admin: false }));
	}

	logout() {
		this.afAuth.signOut();
		this.router.navigateByUrl('/login');
	}
}