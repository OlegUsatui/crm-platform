import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.getToken() as string
        }
      })
    }
    return next.handle(request).pipe(catchError((err) => this.handleAuthErr(err)));
  }

  handleAuthErr(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.router.navigate(['login'], {
        queryParams: {
          tokenExpired: true
        }
      })
    }

    return throwError(err)
  }
}
