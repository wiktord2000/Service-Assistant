import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-orders-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent implements OnInit {

  constructor(public snackbarService : SnackbarService) { }

  ngOnInit(): void {
  }

  showSuccess(){
    let ref = this.snackbarService.showMessage('error',  "To jest normalny", "OKO", false);
  }

  showWarn(){
    let ref = this.snackbarService.showMessage('warn',  "To jest normalny", "OKO", false);
  }
}
