import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CourseService } from '@/app/services/course.service';
import { OrderByDirection } from '@firebase/firestore-types';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  loading = false;
  course: Course;
  lessons: Lesson[];
  lastPageLoading: number = 0;
  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService) {

  }

  loadLessons(courseId, order: OrderByDirection = 'asc', lastPage = 0) {
    this.loading = true;
    return this.courseService.findLessons(this.course.id, order, lastPage)
      .pipe(
        finalize(() => this.loading = false)
      );
  }

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];
    this.loadLessons(this.course.id).subscribe((lessons) => this.lessons = lessons);
  }

  loadMore() {
    this.lastPageLoading++;
    this.loadLessons(this.course.id, 'asc', this.lastPageLoading).subscribe(
      (lessons) => this.lessons = this.lessons.concat(lessons)
    );
  }

}
