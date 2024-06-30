import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

import { CoursesCardListComponent } from '@/app/courses-card-list/courses-card-list.component';
import { CourseService } from '@/app/services/course.service';
import { UserService } from '@/app/services/user.service';

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
      private courseService: CourseService,
      public user: UserService) {
    }

    ngOnInit() {
        this.reloadCourses();
    }

    reloadCourses() {
        this.beginnersCourses$ = this.courseService.loadAllCoursesByCategory('BEGINNER');
        this.advancedCourses$ = this.courseService.loadAllCoursesByCategory('ADVANCED');
    }

}
