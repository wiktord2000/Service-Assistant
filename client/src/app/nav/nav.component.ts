import { AccountService } from './../_services/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { User } from '../_models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  @Input() loggedIn : Boolean;
  @Input() model : any;
  // currentUser$: Observable<User>;

  isSmallOrXSmall$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public accountService : AccountService) {}    // Make public if you want use service from html level

  ngOnInit(): void {
    // Attach user subscription
    // this.getCurrentUser(); -- obsolete
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => console.log(err)
    })
  }

  logout(){
    this.accountService.logout();
  }





  // ---------------------------------------------------------------------
  // !!! Obsolete
  // Subscription of accountService with manage current user - the nice example to replace with async pipe 
  // because in this case we don't unsubscribe the observable object. Pipe make it automatically. 
  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: (user) => {
        this.loggedIn = !!user;       // !user = !{} = !true = false, !(!user) = true
      },
      error: (error) => console.log(error)
    })
  }

}
