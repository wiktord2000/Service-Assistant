import { SnackbarService } from 'src/app/_services/snackbar.service';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {         // Guards automaticelly subscribe e.g. accountService.currentUser$ so we don't have to do this ?
  constructor(private accountService: AccountService,   // Probably subscribe every created subject in the app ? 
              private snackbarService: SnackbarService
              ){}


  canActivate(): Observable<boolean> {

    return this.accountService.currentUser$.pipe(
      map(user => {
        if(user){
          return true;
        }
        this.snackbarService.showMessage('warn', "Nie masz uprawnień, aby odwiedzić tą stronę!")
      })
    )
  }
  
}
