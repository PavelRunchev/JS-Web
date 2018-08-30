import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { RemoveCourse } from '../store/actions/course.actions';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseState } from '../store/state/course.state';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  //courses$: Observable<Course>
  @Select(CourseState.getCourses) courses$: Observable<Course>
  
  constructor(private store: Store) {
      //this.courses$ = this.store.select(state => state.courses.courses)
  }

  delCourse(name) {
    this.store.dispatch(new RemoveCourse(name))
  }

  ngOnInit() {}
}
