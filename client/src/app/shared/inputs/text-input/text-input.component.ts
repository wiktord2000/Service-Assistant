import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() suffixText: string;
  @Input() type = 'text';
  @Input() minNumber?: number;
  @Input() maxNumber?: number;
  @Input() isTextArea: boolean;
  @Input() rowsNumber: number = 3;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  // We don't have to implement it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
