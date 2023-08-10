import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit, OnDestroy {
  @Input() label?: string;
  @Input() iconName?: string;
  @Input() selectedValue?: Object;
  @Input() possibleValues?: Object[];
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
        this.onInput.emit(value);
      });
  }

  updateSelectedValue(stringRepresentation: string, value?: Object) {
    this.selectedValue = value;
    this.possibleValues = [value];
    this.ngControl.control.setValue(stringRepresentation, { emitEvent: false });
  }

  reset(inputValue: string, emitInputEvent: boolean = false) {
    this.selectedValue = null;
    this.possibleValues = [];
    this.ngControl.control.setValue(inputValue, { emitEvent: emitInputEvent });
  }

  ngOnDestroy(): void {
    this.valueChangesSubsctiption.unsubscribe();
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
