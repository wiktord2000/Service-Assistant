import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:                                 // we have to handle to types of 400 response (array of errors and single error (string))
              if (error.error.errors) { 
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();    // instead of snackbar we will print them at page (many validation errors)
              } else {
                this.snackbarService.showMessage('error', `${error.status} ${error.statusText}`);
              }
              break;
            case 401:
              this.snackbarService.showMessage('error', `${error.status} ${error.statusText}`);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}} //attach data to navigation route
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.snackbarService.showMessage('error', `Something unexpected went wrong`);
              console.log(error);
              break;
          }
        }
        return throwError(() => error);
      })
    )
  }
}
