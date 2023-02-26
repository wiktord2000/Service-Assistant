import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {}

  async onRedirect() {
    const currentUser = await firstValueFrom(this.accountService.currentUser$);
    currentUser ? this.router.navigate(['/orders']) : this.router.navigate(['/']);
  }
}
