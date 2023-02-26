import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { AccountService } from '../services/http/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // Guards automaticelly subscribe e.g. accountService.currentUser$ so we don't have to do this ?
  constructor(
    private accountService: AccountService, // Probably subscribe every created subject in the app ?
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['/not-found']);
        this.snackbarService.showMessage(
          'warn',
          'Nie masz uprawnień, aby odwiedzić tą stronę!',
          undefined,
          false
        );
      })
    );
  }
}