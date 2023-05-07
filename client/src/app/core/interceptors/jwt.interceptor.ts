import { AccountService } from '../../auth/data-access/account.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    this.accountService.currentUser$.pipe(first()).subscribe((user) => (currentUser = user));
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
