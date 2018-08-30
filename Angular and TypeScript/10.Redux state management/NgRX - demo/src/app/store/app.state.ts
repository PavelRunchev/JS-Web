import { Course } from "../models/course.mode";

export interface AppState {
    readonly courses: Course[],
}