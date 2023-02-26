import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Observable, of, startWith } from 'rxjs';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { VehiclesService } from 'src/app/core/services/http/vehicles.service';
import { CreateVehicleDialogComponent } from 'src/app/shared/dialogs/create-vehicle-dialog/create-vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-select-input',
  templateUrl: './vehicle-select-input.component.html',
  styleUrls: ['./vehicle-select-input.component.css']
})
export class VehicleSelectInputComponent implements OnInit {
  @Input() label: string = 'Pojazd';
  @Input() selectedVehicle?: Vehicle;
  @Output() vehicleChange: EventEmitter<Vehicle> = new EventEmitter();
  possibleVehicles: Vehicle[] = [];
  displayingVehicles: Observable<Vehicle[]> = of([]);

  constructor(
    @Self() public ngControl: NgControl,
    public dialog: MatDialog,
    private vehiclesService: VehiclesService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // Set up the initial Vehicle name
    if (this.selectedVehicle)
      this.ngControl.control.setValue(this.vehicleToString(this.selectedVehicle));

    // Track input value change
    this.ngControl.control.valueChanges
      .pipe(
        debounceTime(300),
        // distinctUntilChanged(),
        startWith('')
      )
      .subscribe((value: string) => {
        // Init state (even if input has any starting value the changing value will be empty string ""))
        if (value !== this.ngControl.value && this.selectedVehicle) return;
        // Check that currently have a candidate (cover also case when one from the list has been selected)
        let candidates = this.possibleVehicles.filter(
          (vehicle) => this.vehicleToString(vehicle) === value
        );

        if (candidates.length) {
          this.selectedVehicle = candidates[0];
          this.vehicleChange.emit(candidates[0]);
          this.displayingVehicles = of(candidates);
          return;
        }

        // Request
        this.loadVehicles(value.toLowerCase()).subscribe((vehicles) => {
          this.possibleVehicles = vehicles;
          this.displayingVehicles = of(vehicles);

          // Automatically select when found match
          this.selectedVehicle =
            vehicles.length === 1 &&
            this.vehicleToString(vehicles[0]).toLowerCase() === this.ngControl.value.toLowerCase()
              ? (this.selectedVehicle = vehicles[0])
              : null;

          // Inform about change
          this.vehicleChange.emit(this.selectedVehicle);

          // Update letter casing of input (if needed)
          if (
            this.selectedVehicle &&
            this.ngControl.value !== this.vehicleToString(this.selectedVehicle)
          ) {
            this.ngControl.control.setValue(this.vehicleToString(this.selectedVehicle), {
              emitEvent: false
            });
          }

          // Errors handling
          if (this.selectedVehicle) {
            this.ngControl.control.setErrors(null);
            return;
          }
          if (this.ngControl.value !== '') {
            this.ngControl.control.setErrors({ incorrect: true });
            return;
          }
          this.ngControl.hasError('required')
            ? this.ngControl.control.setErrors({ required: true })
            : this.ngControl.control.setErrors(null);
        });
      });
  }

  private loadVehicles(match: string) {
    return this.vehiclesService.getVehiclesSearch(10, match);
  }

  clear(emitEvent: boolean = false) {
    this.selectedVehicle = null;
    if (emitEvent) this.vehicleChange.emit(null);
    this.possibleVehicles = [];
    this.displayingVehicles = of([]);
    this.ngControl.control.setValue('', { emitEvent: false });
  }

  vehicleToString(vehicle: Vehicle) {
    return vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.registrationNumber})` : '';
  }

  onAddVehicle() {
    const dialogRef = this.dialog.open(CreateVehicleDialogComponent, {
      width: '900px',
      data: { name: this.ngControl.value }
    });

    dialogRef.afterClosed().subscribe((vehicle: Vehicle) => {
      if (vehicle !== undefined) {
        this.selectedVehicle = vehicle;
        this.vehicleChange.emit(vehicle);
        this.displayingVehicles = of([vehicle]);
        this.ngControl.control.setValue(this.vehicleToString(vehicle), { emitEvent: false });
      }
    });
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
