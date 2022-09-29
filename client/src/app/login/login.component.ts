import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  buttonDisable: boolean = false;
  buttonContent: string = "Zaloguj";

  constructor(private formBuilder: FormBuilder, 
              private accountService: AccountService,
              private router: Router) {
    
    // E.g. when use backword in dashboard and redirect to login panel - we want logout account
    // this.accountService.logout();
  }

  ngOnInit(): void {
    // Set input validators
    // this.loginForm.controls['email'].addValidators([Validators.email, Validators.required]);
    // this.loginForm.controls['password'].addValidators([Validators.required]);
  }



  loginForm : FormGroup = this.formBuilder.group(
    {
      email: [''],
      password: ['']
    }
  );

  onLoginButtonClick(){
    
    // If form is valid
    if(this.loginForm.valid){
      // Disable button until response retrive
      this.buttonDisable = true;
      // Change content
      this.buttonContent = "Logowanie..."
      // Send request
      this.accountService.login({ username: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value})
      .subscribe({
          // If success
          next: (resp: any) => {
            console.log(resp);
            // Navigate to dashboard
            // this.router.navigate(['dashboard']);
          },
          // If error
          error: () =>{
            if(document.getElementById('error-message') !== null){
              document.getElementById('error-message')!.innerHTML = "Hasło lub email jest niepoprawne!";
            }
            // Enable button to login again
            this.buttonDisable = false;
            this.buttonContent = "Zaloguj"
          }
        }
      )
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
