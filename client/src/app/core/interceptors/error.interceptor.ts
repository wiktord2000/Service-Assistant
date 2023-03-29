import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        // Handle specific errors
        switch (error?.status) {
          // Bad Request
          case 400:
            if (!error?.error?.errors) {
              // Single error message
              this.snackbarService.showMessage('error', error?.error, undefined, false);
              break;
            }
            // Iterate on object and collect the errors arrays
            let errorsArrays: Array<string[]> = [];
            for (const key in error.error.errors) {
              if (error.error.errors[key]) {
                errorsArrays.push(error.error.errors[key]);
              }
            }
            let errorsArray = errorsArrays.flat();
            // Multiple errors message
            if (errorsArray.length)
              this.snackbarService.showMessage('error', errorsArray.join(' | '), undefined, false);
            break;

          // Unauthorized
          case 401:
            this.snackbarService.showMessage('error', error?.error, undefined, false);
            break;

          // Not found
          case 404:
            this.router.navigateByUrl('/not-found');
            break;

          // Server error
          case 500:
            // Attach data to navigation route & redirect
            const navigationExtras: NavigationExtras = { state: { error: error?.error } };
            this.router.navigateByUrl('/server-error', navigationExtras);
            break;

          default:
            this.snackbarService.showMessage(
              'error',
              `Unknown error. Try again later...`,
              undefined,
              false
            );
            console.log(error);
            break;
        }
        // Propagate the error
        return throwError(() => error);
      })
    );
  }
}
