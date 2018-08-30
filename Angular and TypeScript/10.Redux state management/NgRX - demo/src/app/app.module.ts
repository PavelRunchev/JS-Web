import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from './store/reducers/courses.reducer';
import { CreateCourseComponent } from './components/create-course.components';
import { ListCoursesComponent } from './components/list-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCourseComponent,
    ListCoursesComponent
  ],
  imports: [
  
  BrowserModule,
    StoreModule.forRoot({
      courses: coursesReducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
