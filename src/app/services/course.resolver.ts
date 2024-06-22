import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CourseService } from '@/app/services/course.service';
import { Course } from '@/app/model/course';

@Injectable({ providedIn: 'root' })
export class CourseResolver implements Resolve<Course> {
	constructor(private courseService: CourseService) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
		const courseUrl = route.paramMap.get('courseUrl');
		return this.courseService.findCourseByUrl(courseUrl);
	}
}