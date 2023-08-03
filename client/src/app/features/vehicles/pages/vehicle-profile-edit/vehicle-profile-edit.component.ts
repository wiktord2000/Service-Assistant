import { Component, OnInit, SkipSelf } from '@angular/core';
import { CanDeactivateComponent } from 'src/app/core/guards/can-deactivate.guard';
import { VehicleProfileComponent } from '../vehicle-profile/vehicle-profile.component';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { Client } from 'src/app/core/models/Client';
import { FormBuilder, Validators } from '@angular/forms';
import { NUMBER_REGEX } from 'src/app/core/constants/constants';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { finalize } from 'rxjs';
import { VehiclesService } from '../../data-access/vehicles.service';
import { VehicleFormGroup } from '../../utils/vehicle-form-types';
import { VehicleUtilsService } from '../../utils/vehicle-utils.service';

@Component({
  selector: 'app-vehicle-profile-edit',
  templateUrl: './vehicle-profile-edit.component.html',
  styleUrls: ['./vehicle-profile-edit.component.scss']
})
export class VehicleProfileEditComponent implements OnInit, CanDeactivateComponent {
  vehicle: Vehicle;
  currentOwner: Client;
  isSaving: boolean = false;
  editForm: VehicleFormGroup = this.formBuilder.group({
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    color: [''],
    registrationNumber: [''],
    productionDate: ['', [Validators.pattern(NUMBER_REGEX)]],
    currentOwner: [''],
    engineFuel: [''],
    vin: [''],
    engineCode: [''],
    capacity: ['', [Validators.pattern(NUMBER_REGEX)]],
    enginePower: ['', [Validators.pattern(NUMBER_REGEX)]],
    technicalInspectionEnd: [''],
    firstRegistration: [''],
    description: ['']
  }) as VehicleFormGroup;

  constructor(
    @SkipSelf() private vehicleProfile: VehicleProfileComponent,
    private vehicleUtils: VehicleUtilsService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.vehicle = this.vehicleProfile.vehicle;
    this.currentOwner = this.vehicleProfile.currentOwner;
    this.editForm.setValue(this.vehicleUtils.getVehicleFormValue(this.vehicle));
  }

  onSaveChanges() {
    this.isSaving = true;

    const updateData = {
      ...this.editForm.value,
      currentOwner: this.currentOwner,
      currentOwnerId: this.currentOwner?.id ?? null
    };

    this.vehiclesService
      .updateVehicle(this.vehicle.id, updateData)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.vehicle = { ...this.vehicle, ...updateData };
          this.vehicleProfile.vehicle = this.vehicle;
          this.editForm.reset(this.vehicleUtils.getVehicleFormValue(this.vehicle), {
            emitEvent: false
          });
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane pojazdu');
        },
        error: (error) => {
          // Actions to consideration
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  canDeactivate() {
    return !this.editForm.dirty || confirm('Are you sure to unsaved the current changes?');
  }
}
