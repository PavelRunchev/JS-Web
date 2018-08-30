import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddCourse } from '../store/actions/course.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private store: Store) { }

  addCourse(name, url) {
    this.store.dispatch(new AddCourse({name: name, url: url}))
  }

  ngOnInit() {
  }

}
