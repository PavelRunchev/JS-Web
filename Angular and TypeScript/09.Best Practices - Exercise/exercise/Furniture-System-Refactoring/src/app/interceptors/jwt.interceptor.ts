import {
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(tap((res: any) => {
            if (res instanceof HttpResponse && res.body.token) {
                this.saveToken(res.body);
                // toastr message for login!!!
                // this.toastr.success(res.body.message, "Success!");
                this.toastr.success('Logged Successful!');
                this.router.navigate(['/furniture/all']);
            }

            // toastr message for register!!!
            if (res instanceof HttpResponse && res.body.success && res.url.endsWith('signup')) {
                this.toastr.success('Register Successful!');
                this.router.navigate(['/signin']);
            }

            // toastr message for create furniture!!!
            if (res instanceof HttpResponse && res.body.success && res.url.endsWith('create')) {
              this.toastr.success('Created furniture Successful!');
              this.router.navigate(['/furniture/all']);
            }

            // toastr message for edit furniture or attach edit-furniture.component!!!
            // if (res instanceof HttpResponse && res.body.success && res.url.endsWith('edit')) {
            //     this.toastr.success('Edited furniture Successful!');
            //     this.router.navigate(['/furniture/all']);
            //   }
        }));
    }

    private saveToken(data) {
        localStorage.setItem('currentUser', JSON.stringify({
            'username': data.user.name,
            'token': data.token,
            "isAdmin": data.user.isAdmin
        }));
        console.log(data);
    }
}
