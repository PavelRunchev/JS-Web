import { Course } from '../../models/course.mode';
import * as CoursesActions from '../actions/courses.actions';

const initialState: Course[] = [
    { name: 'Angular Redux', url: 'http://google.com' },
    { name: 'React Redux', url: 'http://react.com' },
    { name: 'Node JS', url: 'http://npm.com' },
];

//pure function!!!
function addCourse(state: Course[], course) {
    return [...state, course];
}

function removeCourse(state: Course[], index) {
    const courseToRemove = state[index];
    return [...state.filter(c => c != courseToRemove)];
}

export function coursesReducer(
    state: Course[] = initialState, 
    action: CoursesActions.Types) {
        switch(action.type) {
            case CoursesActions.ADD_COURSE:
                return addCourse(state, action.payload);
            case CoursesActions.REMOVE_COURSE:
                return removeCourse(state, action.payload);
            default:
                return state;
        }

}