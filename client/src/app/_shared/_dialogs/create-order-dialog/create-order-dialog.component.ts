import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize, of } from 'rxjs';
import { ClientSelectInputComponent } from 'src/app/_forms/client-select-input/client-select-input.component';
import { VehicleSelectInputComponent } from 'src/app/_forms/vehicle-select-input/vehicle-select-input.component';
import { Client } from 'src/app/_models/Client';
import { Order } from 'src/app/_models/Order';
import { Vehicle } from 'src/app/_models/Vehicle';
import { ClientsService } from 'src/app/_services/clients.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { VehiclesService } from 'src/app/_services/vehicles.service';

const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.css']
})
export class CreateOrderDialogComponent implements OnInit {
  @ViewChild(ClientSelectInputComponent) clientSelectInput!: ClientSelectInputComponent;
  @ViewChild(VehicleSelectInputComponent) vehicleSelectInput!: VehicleSelectInputComponent;
  isPricing: boolean = false;
  isSaving: boolean = false;
  selectedClient: Client = null;
  selectedVehicle: Vehicle = null;
  orderForm: FormGroup = this.formBuilder.group({
    client: ['', [Validators.required]],
    vehicle: ['', [Validators.required]],
    clientDescription: [''],
    mileage: ['', [Validators.pattern(INTEGER_REGEX)]],
    fuelLevel: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private ordersService: OrdersService,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>
  ) {}

  ngOnInit(): void {}

  onToggleChange() {
    console.log(this.isPricing);
  }

  onClientChange(client: Client) {
    this.selectedClient = client;

    this.vehiclesService.getClientVehicles(client?.id).subscribe((vehicles: Vehicle[]) => {
      if (!vehicles.some((vehicle) => vehicle.id === this.selectedVehicle?.id)) {
        // if (this.selectedVehicle !== null) this.vehicleSelectInput.clear();
        // this.selectedVehicle = null;
      }
      this.vehicleSelectInput.filteredVehicles = of(vehicles);
    });
  }

  onVehicleChange(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;

    this.clientsService.getVehicleClients(vehicle?.id).subscribe((clients: Client[]) => {
      if (!clients.some((client) => client.id === this.selectedClient?.id)) {
        // if (this.selectedClient !== null) this.clientSelectInput.clear();
        // this.selectedClient = null;
      }
      this.clientSelectInput.filteredClients = of(clients);
    });
  }

  onSaveChanges() {
    this.isSaving = true;

    let formValue = this.orderForm.value;

    // if isPricing - consider (no hidden fiels)
    // if not

    this.ordersService
      .addOrder({
        ...formValue,
        clientId: this.selectedClient?.id,
        vehicleId: this.selectedVehicle?.id
      })
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (order: Order) => {
          this.snackbarService.showMessage('success', 'Pomyślnie dodano nowe zlecenie');
          this.dialogRef.close({
            ...order,
            client: this.selectedClient,
            vehicle: this.selectedVehicle
          });
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }
}
