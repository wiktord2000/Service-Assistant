import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { SnackbarType } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private matSnackBar: MatSnackBar) {}

  showMessage(
    snackbarType: SnackbarType,
    snackbarMessage: string,
    snackbarButtonName: string = 'OK',
    autoDismiss: boolean = true,
    snackbarHorizontalPosition: MatSnackBarHorizontalPosition = 'right'
  ): MatSnackBarRef<SnackbarComponent> {
    const snackbarRef = this.matSnackBar.openFromComponent(SnackbarComponent, {
      data: {
        type: snackbarType,
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
