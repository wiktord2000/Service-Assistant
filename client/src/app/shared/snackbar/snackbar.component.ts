import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarType } from '../../core/types/types';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  // Match icons accoring to the snackbar type
  iconsMap = new Map<SnackbarType, string>([
    ['success', 'check_circle'],
    ['info', 'info'],
    ['warn', 'error'],
    ['error', 'cancel']
  ]);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SnackbarComponent> // To trigger events
  ) {}

  onButtonClick() {
    this.snackBarRef.dismissWithAction();
  }
}
