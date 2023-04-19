import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SnackbarService } from '../core/services/ui/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService } from '../core/services/http/account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [SnackbarService, AccountService, FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    // myService = TestBed.inject(MyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Logowanie" title', () => {
    fixture.detectChanges();
    let complied: HTMLElement = fixture.nativeElement;
    expect(complied.querySelector('h1').textContent).toEqual('Logowanie');
  });
});
