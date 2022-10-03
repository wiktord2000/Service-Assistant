import { SnackbarService } from './../_services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegistering: boolean = false;
  validationErrors: string[] = [];

  registerForm : FormGroup = this.formBuilder.group(
    {
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    }
  );

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private snackbarService: SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
    // Again check validity of snd input if fst's been changed
    this.registerForm.controls.password.valueChanges.subscribe(() => this.registerForm.controls.confirmPassword.updateValueAndValidity());
  }

  onRegister(){
    // Disable button and change text until response retrive
    this.isRegistering = true;
    
    // Send request
    this.accountService.register({username: this.registerForm.controls['username'].value, password: this.registerForm.controls['password'].value})
      .subscribe({
        next: (user: User) => {
          console.log(user);
          // Navigate to orders
          this.router.navigate(['orders']);
          this.snackbarService.showMessage('success', "Zarejestrowano pomyślnie!");
        },
        error: (errors) =>{
          // This is the case when interceptor doesn't handle all errors 
          // e.g. creating snackbar (it return the array of errors(strings) to handle)
          if(Array.isArray(errors)) this.validationErrors = errors;
          console.log(errors);
          // Enable button to register again
          this.isRegistering = false;
        }
      })
  }

  // Custom validator
  matchValues(matchTo: string): ValidatorFn{
    return (control : AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null 
        : {isMatching: true}
    }
  }
}