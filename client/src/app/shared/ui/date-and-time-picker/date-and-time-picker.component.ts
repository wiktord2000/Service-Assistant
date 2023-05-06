import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

export interface DateAndTimePickerEvent {
  date: Date;
  restorePreviousDate: () => void;
}

@Component({
  selector: 'app-date-and-time-picker',
  templateUrl: './date-and-time-picker.component.html',
  styleUrls: ['./date-and-time-picker.component.scss']
})
export class DateAndTimePickerComponent implements OnInit {
  @Input() initialDate: string;
  @Input() fontSize: number = 12;
  @Output() dateChange = new EventEmitter<DateAndTimePickerEvent>();
  settedDate: Date;
  previousDate: Date;
  dateFormControl: FormControl;
  isTimeSetted: boolean = false;
  isDateRestore: boolean = false;
  hours: number = 12;
  minutes: number = 0;
  onlyDateFormat: string = 'dd.MM.yyyy';
  dateAndTimeFormat: string = 'dd.MM.yyyy, HH:mm';

  constructor() {}

  ngOnInit(): void {
    if (this.initialDate) {
      // Required - otherwise error e.g. getHours() is not a function (JSON gets us 2022-09-16T07:00:00 with we have to convert)
      this.settedDate = new Date(this.initialDate);
      this.previousDate = this.settedDate;

      // Assign time for timePicker perpose
      this.hours = this.settedDate.getHours();
      this.minutes = this.settedDate.getMinutes();
      this.isTimeSetted = true;
    } else {
      this.settedDate = null;
    }
    // Init calendar input (to check correct initial date)
    this.dateFormControl = new FormControl(this.settedDate);

    // Date change subscription
    this.dateFormControl.valueChanges.subscribe((date) => {
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

  settedTimeToString() {
    return this.settedDate ? this.settedDate.toTimeString().substring(0, 5) : '12:00';
  }

  onTimeSet(time: string) {
    // Obtain time from dialog
    [this.hours, this.minutes] = time.split(':').map(Number);

    // If date not setted - set current date, otherwise change only time
    const newDate = this.settedDate !== null ? new Date(this.settedDate) : new Date();

    // Assign new time
    newDate.setHours(this.hours, this.minutes);
    this.previousDate = this.settedDate;
    this.settedDate = newDate;
    this.isTimeSetted = true;
    // Emit event
    this.dateChange.emit({
      date: this.settedDate,
      restorePreviousDate: this.restorePreviousDate.bind(this)
    });
  }

  restorePreviousDate() {
    this.settedDate = this.previousDate;
    this.minutes = this.settedDate.getMinutes();
    this.hours = this.settedDate.getHours();
    this.isDateRestore = true;
    // Restore picked date in calendar
    this.dateFormControl.setValue(this.settedDate);
  }

  customTheme: NgxMaterialTimepickerTheme = {
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
}
