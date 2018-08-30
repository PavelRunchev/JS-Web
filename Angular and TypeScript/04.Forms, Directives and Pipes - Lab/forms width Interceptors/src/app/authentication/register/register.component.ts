import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from './../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : RegisterModel;
  loginFailed : boolean;
  errorMessage : string;

  constructor(private authService : AuthService, private router: Router) {
      this.model = new RegisterModel('', '', '', '', '', 18);
   }

  register() {
      delete this.model['confirmPassword'];
      this.authService.register(this.model)
        .subscribe(data => {
          //redirect after registred successfull to Login page
          this.router.navigate(['/login']);
          this.loginFailed = false;
          this.errorMessage = '';
        },
        error => {
          this.loginFailed = true;
          this.errorMessage = error['error'].description;
          console.log(this.errorMessage);
        });
  }

  ngOnInit() {
  }

}
