import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

import { CoursesCardListComponent } from '@/app/courses-card-list/courses-card-list.component';
import { CourseService } from '@/app/services/course.service';
<<<<<<< HEAD
import { UserService } from '@/app/services/user.service';
=======
>>>>>>> 6f15f874636ac142bdeee26e10953fd17c555c4a

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
      private router: Router,
<<<<<<< HEAD
      private courseService: CourseService,
      public user: UserService) {
=======
      private courseService: CourseService) {
>>>>>>> 6f15f874636ac142bdeee26e10953fd17c555c4a
    }

    ngOnInit() {
        this.reloadCourses();
    }

    reloadCourses() {
        this.beginnersCourses$ = this.courseService.loadAllCoursesByCategory('BEGINNER');
        this.advancedCourses$ = this.courseService.loadAllCoursesByCategory('ADVANCED');
    }

}
