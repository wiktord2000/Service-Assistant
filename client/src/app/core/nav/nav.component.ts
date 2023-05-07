import { AccountService } from '../../auth/data-access/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() model: any;
  isLoginPanel: boolean = true;
  isSmallOrXSmall$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {}

  togglePanel(): void {
    this.isLoginPanel = !this.isLoginPanel;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => console.log(err)
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/auth']);
  }
}
