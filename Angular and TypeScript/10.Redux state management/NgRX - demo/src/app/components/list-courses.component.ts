import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { Course } from '../models/course.mode';
import { RemoveCourse } from '../store/actions/courses.actions';

@Component({
    selector: 'list-courses',
    templateUrl: './list-courses.component.html'
})
export class ListCoursesComponent implements OnInit {
    courses: Observable<Course[]>

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.courses = this.store.select(state => state.courses);
    }

    delCourse(index) {
        this.store.dispatch(new RemoveCourse(index));
    }

}