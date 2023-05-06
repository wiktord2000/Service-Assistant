import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { AccountService } from '../../shared/data-access/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
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
