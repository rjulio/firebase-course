import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {EditCourseDialogComponent} from "../edit-course-dialog/edit-course-dialog.component";
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import { CourseService } from '@/app/services/course.service';
<<<<<<< HEAD
import { UserService } from '@/app/services/user.service';
=======
>>>>>>> 6f15f874636ac142bdeee26e10953fd17c555c4a

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    @Output()
    courseEdited = new EventEmitter();

    @Output()
    courseDeleted = new EventEmitter<Course>();

    constructor(
      private dialog: MatDialog,
      private router: Router,
<<<<<<< HEAD
      private courseService: CourseService,
      public user: UserService) {
=======
      private courseService: CourseService) {
>>>>>>> 6f15f874636ac142bdeee26e10953fd17c555c4a
    }

    ngOnInit() {

    }

    onDeleteCourse(course: Course) {
        this.courseService.deleteCourseAnsLessons(course.id).pipe(
            tap(() => {
                console.info('deleted: ', course);
                this.courseDeleted.emit();
            }),
            catchError((err) => {
                console.error('erro deleting: ', err);
                return throwError(err);
            })
        ).subscribe();
    }

    editCourse(course:Course) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = "400px";

        dialogConfig.data = course;

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe(val => {
                if (val) {
                    this.courseEdited.emit();
                }
            });

    }

}









