import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/models/User';
import { AccountService } from '../../shared/services/account.service';
import { matchValues } from '../../core/helpers/form-validators';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isRegistering: boolean = false;
  validationErrors: string[] = [];
  registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, matchValues('password')]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Again check validity of confirmPassword when password's been changed
    this.registerForm.controls.password.valueChanges.subscribe(() =>
      this.registerForm.controls.confirmPassword.updateValueAndValidity()
    );
  }

  onRegister() {
    this.isRegistering = true;

    // Send request
    this.accountService
      .register({
        username: this.registerForm.controls['username'].value,
        password: this.registerForm.controls['password'].value
      })
      .pipe(
        finalize(() => {
          this.isRegistering = false;
        })
      )
      .subscribe({
        next: (user: User) => {
          this.router.navigate(['/orders']);
          this.snackbarService.showMessage('success', 'Successfully signed up!');
        },
        error: (errors) => {
          // Handling list of errors provided by interceptor
          if (Array.isArray(errors)) this.validationErrors = errors;
          console.log(errors);
        }
      });
  }
}
