import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

// Temporary solution - this should be handled by backend e.g. isTimeSet
const MIDNIGHT_SET_BY_USER_SECONDS_INDICATOR = 1;
const ONLY_DATE_FORMAT = 'dd.MM.yyyy';
const DATE_AND_TIME_FORMAT = 'dd.MM.yyyy, HH:mm';
const CUSTOM_TIMEPICKER_THEME: NgxMaterialTimepickerTheme = {
  container: {
    buttonColor: '#fff'
  },
  dial: {
    dialBackgroundColor: '#3f51b5'
  },
  clockFace: {
    clockHandColor: '#3f51b5'
  }
};

export interface DateAndTimeInputEvent {
  date: Date;
  restorePreviousDate: () => void;
}

@Component({
  selector: 'app-date-and-time-input',
  templateUrl: './date-and-time-input.component.html',
  styleUrls: ['./date-and-time-input.component.scss']
})
export class DateAndTimeInputComponent implements OnInit {
  @Output() dateChange = new EventEmitter<DateAndTimeInputEvent>();
  @Input() initialDate?: string;
  @Input() label: string;
  @Input() mode: 'form' | 'standalone' = 'form';
  @Input() fontSize: number | 'initial' = 'initial';
  settedDate: Date;
  previousDate: Date;
  isDateRestore: boolean = false;
  hours: number = 0;
  minutes: number = 0;
  isTimeSetted: boolean = false;
  onlyDateFormat: string = ONLY_DATE_FORMAT;
  dateAndTimeFormat: string = DATE_AND_TIME_FORMAT;
  customTheme: NgxMaterialTimepickerTheme = CUSTOM_TIMEPICKER_THEME;
  formControl: FormControl | AbstractControl;

  constructor(@Optional() public ngControl: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.formControl = this.ngControl ? this.ngControl.control : new FormControl(this.initialDate);

    if (this.formControl.value) {
      this.settedDate = new Date(this.formControl.value);
      this.previousDate = this.settedDate;
      // Set hours and minutes
      this.hours = this.settedDate.getHours();
      this.minutes = this.settedDate.getMinutes();
      // We supose that time setted at 00:00:00 can't be setted by user (this time won't be displayed)
      this.isTimeSetted = !(
        this.settedDate.getHours() === 0 &&
        this.settedDate.getMinutes() === 0 &&
        this.settedDate.getSeconds() === 0
      );
    } else {
      this.settedDate = null;
    }

    // Date change subscription
    this.formControl.valueChanges.subscribe((date) => {
      let newDate = new Date(date);
      newDate.setHours(this.hours, this.minutes);
      this.previousDate = this.settedDate;
      this.settedDate = newDate;

      // Prevent infinit loop when restore date
      if (!this.isDateRestore) {
        this.dateChange.emit({
          date: this.settedDate,
          restorePreviousDate: this.restorePreviousDate.bind(this)
        });
      }
      this.isDateRestore = false;
    });
  }

  // Initial time when open datePicker (if not provided - set 12:00)
  settedTimeToString() {
    return this.settedDate ? this.settedDate.toTimeString().substring(0, 5) : '12:00';
  }

  onTimeSet(time: string) {
    // Obtain time from dialog and set it
    [this.hours, this.minutes] = time.split(':').map(Number);

    // If date not setted - set current date
    const newDate = this.formControl.value === null ? new Date() : new Date(this.formControl.value);

    // Assign new time (when 00:00 set - we will assign number of seconds different from 0 - to display this time)
    let seconds =
      this.hours === 0 && this.minutes === 0 ? MIDNIGHT_SET_BY_USER_SECONDS_INDICATOR : 0;
    newDate.setHours(this.hours, this.minutes, seconds);

    // Update control
    this.formControl.setValue(newDate);
    if (this.ngControl) this.formControl.parent.markAsDirty();
    this.isTimeSetted = true;
  }

  onDateChange() {
    // Attach previously setted time
    const combineDate = new Date(this.formControl.value);
    combineDate.setHours(this.hours, this.minutes);
    this.previousDate = this.settedDate;
    this.settedDate = combineDate;

    // Update control
    this.formControl.setValue(combineDate);

    // Prevent infinit loop when restore date
    if (!this.isDateRestore) {
      this.dateChange.emit({
        date: this.settedDate,
        restorePreviousDate: this.restorePreviousDate.bind(this)
      });
    }
    this.isDateRestore = false;
  }

  restorePreviousDate() {
    this.settedDate = this.previousDate;
    this.minutes = this.settedDate.getMinutes();
    this.hours = this.settedDate.getHours();
    this.isDateRestore = true;
    // Restore picked date in calendar
    this.formControl.setValue(this.settedDate);
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
