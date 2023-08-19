import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit, OnDestroy {
  @Input() label?: string;
  @Input() optionIcon?: string;
  @Input() selectedValue?: Object;
  @Input() possibleValues?: Object[];
  @Input() displayValueAs: (value: Object) => string;
  @Input() formControl!: AbstractControl;
  @Output() onAddClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onOptionSelected: EventEmitter<MatAutocompleteSelectedEvent> = new EventEmitter();
  @Output() onInput: EventEmitter<string> = new EventEmitter();
  valueChangesSubsctiption: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.subscribeValueChanges();
  }

  subscribeValueChanges() {
    this.valueChangesSubsctiption = this.formControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: string | Object) => {
        // When we will get object - do nothing (mat-autocomplate defect)
        if (value instanceof Object) return;
        this.updateSelectedValue(null);
        this.onInput.emit(value);
      });
  }

  updateSelectedValue(value?: Object) {
    this.selectedValue = value;
    this.possibleValues = [value];
    this.formControl.setValue(this.displayValueAs(value), { emitEvent: false });
  }

  reset(inputValue: string, emitInputEvent: boolean = false) {
    this.selectedValue = null;
    this.possibleValues = [];
    this.formControl.setValue(inputValue, { emitEvent: emitInputEvent });
  }

  setError(type: 'notExist' | 'required') {
    const error = type === 'required' ? { required: true } : { 'not-exist': true };
    this.formControl.setErrors(error);
  }

  ngOnDestroy(): void {
    this.valueChangesSubsctiption.unsubscribe();
  }
}
