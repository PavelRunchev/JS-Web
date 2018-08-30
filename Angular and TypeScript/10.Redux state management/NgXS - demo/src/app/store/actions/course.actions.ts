import { Course } from '../../models/course.model';

export class AddCourse {
    static readonly type = '[COURSE] Add'

    constructor(public payload: Course) {}
}

export class RemoveCourse {
    static readonly type = '[COURSE] Remove'

    constructor(public payload: string) {}
}