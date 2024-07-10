import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { environment } from '@/environments/environment';

@Component({
  selector: 'create-user',
  templateUrl: 'create-user.component.html',
  styleUrls: ['create-user.component.css']
})
export class CreateUserComponent {

    form = this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        admin: [false]
    });

  constructor(
      private fb: FormBuilder,
      private http: HttpClient) {

  }

    onCreateUser() {
        const user = this.form.value;
        console.log(user);

        this.http.post(
          environment.api.createUser, 
          {
            data: {
              email: user.email,
              password: user.password,
              admin: user.admin
            },
            withCredentials: true
          }).pipe(
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        ).subscribe(() => {
          console.info('User created');
          this.form.reset();
        });
    }

}
