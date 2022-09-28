import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  model: any = {}
  users: any;
  loggedIn: Boolean; 

  constructor(private http: HttpClient,
              private accountService: AccountService){}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  // When app starts check stored user in localstorage
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }

  getUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error)
    });
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        console.log(resp);
        this.loggedIn = true;
      },
      error: (err) => console.log(err)
    })
  }

  logout(){
    this.loggedIn = false;
  }
}
