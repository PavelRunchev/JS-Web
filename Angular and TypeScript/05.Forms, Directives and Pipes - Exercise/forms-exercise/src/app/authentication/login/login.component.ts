import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthService } from './../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : LoginModel;
  loginFailed : boolean;
  errorMessage : string;

  constructor(private authService : AuthService, private router : Router) {
    this.model = new LoginModel('', '');
  }

  login() {
    this.authService.login(this.model)
      .subscribe(data => {
          this.successfulLogin(data);
          this.errorMessage = '';
          this.loginFailed = false;
      }, err => {
          this.loginFailed = true;
          this.errorMessage = err['error']['description'];
      });
  }

  successfulLogin(data) {
  
      this.authService.authtoken = data['_kmd']['authtoken'];
      localStorage.setItem('authtoken', data['_kmd']['authtoken']);
      localStorage.setItem('username', data['username']);
      //after logged successful redirect to Home Page
      this.router.navigate(['/home']);
  }

  ngOnInit() {
  }
}
