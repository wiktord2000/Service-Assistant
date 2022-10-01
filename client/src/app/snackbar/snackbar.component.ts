import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SNACKBAR_TYPE } from '../_enums/snackbar-type';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  iconsMap = new Map([
    [SNACKBAR_TYPE.SUCCESS , 'check_circle'],
    [SNACKBAR_TYPE.INFO , 'info'],
    [SNACKBAR_TYPE.WARN , 'error'],
    [SNACKBAR_TYPE.ERROR , 'cancel']
  ])

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackBarRef: MatSnackBarRef<SnackbarComponent>) { }    // To access events

  ngOnInit(): void {}
}
