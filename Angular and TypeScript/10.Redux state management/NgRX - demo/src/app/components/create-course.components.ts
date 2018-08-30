
import { Component } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { AddCourse } from './../store/actions/courses.actions';

@Component({
    selector: 'create-course',
    templateUrl: './create-course.component.html'
})
export class CreateCourseComponent {
    constructor(
        private store: Store<AppState>
    ) { }

    addCourse(name, url) {
        this.store.dispatch(new AddCourse({name, url}))
    }
 }