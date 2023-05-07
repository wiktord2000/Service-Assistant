import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateAndTimeInputComponent } from './date-and-time-input.component';

describe('DateAndTimeInputComponent', () => {
  let component: DateAndTimeInputComponent;
  let fixture: ComponentFixture<DateAndTimeInputComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateAndTimeInputComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [{ provide: MyService, useValue: {} }],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAndTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // myService = TestBed.inject(MyService);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(component).toBeTruthy();
    });
  });
});
