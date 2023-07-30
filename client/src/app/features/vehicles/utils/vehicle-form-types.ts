import { AbstractControl, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/core/models/Vehicle';

export type VehicleFormValue = Pick<
  Vehicle,
  | 'brand'
  | 'model'
  | 'color'
  | 'registrationNumber'
  | 'productionDate'
  | 'engineFuel'
  | 'vin'
  | 'engineCode'
  | 'capacity'
  | 'enginePower'
  | 'technicalInspectionEnd'
  | 'firstRegistration'
  | 'description'
> & { currentOwner: string };

export type VehicleControls = { [key in keyof VehicleFormValue]: AbstractControl };

export interface VehicleFormGroup extends FormGroup {
  value: VehicleFormValue;
  controls: VehicleControls;
}
