import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipes';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyDHG3cjUYwnK76wjLltAaIsn8HQ5LR1fWU",
      authDomain: "ng-recipes-74175.firebaseapp.com",
    });
  }
}
