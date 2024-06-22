import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderByDirection } from '@firebase/firestore-types';

import { convertSnaps } from '@/app/services/db-utils';
import { Course } from '@/app/model/course';
import { Lesson } from '@/app/model/lesson';

@Injectable({ providedIn: 'root' })
export class CourseService {
	constructor(private db: AngularFirestore) {}

	loadAllCoursesByCategory(category: string): Observable<Course[]> {
		return this.db.collection(
			'courses',
			(ref) => ref.where('categories', 'array-contains', category).orderBy('seqNo')
		).get().pipe(map((snaps) => convertSnaps<Course>(snaps)))
	}

	updateCourse(courseId: string, changes: Partial<Course>): Observable<any> {
		return from(this.db.doc(`courses/${courseId}`).update(changes));
	}

	deleteCourseAnsLessons(courseId: string) {
		console.info({ courseId });
		return this.db.collection(`courses/${courseId}/lessons`)
			.get()
			.pipe(
				concatMap((results) => {
					const lessons = convertSnaps<Lesson>(results);
					const batch = this.db.firestore.batch();
					const courseRef = this.db.doc(`courses/${courseId}`).ref;

					for(let lesson of lessons) {
						const lessonRef = this.db.doc(`courses/${courseId}/lessons/${lesson.id}`).ref;
						batch.delete(lessonRef);
					}

					batch.delete(courseRef);
					return from(batch.commit());
				})
			)
	}

	delete(courseId: string) {
		return from(this.db.doc(`courses/${courseId}`).delete())
	}

	findCourseByUrl(courseUrl: string): Observable<Course | null> {
		return this.db.collection(
			'courses', 
			(ref) => ref.where('url', '==', courseUrl)
		)
		.get()
		.pipe(
			map((results) => {
				const courses = convertSnaps<Course>(results);
				return courses.length === 1 ? courses[0] : null;
			})
		)
	}

	findLessons(
		courseId: string, 
		sortOrder: OrderByDirection = 'asc', 
		pageNumber = 0, 
		pageSize = 3
	): Observable<Lesson[]> {
		return this.db.collection(
			`courses/${courseId}/lessons`,
			(ref) => ref.orderBy('seqNo', sortOrder).limit(pageSize).startAfter(pageNumber * pageSize)
		).get().pipe(
			map((results) => convertSnaps<Lesson>(results))
		)
	}

	createCourse(
		newCourse: Partial<Course>, 
		courseId?: string
	): any {
		return this.db.collection(
			'courses',
			(ref) => ref.orderBy('seqNo', 'desc').limit(1)
		).get().pipe(
			concatMap((result) => {
				const courses = convertSnaps<Course>(result);
				const lastCourseSeqNo = courses[0]?.seqNo ?? 0;
				const course = { ...newCourse, seqNo: lastCourseSeqNo + 1 };
				let save$: Observable<any>;

				if (courseId) {
					save$ = from(this.db.doc(`courses/${courseId}`).set(course));
				} else {
					save$ = from(this.db.collection('courses').add(course));
				}

				return save$.pipe(map((res) => ({
					id: courseId ?? res.id,
					...course
				})));
			})
		);
	}
}