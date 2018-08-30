// Section 1
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Course } from '../../models/course.model';
import { AddCourse, RemoveCourse } from '../actions/course.actions';

// Section 2
export class CourseStateModel {
    courses: Course[];
}

// Section 3
@State<CourseStateModel>({
    name: 'courses',
    defaults: {
      courses: []
    }
})
export class CourseState {
  // Section 4
  @Selector()
  static getCourses(state: CourseStateModel) {
      return state.courses
  }

  // Section 5
  @Action(AddCourse)
  add({getState, patchState }: StateContext<CourseStateModel>,
     { payload }:AddCourse) {
      const state = getState();
      patchState({
          courses: [...state.courses, payload]
      })
  }

  @Action(RemoveCourse)
  remove({getState, patchState }: StateContext<CourseStateModel>, { payload }
    :RemoveCourse) {
      patchState({
          courses: getState().courses.filter(a => a.name != payload)
      })
  }

}