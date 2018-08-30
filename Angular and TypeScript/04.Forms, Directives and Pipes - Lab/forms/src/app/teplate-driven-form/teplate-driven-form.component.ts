import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teplate-driven-form',
  templateUrl: './teplate-driven-form.component.html',
  styleUrls: ['./teplate-driven-form.component.css']
})
export class TeplateDrivenFormComponent implements OnInit {
  model: any;

  constructor() {
      this.model = {
        "processor": "AMD"
      }
   }

  login(formData) {
    //invoke services
    console.log(formData);
  }

  field(data) {
    console.log(data.errors);
  }

  ngOnInit() {
  }

}
