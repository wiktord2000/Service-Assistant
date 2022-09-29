import { AccountService } from './_services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private accountService: AccountService ){}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  // When app starts check stored user in localstorage
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }
}
