import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, of } from 'rxjs';
import { INTEGER_REGEX } from 'src/app/core/constants/constants';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { Client } from 'src/app/core/models/Client';
import { Order } from 'src/app/core/models/Order';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { ClientsService } from 'src/app/features/clients/data-access/clients.service';
import { VehiclesService } from 'src/app/features/vehicles/data-access/vehicles.service';
import { ClientSelectInputComponent } from 'src/app/shared/ui/selectors/client-select-input/client-select-input.component';
import { VehicleSelectInputComponent } from 'src/app/shared/ui/selectors/vehicle-select-input/vehicle-select-input.component';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { OrdersService } from '../../data-access/orders.service';
import { OrderProfileComponent } from '../order-profile/order-profile.component';

@Component({
  selector: 'app-order-profile-edit',
  templateUrl: './order-profile-edit.component.html',
  styleUrls: ['./order-profile-edit.component.scss']
})
export class OrderProfileEditComponent implements OnInit, CanDeactivateGuard {
  @ViewChild(ClientSelectInputComponent) clientSelectInput: ClientSelectInputComponent;
  @ViewChild(VehicleSelectInputComponent) vehicleSelectInput: VehicleSelectInputComponent;
  selectedClient: Client = null;
  selectedVehicle: Vehicle = null;
  isSaving: boolean = false;
  order: Order;
  fuelLevels = ['1/4', '2/4', '3/4', '4/4'];
  orderForm: FormGroup = this.formBuilder.group({
    client: ['', [Validators.required]],
    vehicle: ['', [Validators.required]],
    clientDescription: [''],
    mileage: ['', [Validators.pattern(INTEGER_REGEX)]],
    fuelLevel: [''],
    admissionDate: [''],
    deadlineDate: [''],
    repairDescription: ['']
  });

  constructor(
    @SkipSelf() private orderProfile: OrderProfileComponent,
    private snackbarService: SnackbarService,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.order = this.orderProfile.order;
    this.selectedClient = this.order.client;
    this.selectedVehicle = this.order.vehicle;
    this.orderForm.patchValue({
      clientDescription: this.order.clientDescription,
      mileage: this.order.mileage,
      fuelLevel: this.order.fuelLevel,
      admissionDate: this.order.admissionDate,
      deadlineDate: this.order.deadlineDate,
      repairDescription: this.order.repairDescription
    });
  }

  onSaveChanges() {
    this.isSaving = true;

    const updateData: Order = {
      ...this.order,
      ...this.orderForm.value,
      clientId: this.selectedClient?.id ?? null,
      vehicleId: this.selectedVehicle?.id ?? null
    };

    this.ordersService
      .updateOrder(updateData)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.order.client = this.selectedClient;
          this.order.vehicle = this.selectedVehicle;
          this.order = { ...this.order, ...updateData };
          this.orderProfile.order = this.order;
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane zlecenia');
          this.orderForm.reset(this.order);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  onClientChange(client: Client) {
    this.selectedClient = client;

    this.vehiclesService.getClientVehicles(client?.id).subscribe((vehicles: Vehicle[]) => {
      this.vehicleSelectInput.displayingVehicles = of(vehicles);
    });
  }

  onVehicleChange(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;

    this.clientsService.getVehicleClients(vehicle?.id).subscribe((clients: Client[]) => {
      this.clientSelectInput.displayingClients = of(clients);
    });
  }

  canDeactivate() {
    return !this.orderForm.dirty || confirm('Are you sure to unsaved the current changes?');
  }
}
