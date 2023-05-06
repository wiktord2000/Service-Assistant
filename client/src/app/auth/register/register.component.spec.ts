import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { SnackbarService } from '../../shared/ui/snackbar/snackbar.service';
import { AccountService } from '../../shared/data-access/account.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [{ provide: MyService, useValue: {} }],
      providers: [SnackbarService, AccountService, FormBuilder],
      imports: [RouterTestingModule, MatSnackBarModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // myService = TestBed.inject(MyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Sign up" title', () => {
    fixture.detectChanges();
    let complied: HTMLElement = fixture.nativeElement;
    expect(complied.querySelector('h1').textContent).toEqual('Sign up');
  });

  it('should disable button and change its text when registering', () => {
    component.isRegistering = true;
    component.registerForm.controls['username'].setValue('login');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['password'].setValue('confirmPassword');
    fixture.detectChanges();
    const complied: HTMLElement = fixture.nativeElement;
    const button = complied.querySelector('button');
    expect(button.disabled).toBeTrue();
    expect(button.innerText).toEqual('Processing...');
  });
});
