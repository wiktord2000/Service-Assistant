import { SnackbarComponent } from './../snackbar/snackbar.component';
import { SNACKBAR_TYPE } from '../_enums/snackbar-type';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) { }

  private panelClassMap = new Map([
    [SNACKBAR_TYPE.SUCCESS , 'success-snackbar-panel'],
    [SNACKBAR_TYPE.INFO , 'info-snackbar-panel'],
    [SNACKBAR_TYPE.WARN , 'warn-snackbar-panel'],
    [SNACKBAR_TYPE.ERROR , 'error-snackbar-panel']
  ])

  showMessage(snackbarType: SNACKBAR_TYPE, 
              snackbarMessage: string, 
              snackbarButtonName: string = "OK", 
              autoDismiss: boolean = true,
              snackbarHorizontalPosition: MatSnackBarHorizontalPosition = 'right' 
              ) : MatSnackBarRef<SnackbarComponent>{

    const snackbarRef = this.matSnackBar.openFromComponent(SnackbarComponent, 
      { data: 
          { 
            type : snackbarType,
            message: snackbarMessage,
            buttonName: snackbarButtonName
          }, 
        duration: autoDismiss ? 2000 : undefined,
        horizontalPosition: snackbarHorizontalPosition,
        panelClass: this.panelClassMap.get(snackbarType)
      });

    return snackbarRef;
  }
}
