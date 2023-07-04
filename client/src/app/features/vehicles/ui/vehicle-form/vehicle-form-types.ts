import { AbstractControl, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/core/models/Vehicle';

export type VehicleFormValue = Pick<
  Vehicle,
  | 'brand'
  | 'model'
  | 'color'
  | 'registrationNumber'
  | 'productionDate'
  | 'currentOwner'
  | 'engineFuel'
  | 'vin'
  | 'engineCode'
  | 'capacity'
  | 'enginePower'
  | 'technicalInspectionEnd'
  | 'firstRegistration'
  | 'description'
>;

export type VehicleControls = { [key in keyof VehicleFormValue]: AbstractControl };

export interface VehicleFormGroup extends FormGroup {
  value: VehicleFormValue;
  controls: VehicleControls;
}
