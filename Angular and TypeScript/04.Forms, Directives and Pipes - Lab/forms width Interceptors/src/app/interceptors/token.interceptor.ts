import { HttpResponse, 
    HttpRequest, 
    HttpHandler, 
    HttpInterceptor,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './../authentication/auth.service';
import { Router } from '@angular/router';

const appKey = "kid_H1PlarcEQ";
const appSecret = "340145967b844a09856b6264d5aff566";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService : AuthService, private router : Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(request.url.endsWith('login') || request.url.endsWith(appKey)) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json'
                }
            })
        }

        return next.handle(request)
            .pipe(tap((event : HttpEvent<any>) => {
                if(event instanceof HttpResponse && request.url.endsWith('login')) {
                    this.successfulLogin(event['body']);
                }
            }, (err : any) => {
                if(err instanceof HttpErrorResponse) {
                    switch(err.status) {
                        case 401:
                            this.router.navigate(['/login']);
                        break;
                        case 404:
                            this.router.navigate(['/not-found']);
                        break;
                        case 500:
                            this.router.navigate(['server-error']);
                        break;
                    }
                }
            }
        ));
    }

    private successfulLogin(data) {
  
        this.authService.authtoken = data['_kmd']['authtoken'];
        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        localStorage.setItem('username', data['username']);
        //after logged successful redirect to Home Page
        this.router.navigate(['/home']);
    }
}