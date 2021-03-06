import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError( error => {

      if(error.status === 403 && error.error.code === 'ERR_BAD_ACCESS_TOKEN'){
        setTimeout (() => {
          this.authService.logout();
          this.router.navigateByUrl('/login').then(() => {});
        }, 2000);
      }
      return throwError(error);
    }));
  }
}
