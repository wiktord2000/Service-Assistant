import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {headerText: string, bodyText: string}) { }

  headerText: string;
  bodyText: string;

  ngOnInit(): void {
    this.headerText = this.data.headerText;
    this.bodyText = this.data.bodyText;
  }

}
