import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../core/services/http/account.service';
import { User } from '../core/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    // Disable button and change content until response retrive
    this.isLogging = true;

    // Send request
    this.accountService
      .login({
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value
      })
      .subscribe({
        next: (user: User) => {
          // Navigate to orders
          this.router.navigate(['orders']);
          this.snackbarService.showMessage('success', 'Zalogowano pomyślnie!');
          console.log(user);
        },
        error: (errors) => {
          // This is the case when interceptor doesn't handle all errors
          // e.g. creating snackbar (it return the array of errors(strings) to handle)
          if (Array.isArray(errors)) this.validationErrors = errors;
          console.log(errors);
          // Enable button to login again
          this.isLogging = false;
        }
      });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
