import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarType } from '../../core/types/types';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  iconsMap = new Map<SnackbarType, string>([
    ['success', 'check_circle'],
    ['info', 'info'],
    ['warn', 'error'],
    ['error', 'cancel']
  ]);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SnackbarComponent>
  ) {} // To access events

  ngOnInit(): void {}
}
