import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { CanDeactivateComponent } from 'src/app/core/guards/can-deactivate.guard';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { VehicleProfileComponent } from '../vehicle-profile/vehicle-profile.component';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { Client } from 'src/app/core/models/Client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NUMBER_REGEX } from 'src/app/core/constants/constants';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { finalize } from 'rxjs';
import { VehiclesService } from '../../data-access/vehicles.service';
import { ClientSelectInputComponent } from 'src/app/shared/ui/selectors/client-select-input/client-select-input.component';

@Component({
  selector: 'app-vehicle-profile-edit',
  templateUrl: './vehicle-profile-edit.component.html',
  styleUrls: ['./vehicle-profile-edit.component.scss']
})
export class VehicleProfileEditComponent implements OnInit, CanDeactivateComponent {
  @ViewChild(ClientSelectInputComponent) clientSelect: ClientSelectInputComponent;
  vehicle: Vehicle;
  currentOwner: Client;
  isSaving: boolean = false;
  editForm: FormGroup = this.formBuilder.group({
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
  });

  constructor(
    @SkipSelf() private vehicleProfile: VehicleProfileComponent,
    public utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.vehicle = this.vehicleProfile.vehicle;
    this.currentOwner = this.vehicleProfile.currentOwner;
    this.fillForm(this.vehicle);
  }

  onSaveChanges() {
    this.isSaving = true;
    const currentOwner = this.clientSelect.selectedClient;

    const updateData = { ...this.editForm.value, currentOwnerId: currentOwner?.id ?? null };

    this.vehiclesService
      .updateVehicle(this.vehicle.id, updateData)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.currentOwner = currentOwner;
          this.vehicle = { ...this.vehicle, ...updateData };
          this.vehicleProfile.vehicle = this.vehicle;
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane pojazdu');
          this.editForm.reset(this.vehicle);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  fillForm(vehicle: Vehicle) {
    this.editForm.setValue({
      brand: vehicle.brand,
      model: vehicle.model,
      color: vehicle.color,
      registrationNumber: vehicle.registrationNumber,
      productionDate: vehicle.productionDate,
      currentOwner: this.utilsService.clientToString(vehicle.currentOwner),
      engineFuel: vehicle.engineFuel,
      vin: vehicle.vin,
      engineCode: vehicle.engineCode,
      capacity: vehicle.capacity,
      enginePower: vehicle.enginePower,
      technicalInspectionEnd: vehicle.technicalInspectionEnd,
      firstRegistration: vehicle.firstRegistration,
      description: vehicle.description
    });
  }

  canDeactivate() {
    return !this.editForm.dirty || confirm('Are you sure to unsaved the current changes?');
  }
}
