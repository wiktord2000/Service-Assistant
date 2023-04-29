import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';
import { User } from '../../core/models/User';
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
          this.router.navigate(['/orders']);
          this.snackbarService.showMessage('success', 'Successfully signed in!');
        },
        error: (errors) => {
          // Handling list of errors provided by interceptor
          if (Array.isArray(errors)) this.validationErrors = errors;
          console.log(errors);
        }
      });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
