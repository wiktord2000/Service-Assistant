import { ClientSelectInputComponent } from '../../../shared/ui/selectors/client-select-input/client-select-input.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { VehiclesService } from 'src/app/vehicles/data-access/vehicles.service';
import { Client } from 'src/app/core/models/Client';

const NUMBER_REGEX = /^\d+$/;

@Component({
  selector: 'app-create-vehicle-dialog',
  templateUrl: './create-vehicle-dialog.component.html',
  styleUrls: ['./create-vehicle-dialog.component.scss']
})
export class CreateVehicleDialogComponent implements OnInit {
  @ViewChild(ClientSelectInputComponent) clientSelect: ClientSelectInputComponent;
  isSaving: boolean = false;
  isCompany: boolean = false;
  vehicleForm: FormGroup = this.formBuilder.group({
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
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private vehiclesService: VehiclesService,
    public dialogRef: MatDialogRef<CreateVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { name?: string; client?: Client }
  ) {}

  ngOnInit(): void {
    this.vehicleForm.controls['brand'].setValue(this?.data?.name ?? '');
  }

  onSaveChanges() {
    let selectedClient = this.clientSelect.selectedClient;

    this.isSaving = true;
    this.vehiclesService
      .addVehicle({ ...this.vehicleForm.value, currentOwnerId: selectedClient?.id })
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (vehicle: Vehicle) => {
          this.snackbarService.showMessage('success', 'Pomyślnie dodano nowy pojazd');
          vehicle.currentOwner = selectedClient;
          this.dialogRef.close(vehicle);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  getCurrentDate() {
    return new Date();
  }
}
