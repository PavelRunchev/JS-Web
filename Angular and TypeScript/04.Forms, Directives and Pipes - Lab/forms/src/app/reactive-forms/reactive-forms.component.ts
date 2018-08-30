import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  form = new FormGroup({
    "currentPass": new FormControl('', [Validators.required, Validators.minLength(3)]),
    "newPass": new FormControl(''),
    "confirmPass": new FormControl('')
  })

  currentPass = "123456";
  constructor() { }

  log() {
    if(this.form.get('currentPass').value == '' 
        || this.form.get('newPass').value == '' 
        || this.form.get('confirmPass').value == '') {
      alert('Fields not be empty');
    }

    if(this.form.get("currentPass").value !== this.currentPass) {
        alert('current password is wrong');
        return;
    } else if(this.form.get('newPass').value !== this.form.get('confirmPass').value) {
        alert('passwords mismatch');
        return;
    } else {
        if(this.form.get('currentPass').value !== '' 
        && this.form.get('newPass').value !== '' 
        && this.form.get('confirmPass').value !== '') {
          console.log(this.form.value);
        } else {
          return;
        }
    }
  }

  ngOnInit() {
  }

}
