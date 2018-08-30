import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
      private authService : AuthService, 
      private router : Router
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    return this.check();
  }

  check() {
    if(this.authService.checkIfLogged()) {
       return true;
    } 

    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
