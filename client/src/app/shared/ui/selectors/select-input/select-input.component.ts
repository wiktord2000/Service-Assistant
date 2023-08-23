import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subscription, debounceTime, distinctUntilChanged, of } from 'rxjs';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label?: string;
  @Input() optionIcon?: string;
  @Input() selectedValue?: Object;
  @Input() possibleValues?: Observable<Object[]>;
  @Input() displayValueAs: (value: Object) => string;
  @Input() optionIconMapping?: (value: Object) => string;
  @Output() onAddClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onOptionSelected: EventEmitter<MatAutocompleteSelectedEvent> = new EventEmitter();
  @Output() onInput: EventEmitter<string> = new EventEmitter();
  valueChangesSubsctiption: Subscription;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.subscribeValueChanges();
  }

  subscribeValueChanges() {
    this.valueChangesSubsctiption = this.ngControl.control.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: string | Object) => {
        // When we will get object - do nothing (mat-autocomplate defect)
        if (value instanceof Object) return;
        this.selectedValue = null;
        this.onInput.emit(value);
      });
  }

  updateSelectedValue(value?: Object) {
    this.selectedValue = value;
    this.possibleValues = of([value]);
    this.ngControl.control.setValue(this.displayValueAs(value), { emitEvent: false });
  }

  reset(inputValue: string, emitInputEvent: boolean = false) {
    this.selectedValue = null;
    this.possibleValues = of([]);
    this.ngControl.control.setValue(inputValue, { emitEvent: emitInputEvent });
  }

  setError(type: 'notExist' | 'required') {
    const error = type === 'required' ? { required: true } : { 'not-exist': true };
    this.ngControl.control.setErrors(error);
  }

  ngOnDestroy(): void {
    this.valueChangesSubsctiption.unsubscribe();
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
