import { Component, Input, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-date-and-time-input',
  templateUrl: './date-and-time-input.component.html',
  styleUrls: ['./date-and-time-input.component.css']
})
export class DateAndTimeInputComponent implements OnInit {

  @Input() label: string;
  hours: number = 0;
  minutes: number = 0;
  isTimeSetted: boolean = false;
  onlyDateFormat: string = 'dd.MM.yyyy';
  dateAndTimeFormat: string = 'dd.MM.yyyy, HH:mm';

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this; 
  }

  ngOnInit(): void {

    if(this.ngControl.value){

      const initialDate = new Date(this.ngControl.value);
      // Set hours and minutes
      this.hours = initialDate.getHours();
      this.minutes = initialDate.getMinutes();
      // We supose that time setted at 00:00:00 is not setted by user (not displayed)
      this.isTimeSetted = !(initialDate.getHours() === 0 && initialDate.getMinutes() === 0 && initialDate.getSeconds() === 0);
    }
  }

  // Initial time when open datePicker (if not provided - set 12:00)
  settedTimeToString(){
    const currentTime = new Date(this.ngControl.value);
    return currentTime ? currentTime.toTimeString().substring(0,5) : '12:00';
  }

  onTimeSet(time: string){
    // Obtain time from dialog and set it
    [this.hours, this.minutes] = time.split(":").map(Number);

    // If date not setted - set current date
    const newDate = this.ngControl.value === null ?  new Date() : new Date(this.ngControl.value);

    // Assign new time (possible improvement - add 1 second to mark 00:00 as setted)
    newDate.setHours(this.hours, this.minutes);
    
    // Update control
    this.ngControl.control.setValue(newDate);
    this.isTimeSetted = true;
  }

  onDateChange(){
    // Attach previously setted time
    const combineDate = new Date(this.ngControl.value);
    combineDate.setHours(this.hours, this.minutes);
    // Update control
    this.ngControl.control.setValue(combineDate);
  }

  customTheme: NgxMaterialTimepickerTheme = {
    container: {
        buttonColor: '#fff',
    },
    dial: {
        dialBackgroundColor: '#3f51b5',
    },
    clockFace: {
        clockHandColor: '#3f51b5',
    },
  };


  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
   
}
