import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Course} from '../model/course';
import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
import {from, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import { CourseService } from '@/app/services/course.service';

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  courseId: string;

  form = this.fb.group({
    description: ['', Validators.required],
    category: ['BEGINNER', Validators.required],
    url: [''],
    longDescription: ['', Validators.required],
    promo: [false],
    promoStartAt: [null]
  });

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.courseId = this.afs.createId();
  }

  onCreateCourse() {
    const val = this.form.value;
    const newCourse: Partial<Course> = {
      description: val.description,
      categories: [val.category],
      url: val.url,
      longDescription: val.longDescription,
      promo: val.promo,
    };
    newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

    return this.courseService.createCourse(newCourse, this.courseId).pipe(
        tap((course) => {
          console.info('create:', course);
          this.router.navigateByUrl('/courses');
        }),
        catchError((err) => {
          console.error(err);
          alert('Could not create course');
          return throwError(err);
        })
      )
    .subscribe();
  }

}
