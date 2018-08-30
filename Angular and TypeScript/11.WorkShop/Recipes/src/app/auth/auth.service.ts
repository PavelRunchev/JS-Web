import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token : string;

    constructor(
        private toastr : ToastrService,
        private router : Router,
        private authService: AuthService
    ) { }

    signUp(email: string, password: string) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                this.toastr.success('Signed Up', 'Success');
        this.router.navigate(['/auth/signin']);
            })
            .catch((err) => {
                this.toastr.error(err.message, 'Warning');
              });
    }

    signIn(email : string, password : string) {
        firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then((data) => {
            firebase.auth()
              .currentUser
              .getIdToken()
              .then((token : string) => {
                this.token = token;
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('token', token);
              })
              this.router.navigate(['/recipes/start']);
              this.toastr.success('Logged In', 'Success');
          })
          .catch((err) => {
            this.toastr.error(err.message, 'Warning');
          });
    } 

    logout() {
        firebase.auth().signOut()
          .then(() => {
            this.toastr.success('Logged Out', 'Success');
            this.router.navigate(['/auth/signin']);
            this.token = null;
          });
    }

    getToken() {
        firebase.auth()
        .currentUser
        .getIdToken()
        .then((token : string) => {
          this.token = token;
        })
    
        return this.token;
    }
    
    isAuthenticated() : boolean {
        return this.token != null;
    }
}