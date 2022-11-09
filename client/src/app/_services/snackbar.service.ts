import { SnackbarComponent } from '../_shared/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { SNACKBAR_TYPE } from '../_types/snackbar-type';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) { }

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
        panelClass: `${snackbarType}-snackbar-panel`
      });

    return snackbarRef;
  }
}
