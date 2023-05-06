import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { finalize, of } from 'rxjs';
import { ClientSelectInputComponent } from 'src/app/shared/components/selectors/client-select-input/client-select-input.component';
import { VehicleSelectInputComponent } from 'src/app/shared/components/selectors/vehicle-select-input/vehicle-select-input.component';
import { Client } from 'src/app/core/models/Client';
import { Order } from 'src/app/core/models/Order';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { ClientsService } from 'src/app/clients/data-access/clients.service';
import { OrdersService } from 'src/app/orders/data-access/orders.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { VehiclesService } from 'src/app/shared/services/vehicles.service';
import { CreateOrderDialogComponent } from 'src/app/orders/ui/create-order-dialog/create-order-dialog.component';
import { OrderProductsTableComponent } from 'src/app/orders/ui/order-products-table/order-products-table.component';
import { OrderServicesTableComponent } from 'src/app/orders/ui/order-services-table/order-services-table.component';
import { CanDeactivateComponent } from 'src/app/core/guards/can-deactivate.guard';
const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;

@Component({
  selector: 'app-order-profile',
  templateUrl: './order-profile.component.html',
  styleUrls: ['./order-profile.component.scss']
})
export class OrderProfileComponent implements OnInit, AfterViewInit, CanDeactivateComponent {
  @ViewChild(ClientSelectInputComponent) clientSelectInput!: ClientSelectInputComponent;
  @ViewChild(VehicleSelectInputComponent) vehicleSelectInput!: VehicleSelectInputComponent;
  @ViewChild(OrderServicesTableComponent) servicesTable!: OrderServicesTableComponent;
  @ViewChild(OrderProductsTableComponent) productsTable!: OrderProductsTableComponent;
  selectedClient: Client = null;
  selectedVehicle: Vehicle = null;
  isSaving: boolean = false;
  order: Order;
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
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.servicesTable?.dataSource.loadOrderServices(this.order.id);
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.ordersService.getOrder(orderId).subscribe((order) => {
      this.order = order;
      this.selectedClient = order.client;
      this.selectedVehicle = order.vehicle;
      this.orderForm.patchValue({
        clientDescription: this.order.clientDescription,
        mileage: this.order.mileage,
        fuelLevel: this.order.fuelLevel,
        admissionDate: this.order.admissionDate,
        deadlineDate: this.order.deadlineDate,
        repairDescription: this.order.repairDescription
      });
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

  getTotalGross() {
    let totalJobsGross = this?.servicesTable?.dataSource.getTotalCostGross() ?? 0.0;
    let totalPartsGross = this?.productsTable?.dataSource.getTotalSalesPriceGross() ?? 0.0;
    return totalJobsGross + totalPartsGross;
  }

  onEditClick() {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '800px',
      data: { order: this.order }
    });
    dialogRef.afterClosed().subscribe((order: Order) => {
      if (!order) return;
      this.order = order;
      this.servicesTable.dataSource.setOrderServices(order.orderServices);
      this.productsTable.dataSource.setOrderProducts(order.orderProducts);
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
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane zlecenia');
          this.orderForm.reset(this.order);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  canDeactivate() {
    return !this.orderForm.dirty || confirm('Are you sure to unsaved the current changes?');
  }
}
