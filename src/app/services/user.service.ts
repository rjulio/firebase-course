import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
<<<<<<< HEAD
import { UserRoles } from '@/app/model/user-roles';
=======
>>>>>>> 6f15f874636ac142bdeee26e10953fd17c555c4a

@Injectable({ providedIn: 'root' })
export class UserService {
	isLoggedIn$: Observable<boolean>;
	isLoggedOut$: Observable<boolean>;
	pictureUrl$: Observable<string>;
<<<<<<< HEAD
	roles$: Observable<UserRoles>;
=======
>>>>>>> 6f15f874636ac142bdeee26e10953fd17c555c4a

	constructor(
		private afAuth: AngularFireAuth,
		private router: Router
	) {
		this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
		this.isLoggedOut$ = afAuth.authState.pipe(map((user) => !user));
		this.pictureUrl$ = afAuth.authState.pipe(map((user) => user?.photoURL));
<<<<<<< HEAD
		this.roles$ = this.afAuth.idTokenResult.pipe(map((token) => <any>token?.claims ?? { admin: false }));
=======
>>>>>>> 6f15f874636ac142bdeee26e10953fd17c555c4a
	}

	logout() {
		this.afAuth.signOut();
		this.router.navigateByUrl('/login');
	}
}