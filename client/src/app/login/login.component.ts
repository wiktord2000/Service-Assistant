import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../core/services/http/account.service';
import { User } from '../core/models/User';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationErrors: string[] = [];
  isPasswordVisible: boolean = false;
  isLogging: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin() {
    // Disable button
    this.isLogging = true;
    // Send request
    this.accountService
      .login({
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value
      })
      .pipe(
        finalize(() => {
          this.isLogging = false;
        })
      )
      .subscribe({
        next: (user: User) => {
          // Navigate to orders
          this.router.navigate(['orders']);
          this.snackbarService.showMessage('success', 'Successfully logged in!');
          console.log(user);
        },
        error: (errors) => {
          // This is the case when interceptor doesn't handle all errors
          // e.g. creating snackbar (it return the array of errors(strings) to handle)
          if (Array.isArray(errors)) this.validationErrors = errors;
          console.log(errors);
        }
      });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
