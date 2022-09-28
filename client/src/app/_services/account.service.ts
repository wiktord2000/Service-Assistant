import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root' // Singleton convension - service is present until app close
})
export class AccountService {

  baseUrl: String = "https://localhost:5001/api/";
  private currentUserSource = new ReplaySubject<User>(1);   // It's the buffer - the number means how many previous versions of given object have to store
                                                            // and return them when subscribe.
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model : any){
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: User){
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
