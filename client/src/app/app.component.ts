import { AccountService } from './shared/data-access/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from './core/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}
  ngOnInit(): void {
    // Check whether user is stored inside local storage
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
